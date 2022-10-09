import Storage from "../storage";
import Class from '@alirya/class/class';
import {Required} from "utility-types";

export default function FromRecord<Type extends Storage>(
    object : Record<string, any>,
    entity: Class<Type>
) : Required<Type, 'id'|'value'>[] {

    return Object.entries(object)
        .map(
            ([id, value])=>Object.assign(new entity, {id, value})
        );

}
