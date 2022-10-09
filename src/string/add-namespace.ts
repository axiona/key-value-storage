import Namespace from "./namespace";
import Merge from "./merge";


export default function AddNamespace(
    id: string,
    namespace: string|ReadonlyArray<string>
) : string {

    namespace = Merge(namespace);

    return `${namespace}${Namespace}${id}`
}