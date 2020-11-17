/**
 * @author WMXPY
 * @namespace Authorization
 * @description Basic
 */

import { Barktler, BarktlerMixin, IRequestConfig } from "@barktler/core";

export type BasicAuthorizationMixinOptions = {

    readonly getTokenFunction: () => any | Promise<any>;
    readonly base64?: boolean;
};

export type MergedBasicAuthorizationMixinOptions = {

    readonly base64: boolean;
} & BasicAuthorizationMixinOptions;

export const createBasicAuthorizationMixin = (options: BasicAuthorizationMixinOptions): BarktlerMixin => {

    const mergedOptions: MergedBasicAuthorizationMixinOptions = {

        base64: true,
        ...options,
    };

    if (typeof mergedOptions.getTokenFunction !== 'function') {
        throw new Error("[Barktler-Authorization-Mixin] Get Token Function must be Function");
    }

    return (instance: Barktler) => {

        instance.preHook.processor.add(async (request: IRequestConfig): Promise<IRequestConfig> => {

            const token: string = await mergedOptions.getTokenFunction();
            return {
                ...request,
                headers: {
                    ...request.headers,
                    Authorization: `basic ${token}`,
                },
            };
        });
    };
};
