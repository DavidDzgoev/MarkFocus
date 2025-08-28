import create from 'zustand';
import { combine } from 'zustand/middleware';

// Функция для получения сохраненного контента из localStorage
const getSavedContent = (): string => {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('markdown-content') || '';
	}
	return '';
};

// Функция для сохранения контента в localStorage
const saveContent = (content: string): void => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('markdown-content', content);
	}
};

export const useMarkdownContentStore = create(
	combine(
		{
			markdownContent: getSavedContent(),
		},
		(set, get) => ({
			setMarkdownContent: (newMarkdownContent: string) => {
				set({ markdownContent: newMarkdownContent });
				// Сохраняем в localStorage при каждом изменении
				saveContent(newMarkdownContent);
			},
			// Функция для очистки сохраненного контента
			clearMarkdownContent: () => {
				set({ markdownContent: '' });
				if (typeof window !== 'undefined') {
					localStorage.removeItem('markdown-content');
				}
			},
			// Функция для загрузки контента из localStorage
			loadMarkdownContent: () => {
				const savedContent = getSavedContent();
				set({ markdownContent: savedContent });
			},
		})
	)
);
