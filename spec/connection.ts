import * as Fs from 'fs';
import Standard from '@alirya/typeorm/database/standard';
import Config from '@alirya/typeorm/config/config';
import Database from '@alirya/typeorm/database/database';
import Storage from "../dist/driver/database/database/storage";
import {Entity} from "typeorm";

@Entity({name:'setting'})
export class Setting extends Storage {

}

const configPath = __dirname + '/../database.json';

if(!Fs.existsSync(configPath)) {

    Fs.copyFileSync(
        __dirname + '/../database.json-dist',
        configPath
    );
}

export default function Connection(config : Partial<Config> = {}) : Database {

    let configFile : Config = JSON.parse(Fs.readFileSync(configPath).toString());

    const merged = Object.assign(configFile, config);

    const con = new Standard(merged)
    con.config.entities.set(Setting, __dirname + '/migrations');

    return con;
}



