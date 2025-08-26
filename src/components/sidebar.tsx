import Image from 'next/image';

import { useGearStatusStore } from '../global-stores/useGearStatusStore';
import { useMonacoEditorOptionsStore } from '../global-stores/useMonacoEditorOptionsStore';

export default function SideBar() {
	const { setGearStatus } = useGearStatusStore();
	const { focusMode, setMonacoEditorOptions } = useMonacoEditorOptionsStore();
	
	const handleGearClick = () => setGearStatus();
	const handleFocusModeToggle = () => setMonacoEditorOptions({ focusMode: !focusMode });

	return (
		<div className="relative h-screen px-4 bg-notion-yellow flex flex-col">
			<div className="flex justify-between items-center pt-10">
				<span className="inline-block">
					<Image width="50px" height="50px" src="/md-icon.png" alt="icon" />
				</span>
				<span
					data-testid="gear-icon"
					className="inline-block rounded-lg text-slate-600 transition duration-500 ease-in-out hover:rotate-180 hover:text-slate-800 hover:cursor-pointer"
					onClick={handleGearClick}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-7 w-7"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</span>
			</div>
			
			<div className="flex flex-col my-9">
				<h1 className="mb-4 text-slate-500 font-medium">Welcome</h1>
				<span className="text-sm text-slate-700 hover:cursor-pointer hover:text-slate-900">
					Introduction
				</span>
			</div>
			
			<div className="flex flex-col my-10">
				<h1 className="mb-4 text-slate-500 font-medium">Reference</h1>
				<div className="flex flex-col space-y-5">
					<span className="text-sm text-slate-700 hover:cursor-pointer hover:text-slate-900">
						Charge Collection
					</span>
					<span className="text-sm text-slate-700 hover:cursor-pointer hover:text-slate-900">
						Charges
					</span>
					<span className="text-sm text-slate-700 hover:cursor-pointer hover:text-slate-900">
						Rates
					</span>
					<span className="text-sm text-slate-700 hover:cursor-pointer hover:text-slate-900">
						Currencies
					</span>
				</div>
			</div>
			
			{/* Focus Mode Toggle - внизу sidebar */}
			<div className="mt-auto mb-6">
				<div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-slate-200">
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`h-5 w-5 ${focusMode ? 'text-blue-600' : 'text-slate-400'}`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							/>
						</svg>
						<span className="text-sm font-medium text-slate-700">Focus Mode</span>
					</div>
					<button
						onClick={handleFocusModeToggle}
						className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
							focusMode ? 'bg-blue-600' : 'bg-gray-200'
						}`}
					>
						<span
							className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
								focusMode ? 'translate-x-6' : 'translate-x-1'
							}`}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}
