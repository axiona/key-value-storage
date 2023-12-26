import {EntityManager, FindOneOptions} from 'typeorm';
import Storage from "./storage";

export default function Read(
    manager : EntityManager,
    option: FindOneOptions<Storage> = {},
    classes : typeof Storage,
) : Promise<Storage|null> {

    return manager
        .getRepository(classes)
        .findOne(option);
}
