import { Router } from 'express';
import { readdir } from 'node:fs/promises';
import { cwd } from 'node:process';

import type { T } from 'ts';

import { methodNotAllowed } from '../Middleware';

import { routerOptions } from '../../Config';
import { handler as handlerWrapper } from '../../Util';

const httpMethods = new Set<T.Http.Method>([
    'checkout',
    'copy',
    'delete',
    'get',
    'head',
    'lock',
    'm-search',
    'merge',
    'mkactivity',
    'mkcol',
    'move',
    'notify',
    'options',
    'patch',
    'post',
    'purge',
    'put',
    'report',
    'search',
    'subscribe',
    'trace',
    'unlock',
    'unsubscribe',
]);

const routes = async (path: string = '/') => {
    const router = Router(routerOptions);
    const routerPath = cwd() + '/dist/Server/Routes' + path;

    const routePathArray = await readdir(routerPath, {
        encoding: 'utf-8',
        recursive: false,
        // withFileTypes:
    });

    for (let routePath of routePathArray) {
        const route =
            '/' +
            routePath
                .replace(/\.map/gi, '')
                .replace(/\.[j|t]s/g, '')
                .replace(/index/gi, '')
                .replace(/\./g, '/')
                .replace(/\_/g, ':');

        if (routePath.includes('.js')) {
            if (routePath.endsWith('.map')) continue;

            const {
                default: { handler, methods, middleware },
            }: T.DefaultImport<T.Route<false>> = await import(
                'file://' + routerPath + '/' + routePath
            );

            let map = Array.from(methods);
            let notMap = Array.from(httpMethods).filter(
                (value) => !map.includes(value),
            );

            map.forEach((method) => {
                router[method](
                    route,
                    middleware || [],
                    handlerWrapper(handler),
                );
            });
            notMap.forEach((method) => {
                router[method](
                    route,
                    middleware || [],
                    handlerWrapper(methodNotAllowed),
                );
            });
        } else {
            let middleware: T.Middleware<
                T.RequestBody,
                T.RequestParams,
                T.RequestQuery
            > = [];
            try {
                const {
                    default: { routeMiddleware },
                }: T.DefaultImport<T.Route<true>> = await import(
                    'file://' + routerPath + routePath + '/index'
                );

                if (routeMiddleware) middleware = routeMiddleware;
            } catch (err) {
                if (err instanceof Error) {
                    if (err.message.startsWith('Cannot find module')) {
                    } else {
                        throw err;
                    }
                }
            }

            router.use(route, middleware, await routes(path + route));
        }
    }

    if (path === '/') {
        const {
            default: { handler },
        }: T.DefaultImport<T.Route<false>> = await import(
            'file://' + routerPath + '/404'
        );

        router.use('*', handlerWrapper(handler));
    }

    return router;
};

export default routes;
