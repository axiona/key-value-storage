import TimeToLiveType from "../time-to-live";
import Object_ from '@alirya/object/boolean/object';
import {ExistsParameters} from '@alirya/object/property/boolean/exists';

export default function TimeToLive<Assumption extends unknown>(value: unknown) : value is TimeToLiveType<Assumption> {

    if(!Object_(value)) {

        return false;
    }

    if(ExistsParameters(value, 'ttl')) {

        return true;
    }

    return false;

}