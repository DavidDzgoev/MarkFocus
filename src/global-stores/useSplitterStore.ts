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
	minEditorWidth: 5, // минимальная ширина в процентах (уменьшено с 20 до 5)
	maxEditorWidth: 80, // максимальная ширина в процентах
	setEditorWidth: (width: number) => set({ editorWidth: width }),
	resetEditorWidth: () => set({ editorWidth: 50 }),
}));
