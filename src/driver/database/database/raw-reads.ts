import {EntityManager} from "typeorm";
import Storage from "./storage";
import {Required} from "utility-types";
import {FindManyOptions} from "typeorm";

export default function RawReads(
    manager : EntityManager,
    option: FindManyOptions<Storage> = {},
    classes : typeof Storage,
) : Promise<Required<Storage, 'id'>[]> {

    return manager.getRepository(classes)
        .find(option) as Promise<Required<Storage, 'id'>[]>;
}
