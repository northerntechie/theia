import { ContainerModule } from 'inversify';
import { LomeClientContribution } from './lome-client-contribution';
import { LanguageClientContribution } from '@theia/languages/lib/browser';
import { bindLomePreferences } from './lome-preferences';

export default new ContainerModule(bind => {
	bindLomePreferences(bind);
	bind(LomeClientContribution).toSelf().inSingletonScope();
	bind(LanguageClientContribution).toDynamicValue(ctx =>
		ctx.container.get(LomeClientContribution))
		.inSingletonScope();
});
