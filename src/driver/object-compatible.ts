import Driver from "./driver";
import Escape from '@alirya/string/pattern/escape';
import AddNamespace from "../string/add-namespace";
import RemoveNamespace from "../string/remove-namespace";
import Merge from "../string/merge";
import Default from "../../../function/dist/default";


export default class ObjectCompatible<Type extends Record<string, any>> implements Driver<Type> {

    readonly namespacePattern : RegExp;
    readonly namespace: string;

    constructor(
        private storage : object,
        namespace: string|ReadonlyArray<string> = '',
    ) {

        this.namespace = Merge(namespace);
        this.namespacePattern = new RegExp(`^${Escape(this.namespace)}:.*`)
    }

    allSynchronous<Partials extends Partial<Type>>(initial: Partial<Type> = {}): Partials {

        const values = this.keys()
            .map(key=>([key, this.getSynchronous(key)]))
            .map(([key, value])=>({[key as string] : value}));

        return Object.assign(initial, ...values)
    }


    all<Partials extends Partial<Type>>(initial: Partial<Type> = {}): Promise<Partials> {

        return Promise.resolve(this.allSynchronous<Partials>());
    }

    get size () : Promise<number> {

        return Promise.resolve(
            Array.from(this.keys()).length
        )
    }

    keys() : string[] {

        return this.rawKeys().map(key => RemoveNamespace(key, this.namespace));
    }

    rawKeys() : string[] {

        return Object.keys(this.storage).filter(key => key.match(this.namespacePattern));
    }

    clearSynchronous() : void {

        for (const key of this.rawKeys()) {

            delete this.storage[key];

        }
    }

    clear(): Promise<void> {

        this.clearSynchronous()
        return Promise.resolve();
    }

    updateSynchronous<Partials extends Partial<Type>>(type: Partials): Partials {

        for (const [key, value] of Object.entries(type)) {

            this.setSynchronous(key, value);
        }

        return type;
    }

    sets<Partials extends Partial<Type>>(type: Partials): Promise<Partials> {

        return Promise.resolve(
            this.updateSynchronous(type)
        );
    }

    key(key: keyof Type) : string {

        return AddNamespace(key as string, this.namespace);
    }

    deleteSynchronous(key: keyof Type): void {

        delete this.storage[this.key(key)];

    }

    delete<Key extends keyof Type>(key: Key): Promise<void> {

        this.deleteSynchronous(key);
        return Promise.resolve();
    }

    getSynchronous<Key extends keyof Type>(key: Key): Type[Key] | undefined {

        const value = this.storage[this.key(key)];

        switch (value) {
            case null :
            case undefined:
                return undefined;
            default :
                return JSON.parse(value)

        }
    }

    get<Key extends keyof Type>(key: Key, defaults?:Type[Key]): Promise<Type[Key] | undefined> {

        return Promise.resolve(this.getSynchronous(key))
            .then(Default(defaults));
    }

    hasSynchronous(key: keyof Type): boolean {

        switch (this.storage[this.key(key)]) {
            case null :
            case undefined:
                return false;
            default :
                return true;

        }
    }

    has<Key extends keyof Type>(key: Key): Promise<boolean> {

        return Promise.resolve(this.hasSynchronous(key));
    }

    setSynchronous<Key extends keyof Type>(key: Key, value: Type[Key]): Type[Key] {

        this.storage[this.key(key)] = JSON.stringify(value);

        return value;

    }

    set<Key extends keyof Type>(key: Key, value: Type[Key]): Promise<Type[Key]> {

        return Promise.resolve(this.setSynchronous(key, value))
    }


}
