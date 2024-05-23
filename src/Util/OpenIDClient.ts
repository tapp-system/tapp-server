import {
    generators,
    Issuer,
    type Client,
    type ClientMetadata,
    type IssuerMetadata,
} from 'openid-client';

import type { Request } from 'express';

import type { T } from 'ts';

export default class OpenIDClient {
    private issuer: Issuer;
    private client: Client;

    private scopes: string;

    constructor(
        issuerOptions: IssuerMetadata,
        clientOptions: ClientMetadata,
        scopes: string,
    ) {
        this.issuer = new Issuer(issuerOptions);
        this.client = new this.issuer.Client(clientOptions);

        this.scopes = scopes;
    }

    public get redirector() {
        const codeVerifier = generators.codeVerifier();
        const codeChallenge = generators.codeChallenge(codeVerifier);

        const redirectUri = this.client.authorizationUrl({
            // acr_values
            // audience
            // claims
            // claims_locales
            // client_id
            code_challenge: codeChallenge,
            code_challenge_method: 'S256',
            // display
            // id_token_hint
            // login_hint
            // max_age
            // TODO nonce, Learn more about the nonce token
            // prompt
            // redirect_uri
            // registration
            // request
            // request_uri
            resource: this.issuer.metadata.issuer,
            // response_mode
            // response_type
            scope: this.scopes,
            // state
            // ui_locales
        });

        return {
            codeVerifier,
            redirectUri,
        };
    }

    public async get(
        req: Request<
            T.RequestParams,
            T.ResponseBody,
            T.RequestBody,
            T.RequestQuery
        >,
        code_verifier: string,
    ) {
        return (
            await this.client.callback(
                this.client.metadata.redirect_uris![0],
                this.client.callbackParams(req),
                {
                    code_verifier,
                    // jarm
                    // max_age
                    // nonce
                    // response_type
                    // scope
                    // state
                },
            )
        ).claims() as unknown as T.OpenIDClientTokenClaims;
    }
}
