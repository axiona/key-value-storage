import Driver from "./driver";

export default class Immutable<Type extends Record<string, any>> implements Driver<Type> {

    constructor(private driver : Driver<Type>) {}

    get size(): Promise<number> {

        return this.driver.size;
    }

    async all(defaults:Partial<Type> = {}): Promise<Partial<Type>> {

        return this.driver.all(defaults);
    }

    clear(): Promise<void> {

        return Promise.resolve();
    }

    delete<Key extends keyof Type>(key: Key): Promise<void> {

        return Promise.resolve();
    }

    async get<Key extends keyof Type>(key: Key, defaults?:Type[Key]): Promise<Type[Key] | undefined> {

        return this.driver.get(key, defaults as Type[Key]);
    }

    async has<Key extends keyof Type>(key: Key): Promise<boolean> {

        return this.driver.has(key);
    }

    set<Key extends keyof Type>(key: Key, value: Type[Key]): Promise<Type[Key]> {

        return Promise.resolve(value);
    }

    sets<Partials extends Partial<Type>>(type: Partials): Promise<Partials> {

        return Promise.resolve(type);
    }

}