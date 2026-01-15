export type FilterTypes = {
    result: ResultFilterTypes | null; 
    loading: boolean; 
    error: string | null; 
}

export type ResultFilterTypes = {
    schema: {
        attributes: {
        area: {
            enum : any;
            }
        }
    }
}