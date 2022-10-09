import DbUpserts from "../database/upserts";
import FromRecord from "../database/array/from-record";
// import Setting from "@aksarakan/client/setting/setting";
import Storage from "../database/storage";
import {EntityManager} from "typeorm";
import AddNamespace from "../database/add-namespace";
import RemoveNamespace from "../database/remove-namespace";
import ToRecord from "../mapper/record/to-record";

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
