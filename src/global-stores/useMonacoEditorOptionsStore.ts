import create from 'zustand';
import { combine } from 'zustand/middleware';

type MonacoEditorOptionsStore = {
	editorType: 'monaco' | 'text';
	theme: string;
	language: 'markdown' | 'javascript' | 'typescript';
	// 编辑器右侧预览小图
	minimap: boolean;
	// 右侧竖向滚动条
	verticalScrollbar: 'auto' | 'visible' | 'hidden';
	verticalScrollbarSize: number;
	// 底部横向滚动条
	horizontalScrollbar: 'auto' | 'visible' | 'hidden';
	horizontalScrollbarSize: number;
	// 是否显示行号
	lineNumbers: 'on' | 'off' | 'relative';
	// 左侧行号和第一个字符的间距是否开启；开启则有间隔，否则无(行号紧贴着第一个字符)
	folding: boolean;
	fontSize: number;
	// 左侧宽度
	lineDecorationsWidth: number;
	// 选中行的outline
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
			cursorStyle: 'block-outline',
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
