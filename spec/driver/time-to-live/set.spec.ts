import Driver from "../../../dist/driver/driver";
import DataType from "../data-type";
import ObjectCompatible from "../../../dist/driver/object-compatible";
import TimeToLive from "../../../dist/driver/time-to-live";

it("enable console log", () => { spyOn(console, 'log').and.callThrough();});

interface Data {
    name : string;
    address : string;
    job : string;
    age : number;
}

describe('single', () => {

    let source = {};
    let cache = {};

    const storageSource = new ObjectCompatible<Data>(source);
    const storageCache = new ObjectCompatible(cache);
    const storage = new TimeToLive<Data>(1, storageSource, storageCache);

    // let storage : Driver<typeof data>;
    //
    // const data : DataType = {
    //     booleanValue: true,
    //     stringValue: 'string 1',
    //     numberValue: 1,
    //     otherBooleanValue: false,
    //     otherStringValue: 'string 2',
    //     otherNumberValue: 2,
    // };


    it('set', async ()=>{

        return storage.set('name', 'john');
    });

    it('read', async ()=>{

        expect(JSON.parse(source[':name'])).toBe('john');
        expect(JSON.parse(cache[':name']).value).toBe('john');
        expect(await storage.get('name')).toBe('john');

    });

    it('set source directly', async ()=>{

        source[':name'] = '"johnny"';
        expect(JSON.parse(source[':name'])).toBe('johnny');
        expect(JSON.parse(cache[':name']).value).toBe('john');
        expect(await storage.get('name')).toBe('john');

    });

    it('wait',  (done)=>{

        setTimeout(done, 1000)
    });

    it('set source directly', async ()=>{

        source[':name'] = '"johnny"';
        expect(JSON.parse(source[':name'])).toBe('johnny');
        expect(JSON.parse(cache[':name']).value).toBe('john');
        expect(await storage.get('name')).toBe('johnny');
        expect(JSON.parse(cache[':name']).value).toBe('johnny');

    });

});