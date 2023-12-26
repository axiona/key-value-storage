import Connection, {Setting} from "../../connection.js";
import {DataSource} from 'typeorm';
import Driver from "../../../dist/driver.js";
import Database from "../../../dist/database.js";
import DataType from "../data-type.js";

it("enable console log", () => { spyOn(console, 'log').and.callThrough();});


describe('single', () => {


    let connection : DataSource;
    let storage : Driver<DataType>;

    const data : DataType = {
        booleanValue: true,
        stringValue: 'string 1',
        numberValue: 1,
        otherBooleanValue: false,
        otherStringValue: 'string 2',
        otherNumberValue: 2,
    };

    it('open connection', async ()=>{

        connection = await Connection().connect();
        await connection.getRepository(Setting).clear();
    });


    it('create', async ()=>{

        storage = new Database<DataType>(connection, '', Setting)

        const returns = await storage.sets(data);

        expect(data).toEqual(returns);
    });

    it('read', async ()=>{

        let settings = await storage.all();

        expect(data).toEqual(settings as typeof data);
    });

});
