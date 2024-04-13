import { interfaces } from 'inversify';
import {
	createPreferenceProxy,
	PreferenceProxy,
	PreferenceService,
	PreferenceContribution,
	PreferenceSchema,
	PreferenceChangeEvent
} from '@theia/core/lib/browser/preferences';


export interface LomeConfiguration {
}

export type LomePreferenceChange = PreferenceChangeEvent<LomeConfiguration>;

export const LomePreferences = Symbol('TypescriptPreferences');
export type LomePreferences = PreferenceProxy<LomeConfiguration>;

export function createLomePreferences(preferences: PreferenceService): LomePreferences {
	return createPreferenceProxy(preferences, lomePreferenceSchema);
}

export function bindLomePreferences(bind: interfaces.Bind): void {
	bind(LomePreferences).toDynamicValue(ctx => {
		const preferences = ctx.container.get<PreferenceService>(PreferenceService);
		return createLomePreferences(preferences);
	}).inSingletonScope();

	bind(PreferenceContribution).toConstantValue({ schema: lomePreferenceSchema });
}

export const lomePreferenceSchema: PreferenceSchema = {
	"type": "object",
	"properties": {
		"rust.sysroot": {
			"type": [
				"string",
				"null"
			],
			"default": null,
			"description": "--sysroot",
			"scope": "resource"
		},
	}
};
