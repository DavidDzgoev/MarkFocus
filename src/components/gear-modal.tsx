import React from 'react';
import { useForm } from 'react-hook-form';

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
	const { register, handleSubmit } = useForm<FormData>();
	const { setGearStatus } = useGearStatusStore();
	const { setMonacoEditorOptions, ...editorConfig } =
		useMonacoEditorOptionsStore();

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
			<div className={className}>
				<header className="text-2xl font-bold text-slate-600 text-center">
					Editor Settings
				</header>
				<form
					className="mt-3 divide-y divide-slate-100"
					onSubmit={handleSubmit(handleFormSubmit)}
				>
					{/* Theme */}
					<div className="flex items-center justify-between py-4">
						<h1 className="text-base font-medium text-slate-700">Theme</h1>
						<section className="relative flex flex-start items-center">
							<span className="absolute inset-y-0 right-2 inline-flex items-center text-slate-500 z-0">
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
							<select
								id="theme"
								data-testid="theme"
								className="pl-2.5 pr-8 py-1.5 bg-transparent text-sm text-slate-600 border border-slate-300 rounded-lg shadow-sm outline-none appearance-none z-10"
								defaultValue={editorConfig.theme}
								{...register('theme')}
							>
								<option value="vs-light">VS Light</option>
								<option value="vs-dark">VS Dark</option>
							</select>
						</section>
					</div>

					{/* Cursor Blinking */}
					<div className="flex items-center justify-between py-4">
						<h1 className="text-base font-medium text-slate-700">
							Cursor Blinking
						</h1>
						<section className="relative flex flex-start items-center">
							<span className="absolute inset-y-0 right-2 inline-flex items-center text-slate-500 z-0">
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
							<select
								id="cursorBlinking"
								data-testid="cursorBlinking"
								className="pl-2.5 pr-8 py-1.5 bg-transparent text-sm text-slate-600 border border-slate-300 rounded-lg shadow-sm outline-none appearance-none z-10"
								defaultValue={editorConfig.cursorBlinking}
								{...register('cursorBlinking')}
							>
								<option value="blink">Blink</option>
								<option value="smooth">Smooth</option>
								<option value="Phase">Phase</option>
								<option value="Expand">Expand</option>
								<option value="Solid">Solid</option>
							</select>
						</section>
					</div>

					{/* Cursor Style */}
					<div className="flex items-center justify-between py-4">
						<h1 className="text-base font-medium text-slate-700">
							Cursor Style
						</h1>
						<section className="relative flex flex-start items-center">
							<span className="absolute inset-y-0 right-2 inline-flex items-center text-slate-500 z-0">
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
							<select
								id="cursorStyle"
								data-testid="cursorStyle"
								className="pl-2.5 pr-8 py-1.5 bg-transparent text-sm text-slate-600 border border-slate-300 rounded-lg shadow-sm outline-none appearance-none z-10"
								defaultValue={editorConfig.cursorStyle}
								{...register('cursorStyle')}
							>
								<option value="line">Line</option>
								<option value="line-thin">Line-thin</option>
								<option value="block">Block</option>
								<option value="block-outline">Block-outline</option>
								<option value="underline">Underline</option>
								<option value="underline-thin">Underline-thin</option>
							</select>
						</section>
					</div>

					{/* Show mini map */}
					<div className="flex items-center justify-between py-4">
						<label
							className="text-base font-medium text-slate-700"
							htmlFor="minimap"
						>
							Show mini map
						</label>
						<input
							className="w-5 h-5 border-gray-200 accent-slate-600"
							id="minimap"
							type="checkbox"
							value="minimap"
							defaultChecked={editorConfig.minimap ?? false}
							{...register('minimap')}
						/>
					</div>

					{/* Show Line Number */}
					<div className="flex items-center justify-between py-4">
						<h1 className="text-base font-medium text-slate-700">
							Show Line Number
						</h1>
						<section className="relative flex flex-start items-center">
							<span className="absolute inset-y-0 right-2 inline-flex items-center text-slate-500 z-0">
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
							<select
								id="lineNumbers"
								data-testid="lineNumbers"
								className="pl-2.5 pr-8 py-1.5 bg-transparent text-sm text-slate-600 border border-slate-300 rounded-lg shadow-sm outline-none appearance-none z-10"
								defaultValue={editorConfig.lineNumbers ?? 'off'}
								{...register('lineNumbers')}
							>
								<option value="on">On</option>
								<option value="off">Off</option>
								<option value="relative">Relative</option>
							</select>
						</section>
					</div>

					<div className="pt-6 space-x-5 text-right">
						<button
							className="px-8 py-2.5 text-sm font-medium border border-slate-50 bg-slate-50 text-slate-500 rounded-lg shadow-sm transition duration-300 ease-in-out hover:cursor-pointer hover:text-white hover:bg-rose-400 focus:ring focus:ring-rose-300 focus:outline-none"
							onClick={handleCancel}
						>
							Cancel
						</button>
						<button className="px-8 py-2.5 text-sm font-medium bg-slate-50 text-slate-500 rounded-lg shadow-sm transition duration-300 ease-in-out hover:cursor-pointer hover:text-white hover:bg-slate-500 focus:ring focus:ring-slate-400 focus:outline-none">
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
