type RequestQuery = {
    [key: string]:
        | undefined
        | string
        | string[]
        | RequestQuery
        | RequestQuery[];
};

export default RequestQuery;
