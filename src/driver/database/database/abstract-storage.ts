import {Column, Entity} from "typeorm";
import String from '@alirya/typeorm/id/string';
import ComposeTimestamp from '@alirya/typeorm/timestamp/compose';


export default class AbstractStorage extends ComposeTimestamp(String()) {

    @Column({nullable : true, type : "json"})
    value ?: any;
}
