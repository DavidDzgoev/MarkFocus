import create from 'zustand';
import { combine } from 'zustand/middleware';

type MonacoEditorOptionsStore = {
	editorType: 'monaco' | 'text';
	theme: string;
	language: 'markdown' | 'javascript' | 'typescript';
	minimap: boolean;
	verticalScrollbar: 'auto' | 'visible' | 'hidden';
	verticalScrollbarSize: number;
	horizontalScrollbar: 'auto' | 'visible' | 'hidden';
	horizontalScrollbarSize: number;
	lineNumbers: 'on' | 'off' | 'relative';
	folding: boolean;
	fontSize: number;
	lineDecorationsWidth: number;
	renderLineHighlight: 'none' | 'gutter' | 'line' | 'all';
	cursorBlinking: 'blink' | 'smooth' | 'phase' | 'expand' | 'solid';
	cursorStyle:
		| 'line'
		| 'block'
		| 'underline'
		| 'line-thin'
		| 'block-outline'
		| 'underline-thin';
	focusMode: boolean;
	typewriterMode: boolean;
};

// Функция для получения сохраненных настроек из localStorage (исключаем focusMode и typewriterMode)
const getSavedOptions = (): Partial<MonacoEditorOptionsStore> => {
	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem('monaco-editor-options');
		if (saved) {
			const parsed = JSON.parse(saved);
			// Удаляем focusMode и typewriterMode из сохраненных настроек
			const { focusMode, typewriterMode, ...optionsToLoad } = parsed;
			return optionsToLoad;
		}
	}
	return {};
};

// Функция для сохранения настроек в localStorage (исключаем focusMode и typewriterMode)
const saveOptions = (options: MonacoEditorOptionsStore): void => {
	if (typeof window !== 'undefined') {
		// Создаем копию без focusMode и typewriterMode для сохранения
		const { focusMode, typewriterMode, ...optionsToSave } = options;
		localStorage.setItem('monaco-editor-options', JSON.stringify(optionsToSave));
	}
};

export const useMonacoEditorOptionsStore = create(
	combine(
		{
			editorType: 'monaco',
			theme: 'vs-light',
			language: 'markdown',
			minimap: false,
			verticalScrollbar: 'hidden',
			verticalScrollbarSize: 0,
			horizontalScrollbar: 'hidden',
			horizontalScrollbarSize: 0,
			lineNumbers: 'on',
			folding: false,
			fontSize: 15,
			lineDecorationsWidth: 15,
			renderLineHighlight: 'line',
			cursorBlinking: 'smooth',
			cursorStyle: 'underline',
			focusMode: false,
			typewriterMode: false,
			...getSavedOptions(), // Загружаем сохраненные настройки (без focusMode)
		} as MonacoEditorOptionsStore,
		(set, get) => ({
			setMonacoEditorOptions: (
				newOptions: Partial<MonacoEditorOptionsStore>
			) => {
				const updatedOptions = { ...get(), ...newOptions };
				set(updatedOptions);
				// Сохраняем в localStorage при каждом изменении (без focusMode)
				saveOptions(updatedOptions);
			},
			// Функция для очистки сохраненных настроек
			clearMonacoEditorOptions: () => {
				const defaultOptions = {
					editorType: 'monaco',
					theme: 'vs-light',
					language: 'markdown',
					minimap: false,
					verticalScrollbar: 'hidden',
					verticalScrollbarSize: 0,
					horizontalScrollbar: 'hidden',
					horizontalScrollbarSize: 0,
					lineNumbers: 'on',
					folding: false,
					fontSize: 15,
					lineDecorationsWidth: 15,
					renderLineHighlight: 'line',
					cursorBlinking: 'smooth',
					cursorStyle: 'underline',
					focusMode: false,
					typewriterMode: false,
				} as MonacoEditorOptionsStore;
				set(defaultOptions);
				if (typeof window !== 'undefined') {
					localStorage.removeItem('monaco-editor-options');
				}
			},
			// Функция для загрузки настроек из localStorage
			loadMonacoEditorOptions: () => {
				const savedOptions = getSavedOptions();
				set({ ...get(), ...savedOptions });
			},
		})
	)
);