import {EntityManager} from "typeorm";
import Storage from "../database/storage";
import DbRead from "../database/read";
import AddNamespace from "../../../string/add-namespace";

export default function Read<Type>(
    manager : EntityManager,
    namespace: string,
    id : string,
    entity: typeof Storage
) : Promise<Type|undefined> {

    id = AddNamespace(id, namespace);

    return DbRead(manager, {where:{id}}, entity)
        .then(settings => settings ? settings.value : undefined)
}
