import {EntityManager} from 'typeorm';
import Storage from "../database/storage.js";
import DbDelete from "../database/read.js";
import AddNamespace from "../../string/add-namespace.js";

export default function Deletes<Type>(
    manager : EntityManager,
    namespace: string,
    id : string,
    entity: typeof Storage
) : Promise<undefined> {

    id = AddNamespace(id, namespace);

    return DbDelete(manager, {where:{id}}, entity)
        .then(()=>undefined)
}
