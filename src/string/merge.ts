import Namespace from "./namespace";


export default function Merge(namespace: string|ReadonlyArray<string>) : string {

    if(typeof namespace === 'string') {

        return namespace;

    } else {

        return namespace.join(Namespace);
    }
}