/**
 * @author WMXPY
 * @namespace Authorization
 * @description Basic
 * @override Unit
 */

import { IRequestConfig } from "@barktler/core";
import { expect } from "chai";
import * as Chance from "chance";
import { createBasicAuthorizationMixin } from "../../src";
import { ExampleAPI, ExampleAPIResponse } from "../mock/example";

describe('Given [createBearerAuthorizationMixin] function', (): void => {

    const chance: Chance.Chance = new Chance('authorization-basic');

    it('should be able to add basic authorization', async (): Promise<void> => {

        let requestHeaders: Record<string, any> | undefined;

        const token: string = chance.string();

        const api: ExampleAPI = new ExampleAPI();
        api.useMixin(createBasicAuthorizationMixin({
            getTokenFunction: () => token,
        }));

        api.preHook.sideEffect.add((data: IRequestConfig) => {
            requestHeaders = data.headers;
        });

        const response: ExampleAPIResponse = await api.fetch();

        expect(typeof response.hello).to.be.equal('string');
        expect(requestHeaders).to.be.deep.equal({
            Authorization: `basic ${Buffer.from(token, 'binary').toString('base64')}`,
        });
    });

    it('should be able to add basic authorization with stringify', async (): Promise<void> => {

        let requestHeaders: Record<string, any> | undefined;

        const token: any = {
            username: chance.string(),
            password: chance.string(),
        };

        const api: ExampleAPI = new ExampleAPI();
        api.useMixin(createBasicAuthorizationMixin({
            getTokenFunction: () => token,
        }));

        api.preHook.sideEffect.add((data: IRequestConfig) => {
            requestHeaders = data.headers;
        });

        const response: ExampleAPIResponse = await api.fetch();

        expect(typeof response.hello).to.be.equal('string');
        expect(requestHeaders).to.be.deep.equal({
            Authorization: `basic ${Buffer.from(JSON.stringify(token), 'binary').toString('base64')}`,
        });
    });
});
