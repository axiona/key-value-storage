import {RemovePrefixParameters} from '@alirya/string/remove-prefix';
import Namespace from "./namespace";
import Merge from "./merge";

export default function RemoveNamespace(
    id: string,
    namespace: string|ReadonlyArray<string>
) : string {

    namespace = Merge(namespace);

    return RemovePrefixParameters(id, `${namespace}${Namespace}`);
}
