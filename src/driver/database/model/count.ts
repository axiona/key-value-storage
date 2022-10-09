import Storage from "../database/storage";
import DbCount from "../database/count";
import {EntityManager, Like} from "typeorm";
import AddNamespace from "../../../string/add-namespace";

export default function Count<Type extends Record<string, string|number|boolean>>(
    manager : EntityManager,
    namespace: string,
    entity: typeof Storage
) : Promise<number> {

    const id = AddNamespace('', namespace) + '%';

    return DbCount(manager, { where: { id : Like(id) } }, entity);
}
