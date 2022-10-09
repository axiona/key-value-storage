import {EntityManager, Like} from "typeorm";
import Storage from "../database/storage";
import DbDelete from "../database/read";
import AddNamespace from "../../../string/add-namespace";

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
