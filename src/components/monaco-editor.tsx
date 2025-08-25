import * as React from 'react';
import monaco from 'monaco-editor';
import ReactMonacoEditor from '@monaco-editor/react';

import { useMarkdownContentStore } from '../global-stores/useMarkdownContentStore';
import { useMonacoEditorOptionsStore } from '../global-stores/useMonacoEditorOptionsStore';

export default function MonacoEditor() {
	const { setMarkdownContent } = useMarkdownContentStore();
	const { setMonacoEditorOptions, focusMode, ...monacoEditorOptions } =
		useMonacoEditorOptionsStore();
	const monacoRef = React.useRef<typeof monaco | null>(null);
	const editorRef = React.useRef<any>(null);
	const listenerRef = React.useRef<any>(null);
	const decorationsRef = React.useRef<string[]>([]);
	const [themeConfig, setThemeConfig] = React.useState<object | undefined>();

	function handleMonacoEditorChange(
		value: string | undefined,
		event: monaco.editor.IModelContentChangedEvent
	) {
		setMarkdownContent(value ?? '');
	}

	// Добавляем обработчик onMount
	function handleEditorDidMount(editor: any, monaco: typeof monaco) {
		editorRef.current = editor;
		monacoRef.current = monaco;
		
		// Если focusMode уже включен, применяем его сразу
		if (focusMode) {
			updateFocusMode(editor);
		}
	}

	function updateFocusMode(editor: any) {
		if (!focusMode || !monacoRef.current || !editor) {
			if (editor) {
				editor.deltaDecorations(decorationsRef.current, []);
				decorationsRef.current = [];
			}
			return;
		}
		
		const position = editor.getPosition();
		const model = editor.getModel();
		
		if (!position || !model) return;
		
		// Получаем текущую строку
		let lineNumber = position.lineNumber;
		const currentLine = model.getLineContent(lineNumber);
		
		// Если курсор на пустой строке, ищем ближайший непустой абзац
		if (currentLine.trim() === '') {
			// Ищем предыдущий непустой абзац
			let prevLine = lineNumber - 1;
			while (prevLine > 1) {
				const lineContent = model.getLineContent(prevLine);
				if (lineContent.trim() !== '') {
					lineNumber = prevLine;
					break;
				}
				prevLine--;
			}
		}
		
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
		
		// Создаем декорации
		const newDecorations: monaco.editor.IModelDeltaDecoration[] = [];
		
		// Затемняем весь документ
		const totalLines = model.getLineCount();
		for (let i = 1; i <= totalLines; i++) {
			const lineContent = model.getLineContent(i);
			const lineLength = lineContent.length;
			
			newDecorations.push({
				range: new monacoRef.current!.Range(i, 1, i, lineLength + 1),
				options: {
					inlineClassName: 'focus-mode-dimmed'
				}
			});
		}
		
		// Подсвечиваем только непустые строки текущего абзаца
		for (let i = startLine; i <= endLine; i++) {
			const lineContent = model.getLineContent(i);
			const lineLength = lineContent.length;
			
			// Подсвечиваем только непустые строки
			if (lineContent.trim() !== '') {
				newDecorations.push({
					range: new monacoRef.current!.Range(i, 1, i, lineLength + 1),
					options: {
						inlineClassName: 'focus-mode-highlighted'
					}
				});
			}
		}
		
		// Применяем декорации
		decorationsRef.current = editor.deltaDecorations(decorationsRef.current, newDecorations);
	}

	// Управляем слушателем при изменении focusMode
	React.useEffect(() => {
		if (!editorRef.current) return;
		console.log('focusMode', focusMode);
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
			editorRef.current.deltaDecorations(decorationsRef.current, []);
			decorationsRef.current = [];
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
		if (focusMode) {
			const style = document.createElement('style');
			style.id = 'focus-mode-styles';
			style.textContent = `
				.focus-mode-dimmed {
					opacity: 0.3 !important;
					transition: opacity 0.2s ease-in-out;
				}
				.focus-mode-highlighted {
					opacity: 1 !important;
					font-weight: 500 !important;
					transition: opacity 0.2s ease-in-out;
				}
			`;
			document.head.appendChild(style);
			
			return () => {
				const existingStyle = document.getElementById('focus-mode-styles');
				if (existingStyle) {
					document.head.removeChild(existingStyle);
				}
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
			onMount={handleEditorDidMount}
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
