import {Column} from 'typeorm';
import String from '@axiona/typeorm/id/string.js';
import ComposeTimestamp from '@axiona/typeorm/timestamp/compose.js';


export default class AbstractStorage extends ComposeTimestamp(String()) {

    @Column({nullable : true, type : "json"})
    value ?: any;
}
