import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useGearStatusStore } from '../global-stores/useGearStatusStore';
import { useMonacoEditorOptionsStore } from '../global-stores/useMonacoEditorOptionsStore';

type FormData = {
	editorType: 'monaco' | 'text';
	theme: string;
	minimap: boolean;
	lineNumbers: 'on' | 'off' | 'relative';
	cursorBlinking: 'smooth' | 'blink' | 'phase' | 'expand' | 'solid';
	cursorStyle:
		| 'line'
		| 'block-outline'
		| 'block'
		| 'underline'
		| 'line-thin'
		| 'underline-thin';
};

export default function GearModal({ className }: { className?: string }) {
	const { register, handleSubmit, control, setValue } = useForm<FormData>();
	const { setGearStatus } = useGearStatusStore();
	const { setMonacoEditorOptions, ...editorConfig } =
		useMonacoEditorOptionsStore();

	// Устанавливаем значения формы при монтировании
	React.useEffect(() => {
		setValue('theme', editorConfig.theme);
		setValue('cursorBlinking', editorConfig.cursorBlinking);
		setValue('cursorStyle', editorConfig.cursorStyle);
		setValue('lineNumbers', editorConfig.lineNumbers);
		setValue('minimap', editorConfig.minimap);
	}, [editorConfig, setValue]);

	// Определяем классы для темной/светлой темы
	const isDark = editorConfig.theme === 'vs-dark';
	const themeClasses = {
		background: isDark ? 'bg-[rgb(30,30,30)]' : 'bg-white',
		text: isDark ? 'text-[#d4d4d4]' : 'text-slate-600',
		textSecondary: isDark ? 'text-[#d4d4d4]' : 'text-slate-700',
		border: isDark ? 'border-gray-600' : 'border-slate-200',
		divider: isDark ? 'divide-gray-600' : 'divide-slate-100',
		select: isDark ? 'bg-[rgb(45,45,45)] border-gray-600 text-[#d4d4d4]' : 'bg-transparent border-slate-300 text-slate-600',
		icon: isDark ? 'text-gray-400' : 'text-slate-500',
		button: isDark ? 'bg-[rgb(45,45,45)] border-gray-600 text-[#d4d4d4] hover:bg-[rgb(55,55,55)]' : 'bg-slate-50 border-slate-50 text-slate-500 hover:bg-slate-100',
		buttonCancel: isDark ? 'hover:bg-red-800 hover:text-red-200' : 'hover:bg-rose-400 hover:text-white',
		buttonSubmit: isDark ? 'hover:bg-gray-600 hover:text-gray-200' : 'hover:bg-slate-500 hover:text-white',
		checkbox: isDark ? 'border-gray-600 accent-gray-400' : 'border-gray-200 accent-slate-600',
	};

	const handleFormSubmit = (data: FormData) => {
		if (data.minimap) {
			data.minimap = true;
		}
		setMonacoEditorOptions(data);
		setGearStatus();
	};

	const handleCancel = () => setGearStatus();

	return (
		<>
			<div className={`${className} ${themeClasses.background} ${themeClasses.border}`}>
				<header className={`text-2xl font-bold text-center ${themeClasses.text}`}>
					Editor Settings
				</header>
				<form
					className={`mt-3 divide-y ${themeClasses.divider}`}
					onSubmit={handleSubmit(handleFormSubmit)}
				>
					{/* Theme */}
					<div className="flex items-center justify-between py-4">
						<h1 className={`text-base font-medium ${themeClasses.textSecondary}`}>Theme</h1>
						<section className="relative flex flex-start items-center">
							<span className={`absolute inset-y-0 right-2 inline-flex items-center z-0 ${themeClasses.icon}`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</span>
							<Controller
								name="theme"
								control={control}
								defaultValue={editorConfig.theme}
								render={({ field }) => (
									<select
										{...field}
										className={`pl-2.5 pr-8 py-1.5 text-sm rounded-lg shadow-sm outline-none appearance-none z-10 ${themeClasses.select}`}
									>
										<option value="vs-light">VS Light</option>
										<option value="vs-dark">VS Dark</option>
									</select>
								)}
							/>
						</section>
					</div>

					{/* Cursor Blinking */}
					<div className="flex items-center justify-between py-4">
						<h1 className={`text-base font-medium ${themeClasses.textSecondary}`}>
							Cursor Blinking
						</h1>
						<section className="relative flex flex-start items-center">
							<span className={`absolute inset-y-0 right-2 inline-flex items-center z-0 ${themeClasses.icon}`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</span>
							<Controller
								name="cursorBlinking"
								control={control}
								defaultValue={editorConfig.cursorBlinking}
								render={({ field }) => (
									<select
										{...field}
										className={`pl-2.5 pr-8 py-1.5 text-sm rounded-lg shadow-sm outline-none appearance-none z-10 ${themeClasses.select}`}
									>
										<option value="blink">Blink</option>
										<option value="smooth">Smooth</option>
										<option value="Phase">Phase</option>
										<option value="Expand">Expand</option>
										<option value="Solid">Solid</option>
									</select>
								)}
							/>
						</section>
					</div>

					{/* Cursor Style */}
					<div className="flex items-center justify-between py-4">
						<h1 className={`text-base font-medium ${themeClasses.textSecondary}`}>
							Cursor Style
						</h1>
						<section className="relative flex flex-start items-center">
							<span className={`absolute inset-y-0 right-2 inline-flex items-center z-0 ${themeClasses.icon}`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</span>
							<Controller
								name="cursorStyle"
								control={control}
								defaultValue={editorConfig.cursorStyle}
								render={({ field }) => (
									<select
										{...field}
										className={`pl-2.5 pr-8 py-1.5 text-sm rounded-lg shadow-sm outline-none appearance-none z-10 ${themeClasses.select}`}
									>
										<option value="line">Line</option>
										<option value="line-thin">Line-thin</option>
										<option value="block">Block</option>
										<option value="block-outline">Block-outline</option>
										<option value="underline">Underline</option>
										<option value="underline-thin">Underline-thin</option>
									</select>
								)}
							/>
						</section>
					</div>

					{/* Show Line Number */}
					<div className="flex items-center justify-between py-4">
						<h1 className={`text-base font-medium ${themeClasses.textSecondary}`}>
							Show Line Number
						</h1>
						<section className="relative flex flex-start items-center">
							<span className={`absolute inset-y-0 right-2 inline-flex items-center z-0 ${themeClasses.icon}`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</span>
							<Controller
								name="lineNumbers"
								control={control}
								defaultValue={editorConfig.lineNumbers ?? 'off'}
								render={({ field }) => (
									<select
										{...field}
										className={`pl-2.5 pr-8 py-1.5 text-sm rounded-lg shadow-sm outline-none appearance-none z-10 ${themeClasses.select}`}
									>
										<option value="on">On</option>
										<option value="off">Off</option>
										<option value="relative">Relative</option>
									</select>
								)}
							/>
						</section>
					</div>

					{/* Show mini map */}
					<div className="flex items-center justify-between py-4">
						<label
							className={`text-base font-medium ${themeClasses.textSecondary}`}
							htmlFor="minimap"
						>
							Show mini map
						</label>
						<Controller
							name="minimap"
							control={control}
							defaultValue={editorConfig.minimap ?? false}
							render={({ field }) => (
								<input
									{...field}
									value="minimap"
									className={`w-5 h-5 ${themeClasses.checkbox}`}
									type="checkbox"
									checked={field.value}
								/>
							)}
						/>
					</div>

					<div className="pt-6 space-x-5 text-right">
						<button
							className={`px-8 py-2.5 text-sm font-medium border rounded-lg shadow-sm transition duration-300 ease-in-out hover:cursor-pointer focus:ring focus:outline-none ${themeClasses.button} ${themeClasses.buttonCancel}`}
							onClick={handleCancel}
						>
							Cancel
						</button>
						<button className={`px-8 py-2.5 text-sm font-medium border rounded-lg shadow-sm transition duration-300 ease-in-out hover:cursor-pointer focus:ring focus:outline-none ${themeClasses.button} ${themeClasses.buttonSubmit}`}>
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	);
}