// Lome Project
// @author Todd Saharchuk
// (c) Copyright 2023- , Todd Saharchuk

import { LomeClientContribution } from './lome-contribution';
import { LanguageClientContribution } from "@theia/languages/lib/browser";
import { ContainerModule } from "inversify";
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
import { CSharpGrammarContribution } from './csharp-grammar-contribution';

export default new ContainerModule(bind => {

    bind(LomeClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toService(LomeClientContribution);

    bind(LanguageGrammarDefinitionContribution).to(LomeGrammarContribution).inSingletonScope();
});
