import Driver from "./driver";
import {DataSource, EntityManager} from "typeorm";
import Upsert from "./database/model/upsert";
import Exists from "./database/model/exists";
import Updates from "./database/model/updates";
import Storage from "./database/database/storage";
import Read from "./database/model/read";
import Delete from "./database/model/delete";
import Deletes from "./database/model/deletes";
import Reads from "./database/model/reads";
import Count from "./database/model/count";
import Merge from "../string/merge";
import Default from '@alirya/function/default';


export default class Database<Type extends Record<string, any>> implements Driver<Type> {

    readonly namespace : string;

    constructor(
        private source: DataSource,
        namespace: string|ReadonlyArray<string>,
        private entity : typeof Storage
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

        // return Promise.resolve(undefined);
    }

    sets<Partials extends Partial<Type>>(type: Partials): Promise<Partials> {

        return Updates(this.source.manager, type, this.namespace, this.entity) as Promise<Partials>;
    }



}
