import * as React from 'react';
import monaco from 'monaco-editor';
import ReactMonacoEditor from '@monaco-editor/react';

import { useMarkdownContentStore } from '../global-stores/useMarkdownContentStore';
import { useMonacoEditorOptionsStore } from '../global-stores/useMonacoEditorOptionsStore';
import { useSplitterStore } from '../global-stores/useSplitterStore';

export default function MonacoEditor() {
	const { markdownContent, setMarkdownContent, loadMarkdownContent } = useMarkdownContentStore();
	const { setMonacoEditorOptions, focusMode, typewriterMode, theme, ...monacoEditorOptions } =
		useMonacoEditorOptionsStore();
	const { editorWidth, setEditorWidth } = useSplitterStore();
	const monacoRef = React.useRef<typeof monaco | null>(null);
	const editorRef = React.useRef<any>(null);
	const listenerRef = React.useRef<any>(null);
	const typewriterListenerRef = React.useRef<any>(null);
	const decorationsRef = React.useRef<string[]>([]);
	const [themeConfig, setThemeConfig] = React.useState<object | undefined>();

	// Определяем классы для темной/светлой темы
	const isDark = theme === 'vs-dark';

	// Загружаем сохраненный контент при монтировании компонента
	React.useEffect(() => {
		loadMarkdownContent();
	}, [loadMarkdownContent]);

	function handleMonacoEditorChange(
		value: string | undefined,
		event: monaco.editor.IModelContentChangedEvent
	) {
		setMarkdownContent(value ?? '');
	}

	// Функция для восстановления preview
	const handleRestorePreview = () => {
		setEditorWidth(50); // Восстанавливаем на 50%
	};

	// Добавляем обработчик onMount
	function handleEditorDidMount(editor: any, monacoInstance: typeof monaco) {
		editorRef.current = editor;
		monacoRef.current = monacoInstance;
		
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

	// Функция для центрирования текущей строки в режиме печатной машинки
	const centerCurrentLine = (editor: any) => {
		if (!typewriterMode || !editor) return;
		
		const position = editor.getPosition();
		if (!position) return;
		
		const model = editor.getModel();
		if (!model) return;
		
		const lineNumber = position.lineNumber;
		const totalLines = model.getLineCount();
		
		// Вычисляем позицию для центрирования
		const visibleLines = editor.getVisibleRanges()[0];
		if (!visibleLines) return;
		
		const visibleLineCount = visibleLines.endLineNumber - visibleLines.startLineNumber;
		const targetLine = Math.max(1, Math.min(totalLines, lineNumber));
		
		// Прокручиваем к целевой строке с центрированием
		editor.revealLineInCenter(targetLine);
	};

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

	// Управляем слушателем при изменении typewriterMode
	React.useEffect(() => {
		if (!editorRef.current) return;
		
		if (typewriterMode) {
			// Создаем слушатель для режима печатной машинки
			typewriterListenerRef.current = editorRef.current.onDidChangeCursorPosition(() => {
				centerCurrentLine(editorRef.current);
			});
			// Сразу центрируем текущую строку
			centerCurrentLine(editorRef.current);
		} else {
			// Удаляем слушатель
			if (typewriterListenerRef.current) {
				typewriterListenerRef.current.dispose();
				typewriterListenerRef.current = null;
			}
		}

		// Cleanup при размонтировании
		return () => {
			if (typewriterListenerRef.current) {
				typewriterListenerRef.current.dispose();
			}
		};
	}, [typewriterMode]);

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

	// Определяем классы для темной/светлой темы

	return (
		<div className="relative h-full w-full">
			{/* Кнопка восстановления preview - показывается только когда preview скрыт */}
			{editorWidth === 100 && (
				<button
					onClick={handleRestorePreview}
					className={`absolute top-4 right-4 z-20 p-2 rounded-lg shadow-md border transition duration-300 ease-in-out hover:shadow-lg ${
						isDark 
							? 'bg-[rgb(30,30,30)] border-gray-600 text-gray-300 hover:text-gray-100' 
							: 'bg-white border-slate-200 text-slate-600 hover:text-slate-800'
					}`}
					title="Restore preview"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</button>
			)}

			<ReactMonacoEditor
				height="100%"
				width="100%"
				value={markdownContent}
				theme={theme}
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
					wordWrap: 'on',
					
					// Отключаем автодополнение
					quickSuggestions: false,
					suggestOnTriggerCharacters: false,
					acceptSuggestionOnEnter: 'off'
				}}
			/>
		</div>
	);
}
