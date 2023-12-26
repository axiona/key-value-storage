

export type DriverIterable<Type extends Record<string, any>, Key extends keyof Type> = Iterable<[Key, Promise<Type[Key]>]>;

export default interface Storage<Type extends Record<string, any>> {

    sets<Partials extends Partial<Type>>(type: Partials) : Promise<Partials>
    all(defaults?: Partial<Type>) : Promise<Partial<Type>>
    set<Key extends keyof Type>(key : Key, value: Type[Key]): Promise<Type[Key]>;
    get<Key extends keyof Type>(key : Key): Promise<Type[Key]|undefined>;
    get<Key extends keyof Type, Default extends Type[Key] = Type[Key]>(key : Key, defaults:Default): Promise<Type[Key]|Default>;
    has<Key extends keyof Type>(key : Key): Promise<boolean>;
    delete<Key extends keyof Type>(key : Key): Promise<void>;
    clear(): Promise<void>;

    size: Promise<number>;
}
