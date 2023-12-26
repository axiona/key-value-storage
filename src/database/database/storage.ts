import {Entity} from 'typeorm';
import AbstractStorage from "./abstract-storage.js";

@Entity({name:'storage'})
export default class Storage extends AbstractStorage {

}
