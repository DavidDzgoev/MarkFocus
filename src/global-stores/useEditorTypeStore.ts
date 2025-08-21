import create from 'zustand';
import { combine } from 'zustand/middleware';

type Editor = {
	editorType: 'textarea' | 'monaco';
};

export const useEditorTypeStore = create(
	combine(
		{
			editorType: 'monaco',
		} as Editor,
		(set, get) => ({
			setEditorType: (newEditorType: 'textarea' | 'monaco') => {
				set({ editorType: newEditorType });
			},
		})
	)
);
