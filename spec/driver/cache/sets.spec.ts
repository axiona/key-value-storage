import Driver from "../../../dist/driver.js";
import ObjectCompatible from "../../../dist/object-compatible.js";
import Cache, {CacheTimeToLive} from "../../../dist/cache.js";
import MapCallback from '@axiona/object/map-callback.js';
import {OmitParameters} from '@axiona/object/omit.js';

it("enable console log", () => { spyOn(console, 'log').and.callThrough();});

interface Data {
    name : string;
    address : string;
    job : string;
    age : number;
}

describe('single', () => {

    const source = new ObjectCompatible<Data>({});
    const cache = new ObjectCompatible<CacheTimeToLive<Data>>({});
    const storage = new Cache<Data>(1, source, cache);

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

        expect((await cache.get('name'))?.value).toEqual('john');
        expect((await cache.get('address'))?.value).toEqual('street 1');

        expect(await storage.get('name')).toEqual('john');
        expect(await storage.get('address')).toEqual('street 1');


        expect(OmitParameters(MapCallback(await cache.all(), value => value?.value), '#ALL' as any)).toEqual({
            name: 'john',
            address: 'street 1',
        });

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

        expect(OmitParameters(MapCallback(await cache.all(), value => value?.value), '#ALL' as any)).toEqual({
            name: 'john',
            address: 'street 1',
        });

    });

    it('wait',  (done)=>{

        setTimeout(done, 1000)
    });

    it('get value before load', async ()=>{

        expect(await source.all()).toEqual({
            name: 'johnny',
            address: 'street 2',
        });

        expect(OmitParameters(MapCallback(await cache.all(), value => value?.value), '#ALL' as any)).toEqual({
            name: 'john',
            address: 'street 1',
        });


    });

    it('get value', async ()=>{

        expect(await storage.all()).toEqual({
            name: 'johnny',
            address: 'street 2',
        });

        expect(OmitParameters(MapCallback(await cache.all(), value => value?.value), '#ALL' as any)).toEqual({
            name: 'johnny',
            address: 'street 2',
        });

    });

    it('get value after load', async ()=>{

        expect(OmitParameters(MapCallback(await cache.all(), value => value?.value), '#ALL' as any)).toEqual({
            name: 'johnny',
            address: 'street 2',
        });

    });

});
