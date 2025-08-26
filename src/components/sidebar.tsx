import Image from 'next/image';

import { useGearStatusStore } from '../global-stores/useGearStatusStore';
import { useMonacoEditorOptionsStore } from '../global-stores/useMonacoEditorOptionsStore';
import { useSidebarStatusStore } from '../global-stores/useSidebarStatusStore';

export default function SideBar() {
	const { setGearStatus } = useGearStatusStore();
	const { focusMode, setMonacoEditorOptions } = useMonacoEditorOptionsStore();
	const { isOpen, closeSidebar } = useSidebarStatusStore();
	
	const handleGearClick = () => setGearStatus();
	const handleFocusModeToggle = () => setMonacoEditorOptions({ focusMode: !focusMode });

	if (!isOpen) return null;

	return (
		<div className="relative h-screen px-4 flex flex-col">
			<div className="flex justify-between items-center pt-10">
				<span className="inline-block">
					<Image width="50px" height="50px" src="/md-icon.png" alt="icon" />
				</span>
				<button
					onClick={closeSidebar}
					className="inline-block rounded-lg text-slate-600 transition duration-300 ease-in-out hover:text-slate-800 hover:cursor-pointer"
					title="Close sidebar"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			
			{/* Focus Mode Toggle - внизу sidebar */}
			<div className="mt-auto mb-4">
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

			{/* Settings Button - под Focus Mode */}
			<div className="mb-6">
				<button
					onClick={handleGearClick}
					className="w-full flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-600 transition duration-300 ease-in-out hover:text-slate-800 hover:shadow-md"
					title="Settings"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
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
					<span className="ml-2 text-sm font-medium">Settings</span>
				</button>
			</div>
		</div>
	);
}
