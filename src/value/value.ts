import Driver from "../driver/driver.js";


export default class Value<
    Type extends Record<string, any> = Record<string, any>,
    Key extends keyof Type = keyof Type
    > {

    constructor(
        private driver: Driver<Type>,
        private key : Key
    ) {
    }

    // get value() : Promise<Type|null> {
    //
    //     return this.get()
    // }

    set(value: Type[Key]) : Promise<Type[Key]> {

        return this.driver.set<Key>(this.key, value)
    }

    get() : Promise<Type[Key]|undefined>
    get(defaults:Type[Key]) : Promise<Type[Key]>
    get(defaults?:Type[Key]) : Promise<Type[Key]|undefined> {

        return this.driver.get(this.key, defaults as Type[Key]);
    }

    has() : Promise<boolean> {

        return this.driver.has(this.key)
    }

    delete() : Promise<void> {

        return this.driver.delete(this.key)
    }


}
