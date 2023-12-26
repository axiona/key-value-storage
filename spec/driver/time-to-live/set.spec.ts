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

        return storage.set('name', 'john');
    });

    it('read', async ()=>{

        expect(JSON.parse(source[':name'])).toBe('john');
        expect(typeof JSON.parse(cache[':name'])).toBe('number');
        expect(await storage.get('name')).toBe('john');

    });

    it('set source directly', async ()=>{

        source[':name'] = '"johnny"';
        expect(JSON.parse(source[':name'])).toBe('johnny');
        expect(typeof JSON.parse(cache[':name'])).toBe('number');
        expect(await storage.get('name')).toBe('johnny');

    });

    it('wait',  (done)=>{

        setTimeout(done, 2100)
    });

    it('set source directly', async ()=>{

        source[':name'] = '"johnny"';
        expect(JSON.parse(source[':name'])).toBe('johnny');
        expect(cache[':name']).toBe(undefined);
        expect(await storage.get('name')).toBe('johnny');
        expect(cache[':name']).toBe(undefined);

    });

});
