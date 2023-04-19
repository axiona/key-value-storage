import Number from "@alirya/number/ensure/number.js";
import Boolean from "@alirya/boolean/ensure/boolean.js";
import String from '@alirya/string/ensure/string.js';
import RequiredReadonly from "./required-readonly.js";
import Id from '@alirya/typeorm/id/id.js';
import Timestamp from '@alirya/typeorm/timestamp/timestamp.js';
import StrictOmit from '@alirya/object/strict-omit.js';
import Setting from "./storage.js";
import {NotUndefinedParameters} from '@alirya/undefined/ensure/not-undefined.js';

export default class EnsuredPartial implements StrictOmit<RequiredReadonly, keyof Timestamp | keyof Id> {

    constructor(
        public entity : Setting
    ) {
    }

    get value () : any {

        return NotUndefinedParameters(this.entity.value, ()=>new Error('"value" is not provided'))
    }
    //
    // get integer () : number {
    //     // TODO SPLIT PARAM LIKE BOOLEAN BELOW?
    //     return Number(this.entity.integer, ()=>new Error('"integer" is not provided'))
    // }
    //
    // get boolean () : boolean {
    //
    //     return Boolean.Parameters(this.entity.boolean, ()=>new Error('"boolean" is not provided'))
    // }



}
