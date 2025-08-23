import * as React from 'react';
import monaco from 'monaco-editor';
import ReactMonacoEditor from '@monaco-editor/react';

import { useMarkdownContentStore } from '../global-stores/useMarkdownContentStore';
import { useMonacoEditorOptionsStore } from '../global-stores/useMonacoEditorOptionsStore';

export default function MonacoEditor() {
	const { setMarkdownContent } = useMarkdownContentStore();
	const { setMonacoEditorOptions, focusMode, ...monacoEditorOptions } =
		useMonacoEditorOptionsStore();
	const monacoRef = React.useRef(null);
	const editorRef = React.useRef<any>(null);
	const listenerRef = React.useRef<any>(null); // для хранения ID слушателя
	const [themeConfig, setThemeConfig] = React.useState<object | undefined>();

	function handleMonacoEditorChange(
		value: string | undefined,
		event: monaco.editor.IModelContentChangedEvent
	) {
		setMarkdownContent(value ?? '');
	}

	function updateFocusMode(editor: any) {
		if (!focusMode || !monacoRef.current) {
			editor.deltaDecorations([], []);
			return;
		}
		
		const position = editor.getPosition();
		const model = editor.getModel();
		
		// Получаем текущую строку
		const lineNumber = position.lineNumber;
		
		// Находим границы абзаца
		let startLine = lineNumber;
		let endLine = lineNumber;
		
		// Ищем начало абзаца (пустую строку выше)
		while (startLine > 1) {
			const prevLine = model.getLineContent(startLine - 1);
			if (prevLine.trim() === '') {
				break;
			}
			startLine--;
		}
		
		// Ищем конец абзаца (пустую строку ниже)
		while (endLine < model.getLineCount()) {
			const nextLine = model.getLineContent(endLine + 1);
			if (nextLine.trim() === '') {
				break;
			}
			endLine++;
		}
		
		// Применяем подсветку
		const decorations = editor.deltaDecorations([], [
			{
				range: new monacoRef.current.Range(1, 1, model.getLineCount(), 1),
				options: {
					inlineClassName: 'focus-mode-dimmed'
				}
			},
			{
				range: new monacoRef.current.Range(startLine, 1, endLine, 1),
				options: {
					inlineClassName: 'focus-mode-highlighted'
				}
			}
		]);

		console.log('startLine', startLine);
		console.log('endLine', endLine);
		console.log('focusMode', focusMode);
	}

	// Управляем слушателем при изменении focusMode
	React.useEffect(() => {
		if (!editorRef.current) return;

		if (focusMode) {
			// Создаем слушатель
			listenerRef.current = editorRef.current.onDidChangeCursorPosition(() => {
				updateFocusMode(editorRef.current);
			});
			// Сразу применяем подсветку
			updateFocusMode(editorRef.current);
		} else {
			// Удаляем слушатель
			if (listenerRef.current) {
				listenerRef.current.dispose();
				listenerRef.current = null;
			}
			// Убираем декорации
			editorRef.current.deltaDecorations([], []);
		}

		// Cleanup при размонтировании
		return () => {
			if (listenerRef.current) {
				listenerRef.current.dispose();
			}
		};
	}, [focusMode]);

	// Добавляем CSS для подсветки
	React.useEffect(() => {
		if (focusMode && monacoRef.current) {
			const style = document.createElement('style');
			style.textContent = `
				.focus-mode-dimmed {
					opacity: 0.4 !important;
				}
				.focus-mode-highlighted {
					opacity: 1 !important;
					font-weight: 500 !important;
				}
			`;
			document.head.appendChild(style);
			
			return () => {
				document.head.removeChild(style);
			};
		}
	}, [focusMode]);

	return (
		<ReactMonacoEditor
			height="100%"
			width="100%"
			theme={monacoEditorOptions.theme}
			language={monacoEditorOptions.language}
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
