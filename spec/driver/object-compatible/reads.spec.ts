import Connection, {Setting} from "../../connection.js";
import {DataSource} from 'typeorm';
import Driver from "../../../dist/driver.js";
import Database from "../../../dist/database.js";
import {NotUndefinedParameters} from '@axiona/undefined/ensure/not-undefined.js';
import DataType from "../data-type.js";
import ObjectCompatible from "../../../dist/object-compatible.js";

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


    it('create', async ()=>{

        storage = new ObjectCompatible<DataType>({})

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
