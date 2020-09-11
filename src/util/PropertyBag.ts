// ---------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.md in the project root for license information.
// ---------------------------------------------------------------------------------------------

import { assert } from "../fixed_assert";

export class PropertyBag {
    private _map: Map<string, unknown> = new Map<string, unknown>();

    //asdf
    // public constructor(dictionary?: { [key: string]: unknown }) {
    //     // tslint:disable-next-line: no-non-null-assertion
    //     this._map = new Map<string, unknown>([{one: 1}]);
    // }

    // tslint:disable-next-line: no-reserved-keywords
    public get<T>(key: string): T {
        const value = this._map.get(key);
        if (value === undefined) {
            assert.fail(`Could not find a property bag value for key "${key}"`);
        }

        return value as T;
    }

    public tryGet<T>(key: string): T | undefined {
        return this._map.get(key) as T;
    }

    // tslint:disable-next-line: no-reserved-keywords
    public set<T>(key: string, value: T): void {
        this._map.set(key, value);
    }
}
