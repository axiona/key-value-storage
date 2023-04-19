import Namespace from "./namespace.js";
import Merge from "./merge.js";


export default function AddNamespace(
    id: string,
    namespace: string|ReadonlyArray<string>
) : string {

    namespace = Merge(namespace);

    return `${namespace}${Namespace}${id}`
}