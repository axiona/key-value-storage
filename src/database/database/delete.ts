import {EntityManager} from 'typeorm';
import Storage from "./storage.js";
import {DeleteResult} from 'typeorm';
import {FindOptionsWhere} from 'typeorm';

export default function Count<Type extends Storage>(
    manager : EntityManager,
    option: FindOptionsWhere<Type> = {},
    classes : typeof Storage,
) : Promise<DeleteResult> {

    return manager
        .getRepository(classes)
        .delete(option);
}
