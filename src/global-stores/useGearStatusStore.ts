import create from 'zustand';
import { combine } from 'zustand/middleware';

export type GearStatus = {
	gearStatus: boolean;
};

export const useGearStatusStore = create(
	combine(
		{
			gearStatus: false,
		} as GearStatus,
		(set, get) => ({
			setGearStatus: () => {
				set({ gearStatus: !get().gearStatus });
			},
		})
	)
);
