import Driver from "../../../dist/driver.js";
import DataType from "../data-type.js";
import ObjectCompatible from "../../../dist/object-compatible.js";
import Cache from "../../../dist/cache.js";

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
    const storage = new Cache<Data>(1, storageSource, storageCache);

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
