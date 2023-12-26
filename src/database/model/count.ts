import Storage from "../database/storage";
import DbCount from "../database/count.js";
import {EntityManager, Like} from 'typeorm';
import AddNamespace from "../../string/add-namespace.js";

export default function Count(
    manager : EntityManager,
    namespace: string,
    entity: typeof Storage
) : Promise<number> {

    const id = AddNamespace('', namespace) + '%';

    return DbCount(manager, { where: { id : Like(id) } }, entity);
}
