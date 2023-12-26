import Driver from "../../../dist/driver.js";
import DataType from "../data-type.js";
import ObjectCompatible from "../../../dist/object-compatible.js";

it("enable console log", () => { spyOn(console, 'log').and.callThrough();});


describe('single', () => {

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

        storage = new ObjectCompatible<DataType>({})
    });


    it('check', async ()=>{

        expect(await storage.has('booleanValue')).toEqual(false);
        expect(await storage.has('booleanValue')).toEqual(false);
        expect(await storage.has('stringValue')).toEqual(false);
        expect(await storage.has('numberValue')).toEqual(false);
        expect(await storage.has('otherBooleanValue')).toEqual(false);
        expect(await storage.has('otherStringValue')).toEqual(false);
        expect(await storage.has('otherNumberValue')).toEqual(false);
    });


    it('create', async ()=>{

        const returns = await storage.sets(data);

        expect(data).toEqual(returns);
    });


    it('get', async ()=>{

        expect(await storage.has('booleanValue')).toEqual(true);
        expect(await storage.has('booleanValue')).toEqual(true);
        expect(await storage.has('stringValue')).toEqual(true);
        expect(await storage.has('numberValue')).toEqual(true);
        expect(await storage.has('otherBooleanValue')).toEqual(true);
        expect(await storage.has('otherStringValue')).toEqual(true);
        expect(await storage.has('otherNumberValue')).toEqual(true);
    });

});
