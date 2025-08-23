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
		} as MonacoEditorOptionsStore,
		(set, get) => ({
			setMonacoEditorOptions: (
				newOptions: Partial<MonacoEditorOptionsStore>
			) => {
				set({ ...get(), ...newOptions });
			},
		})
	)
);
