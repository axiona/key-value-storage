import IdRequired from '@axiona/typeorm/id/required-readonly-string.js';
import RecordRequired from '@axiona/typeorm/timestamp/required-readonly-standard.js';
import EnsuredPartial from "./ensured-partial.js";
import RequiredReadonly from "./required-readonly";
import GetListFirst from "@axiona/proxy/handler/get-list-first.js";
import List from "@axiona/proxy/list.js";
import Setting from "./storage.js";

export default function Ensured(record : Setting) : RequiredReadonly {

    return List([
        new EnsuredPartial(record),
        new RecordRequired(record),
        new IdRequired(record),
    ], [
        (objects)=>new GetListFirst(objects)
    ]);

}
