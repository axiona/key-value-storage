import Connection, {Setting} from "../../connection";
import {DataSource} from "typeorm";
import Driver from "../../../dist/driver/driver";
import Database from "../../../dist/driver/database";
import {NotUndefinedParameters} from '@alirya/undefined/ensure/not-undefined';
import DataType from "../data-type";

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

        storage = new Database<DataType>(connection, '', Setting);

        const returns = await storage.sets(data);

        expect(data).toEqual(returns);
    });

    it('all', async ()=>{

        let settings = await storage.all();

        expect(data).toEqual(settings as DataType);
    });

    it('get', async ()=>{

        expect(data.booleanValue).toEqual(NotUndefinedParameters(await storage.get('booleanValue')));
        expect(data.booleanValue).toEqual(NotUndefinedParameters(await storage.get('booleanValue')));
        expect(data.stringValue).toEqual(NotUndefinedParameters(await storage.get('stringValue')));
        expect(data.numberValue).toEqual(NotUndefinedParameters(await storage.get('numberValue')));
        expect(data.otherBooleanValue).toEqual(NotUndefinedParameters(await storage.get('otherBooleanValue')));
        expect(data.otherStringValue).toEqual(NotUndefinedParameters(await storage.get('otherStringValue')));
        expect(data.otherNumberValue).toEqual(NotUndefinedParameters(await storage.get('otherNumberValue')));
    });

});
