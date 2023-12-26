import Storage from "./storage";
import {DataSource} from 'typeorm';
import Upsert from "./database/model/upsert.js";
import Exists from "./database/model/exists.js";
import Updates from "./database/model/updates.js";
import StorageClass from "./database/database/abstract-storage.js";
import Read from "./database/model/read.js";
import Delete from "./database/model/delete.js";
import Deletes from "./database/model/deletes.js";
import Reads from "./database/model/reads.js";
import Count from "./database/model/count.js";
import Merge from "./string/merge.js";
import Default from '@axiona/function/default.js';


export default class Database<Type extends Record<string, any>> implements Storage<Type> {

    readonly namespace : string;

    constructor(
        private source: DataSource,
        namespace: string|ReadonlyArray<string>,
        private entity : typeof StorageClass
    ) {

        this.namespace = Merge(namespace);
    }

    get size() : Promise<number> {

        return Count(this.source.manager, this.namespace, this.entity)
    }

    all(initial: Partial<Type> = {}): Promise<Partial<Type>> {
        return Reads<Type>(this.source.manager, this.namespace, this.entity)
            .then(data=>Object.assign(initial, data));
    }

    clear(): Promise<void> {
        return Deletes(this.source.manager,this.namespace, this.entity);
    }

    delete<Key extends keyof Type>(key: Key): Promise<void> {
        return Delete(this.source.manager,this.namespace, key as string, this.entity);
    }

    get<Key extends keyof Type>(key: Key, defaults?:Type[Key]): Promise<Type[Key]|undefined> {

        return Read<Type[Key]>(this.source.manager, this.namespace, key as string, this.entity)
            .then(Default(defaults));
    }

    has<Key extends keyof Type>(key: Key): Promise<boolean> {

        return Exists(this.source.manager, this.namespace, key as string, this.entity);
    }

    set<Key extends keyof Type>(key: Key, value: Type[Key]): Promise<Type[Key]> {

        return Upsert(this.source.manager, this.namespace, key, value, this.entity)
    }

    sets<Partials extends Partial<Type>>(type: Partials): Promise<Partials> {

        return Updates(this.source.manager, type, this.namespace, this.entity) as Promise<Partials>;
    }
}
