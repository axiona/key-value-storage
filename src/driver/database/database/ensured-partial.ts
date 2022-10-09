import Number from "@alirya/number/ensure/number";
import Boolean from "@alirya/boolean/ensure/boolean";
import String from '@alirya/string/ensure/string';
import RequiredReadonly from "./required-readonly";
import Id from '@alirya/typeorm/id/id';
import Timestamp from '@alirya/typeorm/timestamp/timestamp';
import StrictOmit from '@alirya/object/strict-omit';
import Setting from "./storage";
import {NotUndefinedParameters} from '@alirya/undefined/ensure/not-undefined';

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
