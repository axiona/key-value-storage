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

    const update : DataType = {
        booleanValue: false,
        stringValue: 'string 1 update',
        numberValue: 111,
        otherBooleanValue: true,
        otherStringValue: 'string 2 update',
        otherNumberValue: 2222,
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

    describe('single', () => {

        it('update', async ()=>{

            return Promise.all([
                storage.set('booleanValue', update.booleanValue),
                storage.set('stringValue', update.stringValue),
                storage.set('numberValue', update.numberValue),
                storage.set('otherBooleanValue', update.otherBooleanValue),
                storage.set('otherStringValue', update.otherStringValue),
                storage.set('otherNumberValue', update.otherNumberValue),
            ]);

        });

        it('read', async ()=>{

            let all = await storage.all();
            expect(update).toEqual(all as DataType);
        });
    });

    describe('all', () => {

        it('update', async ()=>{

            await storage.sets(data);

        });

        it('read', async ()=>{

            let settings = await storage.all();
            expect(data).toEqual(settings as typeof data);
        });
    });

});
