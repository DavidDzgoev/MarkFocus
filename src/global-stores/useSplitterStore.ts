import create from 'zustand';

type SplitterStore = {
	editorWidth: number;
	minEditorWidth: number;
	maxEditorWidth: number;
	setEditorWidth: (width: number) => void;
	resetEditorWidth: () => void;
};

export const useSplitterStore = create<SplitterStore>((set) => ({
	editorWidth: 50, // процент от общей ширины
	minEditorWidth: 5, // минимальная ширина в процентах
	maxEditorWidth: 100, // максимальная ширина в процентах (увеличено с 80 до 100)
	setEditorWidth: (width: number) => set({ editorWidth: width }),
	resetEditorWidth: () => set({ editorWidth: 50 }),
}));
