import Driver from "../driver/driver";
import Undefined from "../../../undefined/dist/boolean/undefined";
import Default from "@alirya/function/default";


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

    get(defaults?:Type[Key]) : Promise<Type[Key]|undefined> {

        return this.driver.get(this.key, defaults);
    }

    has() : Promise<boolean> {

        return this.driver.has(this.key)
    }

    delete() : Promise<void> {

        return this.driver.delete(this.key)
    }


}
