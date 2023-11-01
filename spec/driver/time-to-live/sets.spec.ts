import ObjectCompatible from "../../../dist/driver/object-compatible.js";
import TimeToLive from "../../../dist/driver/time-to-live.js";
import MapCallback from '@alirya/object/map-callback.js';
import {OmitParameters} from '@alirya/object/omit.js';

it("enable console log", () => { spyOn(console, 'log').and.callThrough();});

interface Data {
    name : string;
    address : string;
    job : string;
    age : number;
}

describe('single', () => {

    const source = new ObjectCompatible<Data>({});
    const cache = new ObjectCompatible({});
    const storage = new TimeToLive<Data>(1, source, cache, true);

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

        expect(typeof (await cache.get('name'))).toEqual('number');
        expect(typeof (await cache.get('address'))).toEqual('number');

        expect(await storage.get('name')).toEqual('john');
        expect(await storage.get('address')).toEqual('street 1');

        expect(await storage.all()).toEqual({
            name: 'john',
            address: 'street 1',
        });

    });

    it('set source directly', async ()=>{

        await source.sets({
            name: 'johnny',
            address: 'street 2',
        });

        expect(await source.all()).toEqual({
            name: 'johnny',
            address: 'street 2',
        });

    });

    it('wait',  (done)=>{

        setTimeout(done, 2100)
    });

    it('get value', async ()=>{

        expect(await storage.all()).toEqual({});

    });

});
