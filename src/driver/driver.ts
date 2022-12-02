

export type DriverIterable<Type extends Record<string, any>, Key extends keyof Type> = Iterable<[Key, Promise<Type[Key]>]>;

export default interface Driver<Type extends Record<string, any>> /*extends AsyncIterable<[keyof Type, Type[keyof Type]]>*/ {

    sets<Partials extends Partial<Type>>(type: Partials) : Promise<Partials>
    all(initial?: Partial<Type>) : Promise<Partial<Type>>
    set<Key extends keyof Type>(key : Key, value: Type[Key]): Promise<Type[Key]>;
    get<Key extends keyof Type>(key : Key): Promise<Type[Key]|undefined>;
    get<Key extends keyof Type, Default extends Type[Key] = Type[Key]>(key : Key, defaults:Default): Promise<Type[Key]|Default>;
    has<Key extends keyof Type>(key : Key): Promise<boolean>;
    delete<Key extends keyof Type>(key : Key): Promise<void>;
    clear(): Promise<void>;

    size: Promise<number>;
}
