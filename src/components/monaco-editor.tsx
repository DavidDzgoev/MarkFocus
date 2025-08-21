import * as React from 'react';
import monaco from 'monaco-editor';
import ReactMonacoEditor from '@monaco-editor/react';

import { useMarkdownContentStore } from '../global-stores/useMarkdownContentStore';
import { useMonacoEditorOptionsStore } from '../global-stores/useMonacoEditorOptionsStore';

export default function MonacoEditor() {
	const { setMarkdownContent } = useMarkdownContentStore();
	const { setMonacoEditorOptions, ...monacoEditorOptions } =
		useMonacoEditorOptionsStore();
	const monacoRef = React.useRef(null);
	const [themeConfig, setThemeConfig] = React.useState<object | undefined>();

	// React.useEffect(() => {
	// 	const getTheme = async () => {
	// 		const res = await fetch('/themes/Github.json');
	// 		const data = await res.json();
	// 		setMonacoEditorOptions({ theme: 'github' });
	// 		setThemeConfig(data);
	// 	};
	// 	getTheme();
	// }, []);

	// React.useEffect(() => {
	// 	if (monacoRef && themeConfig) {
	// 		// @ts-ignore
	// 		monacoRef?.editor?.defineTheme('github', themeConfig);
	// 		// @ts-ignore
	// 		monacoRef?.editor?.setTheme('github');
	// 	}
	// }, [themeConfig]);

	function handleMonacoEditorChange(
		value: string | undefined,
		event: monaco.editor.IModelContentChangedEvent
	) {
		setMarkdownContent(value ?? '');
	}

	function handleEditorDidMount(editor: any, monaco: any) {
		monacoRef.current = monaco;
	}

	return (
		<ReactMonacoEditor
			height="100%"
			width="100%"
			theme={monacoEditorOptions.theme}
			language={monacoEditorOptions.language}
			onMount={handleEditorDidMount}
			onChange={handleMonacoEditorChange}
			options={{
				cursorStyle: monacoEditorOptions.cursorStyle,
				cursorBlinking: monacoEditorOptions.cursorBlinking,
				minimap: {
					enabled: monacoEditorOptions.minimap,
				},
				lineNumbers: monacoEditorOptions.lineNumbers,
				fontSize: monacoEditorOptions.fontSize,
				folding: monacoEditorOptions.folding,
				lineDecorationsWidth: monacoEditorOptions.lineDecorationsWidth,
				renderLineHighlight: monacoEditorOptions.renderLineHighlight,
				scrollbar: {
					vertical: monacoEditorOptions.verticalScrollbar,
					verticalScrollbarSize: monacoEditorOptions.verticalScrollbarSize,
				},
			}}
		/>
	);
}
