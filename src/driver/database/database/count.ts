import {EntityManager} from "typeorm";
import Storage from "./storage";
import {FindManyOptions} from "typeorm";

export default function Count(
    manager : EntityManager,
    option: FindManyOptions<Storage> = {},
    classes : typeof Storage,
) : Promise<number> {

    return manager
        .getRepository(classes)
        .count(option);
}
