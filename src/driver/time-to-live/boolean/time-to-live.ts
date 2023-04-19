import TimeToLiveType from "../time-to-live.js";
import Object_ from '@alirya/object/boolean/object.js';
import {ExistsParameters} from '@alirya/object/property/boolean/exists.js';

export default function TimeToLive<Assumption extends unknown>(value: unknown) : value is TimeToLiveType<Assumption> {

    if(!Object_(value)) {

        return false;
    }

    if(ExistsParameters(value, 'ttl')) {

        return true;
    }

    return false;

}