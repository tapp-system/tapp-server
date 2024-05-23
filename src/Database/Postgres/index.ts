import pg, { type PoolConfig, type QueryResult, type QueryResultRow } from 'pg';

import type { I } from 'ts';

export default class Postgres extends pg.Pool implements I.Pool {
    constructor(options: PoolConfig) {
        super(options);
    }

    public async fetch<Row extends QueryResultRow = {}>(
        query: string,
        values: unknown[] = [],
    ) {
        let client = await this.connect();
        let result: QueryResult<Row> = {
            command: 'undefined',
            fields: [],
            oid: -1,
            rowCount: -1,
            rows: [],
        };

        try {
            // if (!client) throw new NotDefinedError(); // TODO

            await client.query('BEGIN');

            result = await client.query(query, values);

            await client.query('COMMIT');
        } catch (databaseError) {
            await client.query('ROLLBACK');

            throw databaseError;
        } finally {
            client.release();

            return result;
        }
    }
}
