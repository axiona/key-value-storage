import DbUpserts from "../database/upserts.js";
import FromRecord from "../database/array/from-record.js";
import Storage from "../database/storage.js";
import {EntityManager} from 'typeorm';
import AddNamespace from "../database/add-namespace.js";
import RemoveNamespace from "../database/remove-namespace.js";
import ToRecord from "../mapper/record/to-record.js";

export default function Updates<Type extends Record<string, any>>(
    manager : EntityManager,
    setting : Type,
    namespace: string,
    entity: typeof Storage
) : Promise<Type> {


    const entities = FromRecord(setting, entity)
        .map(entity => AddNamespace(entity, namespace));

    const operation = manager.transaction(transaction => {

        return DbUpserts(transaction, entities);
    })

    return operation
         .then(
             records=>records.map(record=>RemoveNamespace(record, namespace))
         )
        .then(ToRecord) as Promise<Type>
}
