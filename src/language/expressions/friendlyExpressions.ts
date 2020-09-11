import { PropertyBag } from "../../util/PropertyBag";
// ---------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.md in the project root for license information.
// ---------------------------------------------------------------------------------------------
import { isSingleQuoted, removeDoubleQuotes } from "../../util/strings";
import { isTleExpression } from "./isTleExpression";
import { Parser } from "./TLE";

/**
 * Given a JSON string that might or might not be a bracketed expression, return a friendly representation of that string
 *
 * @example 'Microsoft.sql/servers' => '"Microsoft.sql/servers"'
 * @example '[variables('v1')]' => '${v1}'
 * @example '[variables('v1')]' => '${v1}'
 */
export function getFriendlyExpressionFromJsonString(jsonString: string): string { //asdf needed?
    //asdf
    // If it's an expression - starts and ends with [], but doesn't start with [[, and at least one character inside the []
    if (isTleExpression(jsonString)) {
        const quotedBracketedJsonString = `"${jsonString}"`;
        return getFriendlyExpressionFromTleExpressionCore(quotedBracketedJsonString);
    }

    // Not an expression, just wrap with double quotes
    return `"${jsonString}"`;
}

/**
 * Given a TLE expression (without the brackets), return a friendly representation of that string
 *
 * @example 'variables('v1')' => '${v1}'
 * @example 'concat(variables('a'), '/', parameters('b'))' => '"${a}/${b}"'
 * @example 'concat(variables('a'), '/', func())' => '[${a}/func()]'
 */
export function getFriendlyExpressionFromTleExpression(jsonString: string): string {
    if (isSingleQuoted(jsonString)) {
        // Just a regular string
        // At the outermost layer, use double quotes instead of single quotes, to look more like the new string interolation notation
        return replaceSingleQuotesWithDoubleQuotes(jsonString);
    }

    const quotedBracketedJsonString = `"[${jsonString}]"`; //asdf
    return getFriendlyExpressionFromTleExpressionCore(quotedBracketedJsonString);

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

//asdf
// if (isSingleQuoted(jsonString)) {
//     return jsonString;
// } else {
//     return `[${jsonString}]`; //asdf testpoint
// }
// }

//asdf
// export class EmptyScope extends TemplateScope {
//     public scopeKind: TemplateScopeKind = TemplateScopeKind.Empty;
//     public static readonly instance: EmptyScope = new EmptyScope();

//     private constructor() {
//         super(new DeploymentTemplateDoc('', Uri.parse('https://emptydoc')), undefined, "Empty Scope");
//     }
// }

function getFriendlyExpressionFromTleExpressionCore(doubleQuotedBracketedJsonString: string): string {
    const bag = new PropertyBag();
    const pr = Parser.parse(doubleQuotedBracketedJsonString, bag); //asdf?
    if (pr.expression && pr.errors.length === 0) {
        const friendly = pr.expression.toFriendlyString();
        if (isSingleQuoted(friendly)) {
            // At the outermost layer, use double quotes instead of single quotes, to look more like the new string interolation notation
            return replaceSingleQuotesWithDoubleQuotes(friendly);
        } else if (isParamOrVarInterpolation(friendly)) {
            // It's just a single param/var reference, return as is
            return friendly;
        } else {
            // It's some other type of expression, return with brackets to make that clear
            return `[${friendly}]`;
        }
    } else {
        // There are parse errors, so we can't rely on the parse results.  Instead, just do some quick string interpolation replacements and be done.
        const unquotedExpression = removeDoubleQuotes(doubleQuotedBracketedJsonString);
        // tslint:disable-next-line: no-invalid-template-strings
        return unquotedExpression.replace(/(\bvariables\b|\bparameters\b)\('([^']+)'\)/gi, '$${$2}');
    }
}
/**
 * Returns true only if the given expression is a parameter or variable interpolation such as "${var}"
 */
export function isParamOrVarInterpolation(s: string): boolean {
    return !!s.match(/^\${[^{}]+}$/);
}

function replaceSingleQuotesWithDoubleQuotes(s: string): string {
    return s.replace(/(^'|'$)/g, '"');
}
