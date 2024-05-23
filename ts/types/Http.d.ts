type SucessCodes = [200, 'SUCCESS'] | [201, 'CREATED'] | [204, 'NO CONTENT'];

type RedirectionCodes = [301, 'MOVED PERMANENTLY'] | [303, 'SEE OTHER'];

type ClientErrorCodes =
    | [400, 'BAD REQUEST']
    | [401, 'UNAUTHENTICATED']
    | [403, 'UNAUTHORIZED']
    | [404, 'NOT FOUND']
    | [405, 'METHOD NOT ALLOWED']
    | [409, 'CONFLICT'];

type ServerErrorCodes =
    | [500, 'INTERNAL SERVER ERROR']
    | [520, 'UNEXPECTED SERVER ERROR']
    | [521, 'UNHANDLED SERVER ERROR'];

export type Code =
    | SucessCodes
    | RedirectionCodes
    | ClientErrorCodes
    | ServerErrorCodes;

// TODO Find way to dynamicly create this type from the types above
export type CodeMap = {
    200: 'SUCCESS';
    201: 'CREATED';
    204: 'NO CONTENT';
    301: 'MOVED PERMANENTLY';
    303: 'SEE OTHER';
    400: 'BAD REQUEST';
    401: 'UNAUTHENTICATED';
    403: 'UNAUTHORIZED';
    404: 'NOT FOUND';
    405: 'METHOD NOT ALLOWED';
    409: 'CONFLICT';
    500: 'INTERNAL SERVER ERROR';
    520: 'UNEXPECTED SERVER ERROR';
    521: 'UNHANDLED SERVER ERROR';
};

export type Method =
    | 'checkout'
    | 'copy'
    | 'delete'
    | 'get'
    | 'head'
    | 'lock'
    | 'merge'
    | 'mkactivity'
    | 'mkcol'
    | 'move'
    | 'm-search'
    | 'notify'
    | 'options'
    | 'patch'
    | 'post'
    | 'purge'
    | 'put'
    | 'report'
    | 'search'
    | 'subscribe'
    | 'trace'
    | 'unlock'
    | 'unsubscribe';
