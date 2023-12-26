import Storage from "./storage.js";
import {Required} from 'utility-types';
import AddNamespaceString from "../../string/add-namespace.js";

export default function AddNamespace<Type extends Required<Storage, 'id'>>(
    setting: Type,
    namespace : string = ''
) : Type {

    setting.id = AddNamespaceString(setting.id, namespace);

    return setting;

}
