import Driver from "../../../dist/storage.js";
import ObjectCompatible from "../../../dist/object-compatible.js";
import DataType from "../data-type.js";

it("enable console log", () => { spyOn(console, 'log').and.callThrough();});


describe('single', () => {

    let storage : Driver<typeof data>;

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

    it('read', async ()=>{

        let settings = await storage.all();

        expect(data).toEqual(settings as DataType);
    });

});
