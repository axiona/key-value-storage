import * as Fs from 'fs';
import Standard from '@axiona/typeorm/database/standard.js';
import Config from '@axiona/typeorm/config/config.js';
import Database from '@axiona/typeorm/database/database.js';
import Storage from "../dist/database/database/storage.js";
import {Entity} from 'typeorm';
import CurrentDir from '@axiona/filesystem/string/current-dir.js';

const __dirname = CurrentDir(import.meta)

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



