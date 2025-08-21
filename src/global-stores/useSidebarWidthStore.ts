import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useSidebarWidthStore = create(
	combine(
		{
			width: 210,
			defaultWidth: 210,
			minWidth: 200,
			maxWidth: 350,
		},
		(set, get) => ({
			setWidth: (width: number) => {
				set({ width });
			},
		})
	)
);
