import Storage from "../../database/storage.js";
import {Required} from 'utility-types';

export default function ToRecord<Type extends Required<Storage, 'id'|'value'>>(records: Type[]) : Record<string, any> {

    const mapped = records.map(({id, value}) => ({[id]: value}));

    return Object.assign({}, ...mapped);

}
