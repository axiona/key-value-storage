import Storage from "./storage";
import {Required} from "utility-types";
import AddNamespaceString from "../../../string/add-namespace";

export default function AddNamespace<Type extends Required<Storage, 'id'>>(
    setting: Type,
    namespace : string = ''
) : Type {

    setting.id = AddNamespaceString(setting.id, namespace);

    return setting;

}
