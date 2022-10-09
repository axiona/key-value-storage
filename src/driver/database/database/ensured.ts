import IdRequired from '@alirya/typeorm/id/required-readonly-string';
import RecordRequired from '@alirya/typeorm/timestamp/required-readonly-standard';
import EnsuredPartial from "./ensured-partial";
import RequiredReadonly from "./required-readonly";
import GetListFirst from "@alirya/proxy/handler/get-list-first";
import List from "@alirya/proxy/list";
import Setting from "./storage";

export default function Ensured(record : Setting) : RequiredReadonly {

    return List([
        new EnsuredPartial(record),
        new RecordRequired(record),
        new IdRequired(record),
    ], [
        (objects)=>new GetListFirst(objects)
    ]);

}
