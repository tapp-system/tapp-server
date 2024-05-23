import type { QueryResult, QueryResultRow } from 'pg';

export default interface Pool {
    fetch: <Row extends QueryResultRow>(
        query: string,
        values?: unknown[],
    ) => Promise<QueryResult<Row>>;
}
