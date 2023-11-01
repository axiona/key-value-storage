import Driver from "./driver.js";
import MapCallback from '@alirya/object/map-callback.js';
import Filter from '@alirya/object/filter.js';
import Object_ from '@alirya/object/boolean/object.js';
import TimeToLiveType from "./time-to-live/time-to-live.js";
import IsTimeToLive from "./time-to-live/boolean/time-to-live.js";
import NotUndefined from '@alirya/undefined/boolean/not-undefined.js';

export type CacheTimeToLive<Type extends Record<string, any>>  = {
    [K in keyof Type] : TimeToLiveType<Type[K]>
};

/**
 * storage with cached storage layer
 */
export default class Cache<Type extends Record<string, any>> implements Driver<Type> {

    /**
     * @param duration in seconds
     *
     * main storage
     * @param source
     *
     * cache storage, ideally fast storage driver
     * @param cache
     *
     * key for cached all value
     * @param allKey
     *
     * key for cached size
     * @param sizeKey
     */
    constructor(
        public duration: number,
        private source: Driver<Type>,
        private cache: Driver<CacheTimeToLive<Type>>,
        private allKey: string = '#ALL',
        private sizeKey: string = '#SIZE',
    ) {
    }


    get size(): Promise<number> {

        return this.cache.get(this.sizeKey).then((data)=>{

            const value = this.ensureTimeToLive(data);

            if(value) {

                return value.value;
            }

            return this.source.size.then(size=>{

                return this.setCache(this.sizeKey, size as any);
            })

        });
    }

    protected mergeDate<Key extends keyof Type>(value : Type[Key]) : TimeToLiveType<Type[Key]> {

        const ttl = new Date().getTime() + (this.duration * 1000);
        return { value, ttl }
    }

    protected allCacheUnpack() : Promise<Partial<Type>> {

        const ignores : PropertyKey[] = [
            this.allKey,
            this.sizeKey,
        ];

        return this.cache.all()
            .then((data: Type) =>Filter(data, (value, key) => !ignores.includes(key)))
            .then((data: Type) =>MapCallback(data, value => value.value),
        ) as Promise<Partial<Type>>;
    }

    all(defaults:Partial<Type> = {}): Promise<Partial<Type>> {

        return this.cache.get(this.allKey as keyof Type).then((data: any)=>{

            const value = this.ensureTimeToLive(data);

            if(value) {

                return this.allCacheUnpack();
            }

            return this.source.all().then(records=>{

                return Promise.all([
                    this.setCache(this.allKey, undefined as Type[keyof Type]),
                    this.setsCache(records),
                ]).then(()=>Object.assign(defaults, records))

            })
        });
    }

    clear(): Promise<void> {
        return Promise.resolve(undefined);
    }

    delete<Key extends keyof Type>(key: Key): Promise<void> {

        return Promise.all([
            this.source.delete(key),
            this.cache.delete(key)
        ]).then(()=>undefined)
    }

    protected ensureTimeToLive<Value extends unknown>(data: TimeToLiveType<Value>|undefined) : TimeToLiveType<Value>|undefined {

        if(IsTimeToLive(data)) {

            const {ttl} = data;

            if(ttl) {

                const now = new Date().getTime();

                if (ttl >= now) {

                    return data;
                }
            }
        }

        return undefined;
    }

    async get<Key extends keyof Type>(key: Key, defaults?:Type[Key]): Promise<Type[Key] | undefined> {

        return this.cache.get(key).then(data=>{

            const value = this.ensureTimeToLive(data);

            if(value) {

                return value.value;
            }

            return this.source.get(key).then(record=>{

                if(record !== undefined) {

                    return this.setCache(key, record);
                }

                return defaults;
            });
        });
    }

    has<Key extends keyof Type>(key: Key): Promise<boolean> {

        return this.cache.has(key).then((exists) => {

            if(exists) {

                return true;
            }

            return this.source.has(key);

        });
    }

    protected setCache<Key extends keyof Type>(key: Key, value: Type[Key]): Promise<Type[Key]> {

        return this.cache.set(key, this.mergeDate(value)).then(()=>value)
    }

    set<Key extends keyof Type>(key: Key, value: Type[Key]): Promise<Type[Key]> {

        return Promise.all([
            this.source.set(key, value),
            this.setCache(key, value)
        ]).then(()=>value)
    }

    protected setsCache<Partials extends Partial<Type>>(values: Partials): Promise<Partials> {

        const merged : Partial<CacheTimeToLive<Type>> = MapCallback(
            values,
                value => NotUndefined(value) ? this.mergeDate(value) : undefined
        );

        return this.cache
            .sets(merged)
            .then(()=>values);
    }

    sets<Partials extends Partial<Type>>(type: Partials): Promise<Partials> {

        return Promise.all([
            this.source.sets(type),
           this.setsCache(type)
        ]).then(()=>type)
    }
}
