import DbUpsert from "../database/upserts";
import Storage from "../database/storage";
import {EntityManager} from "typeorm";
import AddNamespace from "../database/add-namespace";
import RemoveNamespace from "../database/remove-namespace";

export default function Upsert<
    Type extends Storage,
    Key extends keyof Type
>(
    database : EntityManager,
    namespace: string,
    id : Key,
    value : Type[Key],
    constructor: typeof Storage
) : Promise<Type[Key]> {

    let entity = Object.assign(new (constructor), {id, value});
    entity = AddNamespace(entity, namespace);
    return DbUpsert(database, [entity])
        .then(entities=>RemoveNamespace(entities[0]).value);

}
