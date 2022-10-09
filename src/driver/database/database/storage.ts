import {Column, Entity} from "typeorm";
import String from '@alirya/typeorm/id/string';
import ComposeTimestamp from '@alirya/typeorm/timestamp/compose';
import AbstractStorage from "./abstract-storage";

@Entity({name:'storage'})
export default class Storage extends AbstractStorage {

}
