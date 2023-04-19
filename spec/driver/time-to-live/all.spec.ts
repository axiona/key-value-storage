import Driver from "../../../dist/driver/driver.js";
import DataType from "../data-type.js";
import ObjectCompatible from "../../../dist/driver/object-compatible.js";
import TimeToLive from "../../../dist/driver/time-to-live.js";

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

    it('set', async ()=>{

        await storage.sets({
            name: 'john',
            address: 'street 1',
        });
    });

    it('read', async ()=>{

        expect(await storage.all()).toEqual({
            name: 'john',
            address: 'street 1',
        });

        expect(await storage.get('name')).toEqual('john');
        expect(JSON.parse(source[':name'])).toBe('john');
        expect(JSON.parse(cache[':name']).value).toBe('john');

        expect(await storage.get('address')).toEqual('street 1');
        expect(JSON.parse(source[':address'])).toBe('street 1');
        expect(JSON.parse(cache[':address']).value).toBe('street 1');

    });

    it('set source directly', async ()=>{

        source[':name'] = '"johnny"';
        source[':address'] = '"street 2"';

        expect(JSON.parse(source[':name'])).toBe('johnny');
        expect(JSON.parse(source[':address'])).toBe('street 2');

        expect(JSON.parse(cache[':name']).value).toBe('john');
        expect(JSON.parse(cache[':address']).value).toBe('street 1');

        expect(await storage.all()).toEqual({
            name: 'john',
            address: 'street 1',
        });

    });

    it('wait',  (done)=>{

        setTimeout(done, 1000)
    });

    it('set source directly', async ()=>{

        source[':name'] = '"johnny"';
        expect(JSON.parse(source[':name'])).toBe('johnny');
        expect(JSON.parse(cache[':name']).value).toBe('john');

        expect(JSON.parse(source[':address'])).toBe('street 2');
        expect(JSON.parse(cache[':address']).value).toBe('street 1');

        expect(await storage.all()).toEqual({
            name: 'johnny',
            address: 'street 2',
        });

    });

});