import { ContainerModule } from 'inversify';
import { LanguageServerContribution } from '@theia/languages/lib/node';
import { LomeContribution } from './lome-contribution';

export default new ContainerModule(bind => {
	bind(LanguageServerContribution)
		.to(LomeContribution)
		.inSingletonScope();
});
