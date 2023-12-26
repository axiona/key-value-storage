import Storage from "./storage";

export default class Compound<Type extends Record<string, any>> implements Storage<Type> {

    constructor(private drivers : Storage<Type>[]) {
    }

    get size(): Promise<number> {

        return Promise.all(
            this.drivers.map(driver => driver.size)
        ).then(sizes=>{
            return Math.max(0, ... sizes );
        })
    }

    async all(initials:Partial<Type> = {}): Promise<Partial<Type>> {

        const reverses = Array.from(this.drivers).reverse();

        return Promise.all(
            reverses.map(driver => driver.all({}))
        ).then(objects=>{
            return Object.assign(initials, ... objects);
        });
    }

    clear(): Promise<void> {

        return Promise.all(
            this.drivers.map(driver => driver.clear())
        ).then(()=>undefined);
    }

    delete<Key extends keyof Type>(key: Key): Promise<void> {

        return Promise.all(
            this.drivers.map(driver => driver.delete(key))
        ).then(()=>undefined);
    }

    async get<Key extends keyof Type>(key: Key, defaults?:Type[Key]): Promise<Type[Key] | undefined> {

        for (const driver of this.drivers) {

            const exists = await driver.get(key);

            if(exists !== undefined) {

                return exists;
            }
        }

        return defaults;
    }

    async has<Key extends keyof Type>(key: Key): Promise<boolean> {

        for (const driver of this.drivers) {

            const exists = await driver.has(key);

            if(exists) {

                return exists;
            }
        }

        return false;
    }

    set<Key extends keyof Type>(key: Key, value: Type[Key]): Promise<Type[Key]> {

        return Promise.all(
            this.drivers.map(driver => driver.set(key, value))
        ).then(()=>value);
    }

    sets<Partials extends Partial<Type>>(type: Partials): Promise<Partials> {

        return Promise.all(
            this.drivers.map(driver => driver.sets(type))
        ).then(()=>type);
    }

}
