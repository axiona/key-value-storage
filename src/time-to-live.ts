import Storage from "./storage";
import Timeout = NodeJS.Timeout;


export default class TimeToLive<Type extends Record<string, any>> implements Storage<Type> {

    #duration: number = 0;
    #interval ?: Timeout;
    /**
     * @param duration in seconds
     *
     * @param storage
     * @param timeToLive
     * @param autoClear
     */
    constructor(
        duration: number = 0,
        private storage: Storage<Type>,
        private timeToLive: Storage<Record<keyof Type, number>>,
        autoClear : boolean
    ) {

        this.duration = duration;
        this.autoClear = autoClear;
    }

    set duration(duration: number) {

        this.#duration = duration
    }

    get duration() : number {

        return this.#duration
    }

    set autoClear(duration: boolean) {

        if(this.#interval) {

            clearInterval(this.#interval)
        }

        if(!this.duration) {

            return;
        }

        if(duration) {

            this.#interval = setInterval(() => this.clearExpired(), this.duration * 1000)
        }

        return;
    }

    get autoClear() : boolean {

        return !!this.#interval;
    }

    all(defaults:Partial<Type> = {}): Promise<Partial<Type>> {

        return this.clearExpired().then(() => this.storage.all(defaults))
    }

    getCurrentTTL() : number {

        return new Date().getTime() + (this.duration * 1000);
    }

    set<Key extends keyof Type>(key: Key, value: Type[Key]): Promise<Type[Key]> {

        return Promise.all([
            this.storage.set(key, value),
            this.timeToLive.set(key, this.getCurrentTTL())
        ]).then(()=>value)
    }

    get<Key extends keyof Type>(key: Key, defaults?:Type[Key]): Promise<Type[Key] | undefined> {

        return this.deleteExpired(key)
            .then(() => this.storage.get(key))
            .then(value => value ?? defaults);
    }

    deleteExpired<Key extends keyof Type>(key: Key) : Promise<void> {

        return this.timeToLive.get(key).then(data=>{

            if(!data) {

                return undefined
            }

            if(!this.isLive(data)) {

                return Promise.all([
                    this.timeToLive.delete(key),
                    this.storage.delete(key),
                ]).then(()=>undefined)
            }
        })
    }

    clearExpired() : Promise<void> {

        return this.timeToLive.all().then((data: Record<keyof Type, number>)=>{

            const promises : Promise<any>[] = []

            for (const [key, ttl] of Object.entries(data)) {

                if(!this.isLive(ttl)) {

                    promises.push(this.storage.delete(key));
                    promises.push(this.timeToLive.delete(key));
                }
            }

            return Promise.all(promises).then(()=>undefined);
        });
    }

    has<Key extends keyof Type>(key: Key): Promise<boolean> {

        return this.deleteExpired(key)
            .then(() => this.storage.has(key));
    }


    get size(): Promise<number> {

        return this.clearExpired()
            .then(() => this.storage.size);
    }

    clear(): Promise<void> {

        return Promise.all([
            this.timeToLive.clear(),
            this.storage.clear(),
        ]).then(()=>undefined);
    }



    delete<Key extends keyof Type>(key: Key): Promise<void> {

        return Promise.all([
            this.timeToLive.delete(key),
            this.storage.delete(key)
        ]).then(()=>undefined)
    }


    sets<Partials extends Partial<Type>>(type: Partials): Promise<Partials> {

        const ttl : Partial<Record<keyof Type, number>> = {}

        for (const key of Object.keys(type) as (keyof Type)[]) {

            ttl[key] = this.getCurrentTTL()
        }

        return Promise.all([
            this.timeToLive.sets(ttl),
            this.storage.sets(type)
        ]).then(()=>type)
    }

    protected isLive(ttl:number) : boolean {

        const now = new Date().getTime();

        return ttl >= now;
    }

}
