//asdf
// // ---------------------------------------------------------------------------------------------
// // Copyright (c) Microsoft Corporation. All rights reserved.
// // Licensed under the MIT License. See License.md in the project root for license information.
// // ---------------------------------------------------------------------------------------------

// import { IParameterDefinition } from "../../parameters/IParameterDefinition";
// import { IParameterDefinitionsSource } from "../../parameters/IParameterDefinitionsSource";
// import { IParameterValuesSource } from "../../parameters/IParameterValuesSource";
// import { IResource } from "../IResource";
// import { UserFunctionDefinition } from "../UserFunctionDefinition";
// import { UserFunctionNamespaceDefinition } from "../UserFunctionNamespaceDefinition";
// import { IVariableDefinition } from "../VariableDefinition";

// export enum TemplateScopeKind {
//     Empty = "Empty",
//     TopLevel = "TopLevel",
//     ParameterDefaultValue = "ParameterDefaultValue",
//     UserFunction = "UserFunction",
//     NestedDeploymentWithInnerScope = "NestedDeploymentWithInnerScope",
//     NestedDeploymentWithOuterScope = "NestedDeploymentWithOuterScope",
//     LinkedDeployment = "LinkedDeployment",
// }

// export interface ITemplateScope extends IParameterDefinitionsSource {
//     scopeKind: TemplateScopeKind;
//     hasUniqueParamsVarsAndFunctions: boolean;
//     parameterDefinitions: IParameterDefinition[];
//     variableDefinitions: IVariableDefinition[];
//     namespaceDefinitions: UserFunctionNamespaceDefinition[];
//     resources: IResource[];
//     parameterValuesSource: IParameterValuesSource | undefined;
//     childScopes: ITemplateScope[];
//     getParameterDefinition(parameterName: string): IParameterDefinition | undefined;
//     getFunctionNamespaceDefinition(namespaceName: string): UserFunctionNamespaceDefinition | undefined;
//     getUserFunctionDefinition(namespaceName: string, functionName: string): UserFunctionDefinition | undefined;
//     getVariableDefinition(variableName: string): IVariableDefinition | undefined;
//     getVariableDefinitionFromFunctionCall(tleFunction: TLE.FunctionCallValue): IVariableDefinition | undefined;
//     getParameterDefinitionFromFunctionCall(tleFunction: TLE.FunctionCallValue): IParameterDefinition | undefined;
//     isInUserFunction: boolean;
// }
