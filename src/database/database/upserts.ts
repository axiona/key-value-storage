import Storage from "./storage.js";
import {EntityManager} from 'typeorm';
import {Required} from 'utility-types';
import Class from '@axiona/class/class';

export default function Upserts<Type extends Required<Storage, 'id'>>(
    manager : EntityManager,
    entities : Type[],
    classes ?: Class<Storage>,
) : Promise<Type[]> {

    const clones = entities.map(entity=>Object.assign({}, entity));
    return manager.getRepository<Class<Storage>>(classes || entities[0].constructor)
        .upsert(entities, ['id'])
        .then(()=>clones)

}
