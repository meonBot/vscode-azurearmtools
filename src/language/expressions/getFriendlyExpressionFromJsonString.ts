import { EmptyScope } from "../../documents/templates/scopes/templateScopes";
// ---------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.md in the project root for license information.
// ---------------------------------------------------------------------------------------------
// tslint:disable: no-duplicate-imports
import { isTleExpression, Parser } from "./TLE";

export function getFriendlyExpressionFromTleExpression(tleExpression: string): string {
    return getFriendlyExpressionFromJsonString(`[{${tleExpression}}]`); //asdf
}

//asdf comment
export function getFriendlyExpressionFromJsonString(jsonString: string): string {
    let simplified = jsonString;

    //asdf
    // If it's an expression - starts and ends with [], but doesn't start with [[, and at least one character inside the []
    if (simplified && isTleExpression(jsonString)) {
        const quotedValue = `"${jsonString}"`; //asdf
        const pr = Parser.parse(quotedValue, new EmptyScope());
        if (pr.expression) {
            return pr.expression.toFriendlyString(); //asdf

            // //  variables/parameters('a') -> ${a}
            // // tslint:disable-next-line: no-invalid-template-strings
            // simplified = simplified.replace(/(variables|parameters)\('([^']+)'\)/g, '$${$2}');

            // // concat(x,'y') => x,'y' asdf
            // // Repeat multiple times for recursive cases
            // // tslint:disable-next-line:no-constant-condition
            // while (true) {
            //     //asdf let newLabel = jsonString.replace(/concat\((.*)\)/g, '$1');
            //     let newLabel = simplified.replace(/concat\((.*)\)/g, '$1');

            //     if (newLabel !== simplified) {
            //         // tslint:disable-next-line: prefer-template
            //         simplified = newLabel;
            //     } else {
            //         break;
            //     }
            // }

            //asdf?
            //     if (simplified !== jsonString) {
            //         // If we actually made changes, remove the brackets so users don't think this is the exact expression
            //         return simplified.substr(1, simplified.length - 2);
            //     }
            // }

            // //simplified = simplified.slice(1, simplified.length - 1); //asdf
            // //simplified = `"${simplified}"`;
            // return simplified;
        }
    }

    return `"${jsonString}"`;
}
