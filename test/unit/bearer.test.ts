/**
 * @author WMXPY
 * @namespace Authorization
 * @description Bearer
 * @override Unit
 */

import { IRequestConfig } from "@barktler/core";
import { expect } from "chai";
import * as Chance from "chance";
import { createBearerAuthorizationMixin } from "../../src";
import { ExampleAPI, ExampleAPIResponse } from "../mock/example";

describe('Given [createBearerAuthorizationMixin] function', (): void => {

    const chance: Chance.Chance = new Chance('authorization-bearer');

    it('should be able to add bearer authorization', async (): Promise<void> => {

        let requestHeaders: Record<string, any> | undefined;

        const token: string = chance.string();

        const api: ExampleAPI = new ExampleAPI();
        api.useMixin(createBearerAuthorizationMixin({
            getTokenFunction: () => token,
        }));

        api.preHook.sideEffect.add((data: IRequestConfig) => {
            requestHeaders = data.headers;
        });

        const response: ExampleAPIResponse = await api.fetch();

        expect(typeof response.hello).to.be.equal('string');
        expect(requestHeaders).to.be.deep.equal({
            Authorization: `bearer ${token}`,
        });
    });
});
