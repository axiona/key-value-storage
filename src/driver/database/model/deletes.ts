import {EntityManager, Like} from 'typeorm';
import Storage from "../database/storage.js";
import DbDelete from "../database/read.js";
import AddNamespace from "../../../string/add-namespace.js";

export default function Deletes<Type>(
    manager : EntityManager,
    namespace: string,
    entity: typeof Storage
) : Promise<undefined> {

    const id = AddNamespace('', namespace) + '%';

    return DbDelete(manager, {
            where:{
                id:Like(id)
            }
        }, entity
    ).then(()=>undefined)
}
