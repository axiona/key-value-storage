import {RemovePrefixParameters} from '@axiona/string/remove-prefix.js';
import Namespace from "./namespace.js";
import Merge from "./merge.js";

export default function RemoveNamespace(
    id: string,
    namespace: string|ReadonlyArray<string>
) : string {

    namespace = Merge(namespace);

    return RemovePrefixParameters(id, `${namespace}${Namespace}`);
}
