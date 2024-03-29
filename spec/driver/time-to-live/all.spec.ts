import ObjectCompatible from "../../../dist/object-compatible.js";
import TimeToLive from "../../../dist/time-to-live.js";

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
    const storage = new TimeToLive<Data>(1, storageSource, storageCache, true);

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
        expect(typeof JSON.parse(cache[':name'])).toBe('number');

        expect(await storage.get('address')).toEqual('street 1');
        expect(JSON.parse(source[':address'])).toBe('street 1');
        expect(typeof JSON.parse(cache[':address'])).toBe('number');

    });

    it('set source directly', async ()=>{

        source[':name'] = '"johnny"';
        source[':address'] = '"street 2"';

        expect(JSON.parse(source[':name'])).toBe('johnny');
        expect(JSON.parse(source[':address'])).toBe('street 2');

        expect(typeof JSON.parse(cache[':name'])).toBe("number");
        expect(typeof JSON.parse(cache[':address'])).toBe("number");

        expect(await storage.all()).toEqual({
            name: 'johnny',
            address: 'street 2',
        });

        expect(await storageSource.all()).toEqual({
            name: 'johnny',
            address: 'street 2',
        });

    });

    it('wait',  (done)=>{

        setTimeout(done, 2100)
    });

    it('set source directly', async ()=>{

        source[':name'] = '"johnny"';
        expect(JSON.parse(source[':name'])).toBe('johnny');
        expect(cache[':name']).toBe(undefined);

        expect(source[':address']).toBe(undefined);
        expect(cache[':address']).toBe(undefined);

        expect(await storage.all()).toEqual({
            name: 'johnny',
        });

    });

});
