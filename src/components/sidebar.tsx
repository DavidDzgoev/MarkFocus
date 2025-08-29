import Image from 'next/image';

import { useGearStatusStore } from '../global-stores/useGearStatusStore';
import { useMonacoEditorOptionsStore } from '../global-stores/useMonacoEditorOptionsStore';
import { useSidebarStatusStore } from '../global-stores/useSidebarStatusStore';
import { useMarkdownContentStore } from '../global-stores/useMarkdownContentStore';

export default function SideBar() {
	const { setGearStatus } = useGearStatusStore();
	const { focusMode, typewriterMode, setMonacoEditorOptions, theme } = useMonacoEditorOptionsStore();
	const { isOpen, closeSidebar } = useSidebarStatusStore();
	const { clearMarkdownContent } = useMarkdownContentStore();
	
	// Определяем классы для темной/светлой темы
	const isDark = theme === 'vs-dark';
	const themeClasses = {
		background: isDark ? 'bg-[#2D2D2D]' : 'bg-notion-yellow',
		text: isDark ? 'text-[#d4d4d4]' : 'text-slate-700',
		button: isDark ? 'bg-[rgb(45,45,45)] border-gray-600 text-gray-300 hover:text-gray-100' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-800',
		closeButton: isDark ? 'text-gray-300 hover:text-gray-100' : 'text-slate-600 hover:text-slate-800',
		focusModeText: isDark ? 'text-gray-300' : 'text-slate-700',
		clearButton: isDark ? 'bg-red-900 hover:bg-red-800 border-red-700 text-red-300 hover:text-red-200' : 'bg-red-50 hover:bg-red-100 border-red-200 text-red-600 hover:text-red-700',
	};
	
	const handleGearClick = () => setGearStatus();
	const handleFocusModeToggle = () => setMonacoEditorOptions({ focusMode: !focusMode });
	const handleTypewriterModeToggle = () => {
		console.log('Typewriter mode toggle clicked, current state:', typewriterMode); // Добавляем отладку
		setMonacoEditorOptions({ typewriterMode: !typewriterMode });
		console.log('Typewriter mode toggle: new state will be:', !typewriterMode); // Добавляем отладку
	};
	const handleClearContent = () => {
		if (confirm('Вы уверены, что хотите очистить весь контент? Это действие нельзя отменить.')) {
			clearMarkdownContent();
		}
	};

	if (!isOpen) return null;

	return (
		<div className={`relative h-screen px-4 flex flex-col ${themeClasses.background}`}>
			<div className="flex justify-between items-center pt-10">
				<span className="inline-block">
					<Image width="50px" height="50px" src="/md-icon.png" alt="icon" />
				</span>
				<button
					onClick={closeSidebar}
					className={`inline-block rounded-lg transition duration-300 ease-in-out hover:cursor-pointer ${themeClasses.closeButton}`}
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
				<div className={`flex items-center justify-between p-3 rounded-lg shadow-sm border transition duration-300 ease-in-out ${themeClasses.button}`}>
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`h-5 w-5 ${focusMode ? 'text-blue-600' : (isDark ? 'text-gray-500' : 'text-slate-400')}`}
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
						<span className={`text-sm font-medium ${themeClasses.focusModeText}`}>Focus</span>
					</div>
					<button
						onClick={handleFocusModeToggle}
						className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
							focusMode ? 'bg-blue-600' : (isDark ? 'bg-gray-600' : 'bg-gray-200')
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

			{/* Typewriter Mode Toggle */}
			<div className="mb-4">
				<div className={`flex items-center justify-between p-3 rounded-lg shadow-sm border transition duration-300 ease-in-out ${themeClasses.button}`}>
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`h-5 w-5 ${typewriterMode ? 'text-blue-600' : (isDark ? 'text-gray-500' : 'text-slate-400')}`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
							/>
						</svg>
						<span className={`text-sm font-medium ${themeClasses.focusModeText}`}>Typewriter</span>
					</div>
					<button
						onClick={handleTypewriterModeToggle}
						className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
							typewriterMode ? 'bg-blue-600' : (isDark ? 'bg-gray-600' : 'bg-gray-200')
						}`}
					>
						<span
							className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
								typewriterMode ? 'translate-x-6' : 'translate-x-1'
							}`}
						/>
					</button>
				</div>
			</div>

			{/* Clear Content Button */}
			<div className="mb-4">
				<button
					onClick={handleClearContent}
					className={`w-full flex items-center justify-center p-3 rounded-lg shadow-sm border transition duration-300 ease-in-out hover:shadow-md ${themeClasses.clearButton}`}
					title="Clear all content"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 mr-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
						/>
					</svg>
					<span className="text-sm font-medium">Clear Content</span>
				</button>
			</div>

			{/* Settings Button - под Focus Mode */}
			<div className="mb-6">
				<button
					onClick={handleGearClick}
					className={`w-full flex items-center justify-center p-3 rounded-lg shadow-sm border transition duration-300 ease-in-out hover:shadow-md ${themeClasses.button}`}
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
