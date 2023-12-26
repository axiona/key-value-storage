type Mapper<Type extends Record<string, string|number|boolean>> = {
    [Key in keyof Type]: Type[Key] extends boolean ? 'boolean' : (Type[Key] extends string ? 'string' : 'integer');
};

export default Mapper;