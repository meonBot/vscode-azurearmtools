// ---------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.md in the project root for license information.
// ---------------------------------------------------------------------------------------------

import { templateKeys } from "../../constants";
import { getFriendlyExpressionFromTleExpression } from "../../language/expressions/friendlyExpressions";
import { removeSingleQuotes } from "../../util/strings";
import { IJsonResourceInfo } from "./getResourcesInfo";

export function getResourceFriendlyName(
    { resource
    }:
        {
            resource: IJsonResourceInfo;
        }
): string {
    const resourceObject = resource.resourceObject;

    // Object contains no elements
    if (resource.resourceObject.properties.length === 0) {
        return "(empty resource)"; //asdf shouldn't happen
    } else {
        // Object contains elements, look for displayName tag first
        // tslint:disable-next-line: strict-boolean-expressions
        let tags = resourceObject.getPropertyValue(templateKeys.tags)?.asObjectValue;
        let displayName = tags?.getPropertyValue(templateKeys.displayNameTag)?.asStringValue?.unquotedValue;
        if (displayName) {
            return displayName;
        }

        let nameLabel: string;
        const name = resource.shortNameExpression; //asdf  resourceObject.getPropertyValue(templateKeys.resourceName)?.asStringValue?.unquotedValue;
        if (name) {
            nameLabel = getFriendlyExpressionFromTleExpression(name);
        } else {
            nameLabel = "(unnamed resource)";
        }

        //asdf
        // label = this.getLabelFromProperties("namespace", resourceObject);
        // if (label !== undefined) {
        //     return label;
        // }
        //asdflet typeLabel = resource.getFullTypeExpression() ?? "no type";
        let typeLabel = resource.shortTypeExpression ?? '(no type)';
        typeLabel = /*asdf expressionToFriendlyString*/ (typeLabel.replace(/microsoft\./ig, 'MS.')); //asdf

        //typeLabel = expressionToFriendlyString(typeLabel); //asdf
        typeLabel = removeSingleQuotes(typeLabel);

        //asdf return `{${nameLabel}, ${typeLabel}}`;
        //asdfreturn `${typeLabel} (${nameLabel})`;
        return `"${nameLabel}" (${typeLabel})`;

        //asdf    }
        // } else if (elementInfo.current.value.kind === Json.ValueKind.ArrayValue || elementInfo.current.value.kind === Json.ValueKind.ObjectValue) {
        //     // The value of the node is an array or object (e.g. properties or resources) - return key as the node label
        //     return toFriendlyString(keyNode);
        // } else if (elementInfo.current.value.start !== undefined) {
        //     // For other value types, display key and value since they won't be expandable
        //     const valueNode = this.tree && this.tree.getValueAtCharacterIndex(elementInfo.current.value.start, ContainsBehavior.strict);
        //     return `${keyNode instanceof Json.StringValue ? toFriendlyString(keyNode) : "?"}: ${toFriendlyString(valueNode)}`;
    }
}

//asdf
// export function expressionToFriendlyString(expression: string): string { //asdf pass in expression or json string?  Or either?  Need to distinguish the two better
//     if (isSingleQuoted(expression)) {
//         return removeSingleQuotes(expression); //asdf
//     } else {
//         return jsonStringToFriendlyString(`[${expression}]`); //asdf
//     }
// }
