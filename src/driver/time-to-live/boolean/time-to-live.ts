import TimeToLiveType from "../time-to-live";
import Object_ from "../../../../../object/dist/boolean/object";
import {ExistsParameters} from "../../../../../object/dist/property/boolean/exists";

export default function TimeToLive<Assumption extends unknown>(value: unknown) : value is TimeToLiveType<Assumption> {

    if(!Object_(value)) {

        return false;
    }

    if(ExistsParameters(value, 'ttl')) {

        return true;
    }

    return false;

}