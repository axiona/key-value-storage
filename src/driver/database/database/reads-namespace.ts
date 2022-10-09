import Storage from "./storage";
import {EntityManager, Like} from "typeorm";
import {Required} from "utility-types";
import AddNamespace from "../../../string/add-namespace";
import RemoveNamespace from "./remove-namespace";

export default function ReadsNamespace<Entity extends Required<Storage, 'id'>>(
    manager : EntityManager,
    namespace: string
) : Promise<Entity[]> {

    const id = AddNamespace('', namespace) + '%';

    return manager.getRepository(Storage)
        .find({where: {
            id: Like(id)
        }})
        .then((settings: Entity[])=>
            settings.map(setting => RemoveNamespace(setting, namespace))
        );

}
