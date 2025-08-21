import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useMarkdownContentStore = create(
	combine(
		{
			markdownContent: '',
		},
		(set, get) => ({
			setMarkdownContent: (newMarkdownContent: string) => {
				set({ markdownContent: newMarkdownContent });
			},
		})
	)
);
