/**
 * @author WMXPY
 * @namespace Authorization
 * @description Example
 * @override Mock
 */

import { Barktler, RequestDriver } from "@barktler/core";
import { createMockDriver } from "@barktler/driver-mock";

export type ExampleAPIResponse = {

    readonly hello: string;
};

export class ExampleAPI extends Barktler<any, ExampleAPIResponse> {

    protected readonly defaultDriver: RequestDriver | null = createMockDriver({
        mockResponseData: true,
    });

    public constructor() {

        super();

        super._declareResponseDataPattern({
            type: 'map',
            map: {
                hello: {
                    type: 'string',
                },
            },
        });
    }

    public async fetch(): Promise<ExampleAPIResponse> {

        return await this._requestForData({
            url: 'https://example.com',
            method: 'POST',
        });
    }
}
