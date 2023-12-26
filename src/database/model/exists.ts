import Storage from "../database/storage.js";
import {EntityManager} from 'typeorm';
import Count from "../database/count.js";
import AddNamespace from "../../string/add-namespace.js";

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
