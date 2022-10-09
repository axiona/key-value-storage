import Storage from "./storage";
import {Required} from "utility-types";
import RemoveNamespaceString from "../../../string/remove-namespace";

export default function RemoveNamespace<Type extends Required<Storage, 'id'>>(
    setting: Type,
    namespace : string = ''
) : Type {


    setting.id = RemoveNamespaceString(setting.id, namespace);

    return setting;

}
