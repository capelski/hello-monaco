import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MonacoComponent } from './monaco-component';

declare var self: any;

self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId: string, label: string) {
		if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css') {
			return './css.worker.bundle.js';
		}
		if (label === 'html') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	}
}

ReactDOM.render(<MonacoComponent />, document.getElementById('app'))