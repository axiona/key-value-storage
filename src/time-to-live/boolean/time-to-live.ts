import TimeToLiveType from "../time-to-live";
import Object_ from '@axiona/object/boolean/object.js';
import {ExistsParameters} from '@axiona/object/property/boolean/exists.js';

export default function TimeToLive<Assumption extends unknown>(value: unknown) : value is TimeToLiveType<Assumption> {

    if(!Object_(value)) {

        return false;
    }

    if(ExistsParameters(value, 'ttl')) {

        return true;
    }

    return false;

}
