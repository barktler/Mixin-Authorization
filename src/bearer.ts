/**
 * @author WMXPY
 * @namespace Authorization
 * @description Bearer
 */

import { Barktler, BarktlerMixin, IRequestConfig } from "@barktler/core";

export type BearerAuthorizationMixinOptions = {

    readonly getTokenFunction: () => string | Promise<string>;
};

export type MergedBearerAuthorizationMixinOptions = {
} & BearerAuthorizationMixinOptions;

export const createBearerAuthorizationMixin = (options: BearerAuthorizationMixinOptions): BarktlerMixin => {

    const mergedOptions: MergedBearerAuthorizationMixinOptions = {

        ...options,
    };

    return (instance: Barktler) => {

        instance.preHook.processor.add(async (request: IRequestConfig): Promise<IRequestConfig> => {

            const token: string = await mergedOptions.getTokenFunction();
            return {
                ...request,
                headers: {
                    ...request.headers,
                    Authorization: token,
                },
            };
        });
    };
};
