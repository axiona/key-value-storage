import {Column, Entity} from 'typeorm';
import String from '@alirya/typeorm/id/string.js';
import ComposeTimestamp from '@alirya/typeorm/timestamp/compose.js';
import AbstractStorage from "./abstract-storage.js";

@Entity({name:'storage'})
export default class Storage extends AbstractStorage {

}
