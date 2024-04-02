/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { getVSCodeDownloadUrl } from '@vscode/test-electron/out/util';
import * as path from 'path';
import { workspace, ExtensionContext, languages } from 'vscode';
import { CompletionRequest } from 'vscode-languageserver-protocol';
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// The server is implemented in node
	const serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
		}
	};

	const languageId = 'lomemarkdown';

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		documentSelector: [{
			scheme: 'file',
			pattern: '**/*.{md,mdl}',
			language: languageId }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		languageId,
		'Lome Markdown Language',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();

	const feature =	client.getFeature(CompletionRequest.method);
	console.log(`completion feature: ${feature}`);
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
