import { injectable, inject } from 'inversify';
import {
	BaseLanguageClientContribution,
	Languages,
	LanguageClientFactory,
	Workspace
} from '@theia/languages/lib/browser';
import { LOME_LANGUAGE_ID, LOME_LANGUAGE_NAME } from '../common';

@injectable()
export class LomeClientContribution extends BaseLanguageClientContribution {
	readonly id = LOME_LANGUAGE_ID;
	readonly name = LOME_LANGUAGE_NAME;

	constructor(
		@inject(Workspace) protected readonly workspace: Workspace,
		@inject(Languages) protected readonly languages: Languages,
		@inject(LanguageClientFactory)
		protected readonly languageClientFactory: LanguageClientFactory)
	{
		super(workspace, languages, languageClientFactory);
	}

	createOptions() {
		const parent = super.createOptions();
		let hasLogged = false;
		parent.middleware = {
			resolveCompletionItem: (item: any) => {
				if (!hasLogged) {
					console.log("completion/resolve disabled for Lome", item);
					hasLogged = true;
				}

				return Promise.resolve(item);
			}
		}

		return parent;
	}

	protected get globPatterns() {
		return [
			'**/*.md', '**/*.mdl'
		];
	}

	get configurationSection() {
		return 'rust';
	}
}
