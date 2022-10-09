// import Database from "../../database/database";
// import DatabaseInsert from "../database/insert";
// import Setting from "@aksarakan/client/setting/setting";
import Storage from "../database/storage";
import {EntityManager} from "typeorm";
import Count from "../database/count";
import AddNamespace from "../../../string/add-namespace";

export default function Exists<Type extends Record<string, any>>(
    manager : EntityManager,
    // setting : Type,
    namespace: string,
    id : string,
    entity: typeof Storage
) : Promise<boolean> {

    id = AddNamespace(id, namespace);

    return Count(manager, {where: {id}}, entity)
        .then(number => number === 1);
}
