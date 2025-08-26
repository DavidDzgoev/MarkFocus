import create from 'zustand';

type SidebarStatusStore = {
	isOpen: boolean;
	toggleSidebar: () => void;
	openSidebar: () => void;
	closeSidebar: () => void;
};

export const useSidebarStatusStore = create<SidebarStatusStore>((set) => ({
	isOpen: true,
	toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
	openSidebar: () => set({ isOpen: true }),
	closeSidebar: () => set({ isOpen: false }),
}));
