import {Column} from 'typeorm';
import String from '@alirya/typeorm/id/string.js';
import ComposeTimestamp from '@alirya/typeorm/timestamp/compose.js';


export default class AbstractStorage extends ComposeTimestamp(String()) {

    @Column({nullable : true, type : "json"})
    value ?: any;
}
