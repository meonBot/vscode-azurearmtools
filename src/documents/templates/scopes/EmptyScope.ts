// ---------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.md in the project root for license information.
// ---------------------------------------------------------------------------------------------

import { Uri } from "vscode";
import { DeploymentTemplateDoc } from "../DeploymentTemplateDoc";
import { TemplateScope, TemplateScopeKind } from "./TemplateScope";

export class EmptyScope extends TemplateScope {
    public scopeKind: TemplateScopeKind = TemplateScopeKind.Empty;
    public static readonly instance: EmptyScope = new EmptyScope();

    private constructor() {
        super(new DeploymentTemplateDoc('', Uri.parse('https://emptydoc')), undefined, "Empty Scope");
    }
}
