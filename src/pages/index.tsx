/* eslint-disable react/no-children-prop */
import type { NextPage } from 'next';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Head from 'next/head';

import GearModal from '../components/gear-modal';
import SiderBar from '../components/sidebar';
import MonacoEditor from '../components/monaco-editor';
import Textarea from '../components/textarea';
import MarkdownParser from '../components/markdown-parser';

import { useEditorTypeStore } from '../global-stores/useEditorTypeStore';
import { useMonacoEditorOptionsStore } from '../global-stores/useMonacoEditorOptionsStore';
import { useGearStatusStore } from '../global-stores/useGearStatusStore';
import { useSidebarStatusStore } from '../global-stores/useSidebarStatusStore';
import { useSplitterStore } from '../global-stores/useSplitterStore';

const Home: NextPage = () => {
	const { gearStatus } = useGearStatusStore();
	const { setMonacoEditorOptions, ...monacoEditorOptions } =
		useMonacoEditorOptionsStore();
	const { isOpen, openSidebar } = useSidebarStatusStore();
	const { editorWidth, minEditorWidth, maxEditorWidth, setEditorWidth } = useSplitterStore();
	
	// Add state to track if component is mounted
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const editorTheme = () => {
		const darkThemes = ['vs-dark'];
		if (darkThemes.includes(monacoEditorOptions.theme)) {
			return true;
		}
	};

	const isDark = editorTheme();

	// Обработчик перетаскивания разделителя
	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		
		// Only run on client side
		if (!isMounted) return;
		
		const startX = e.clientX;
		const startWidth = editorWidth;
		const containerWidth = window.innerWidth - (isOpen ? 256 : 0); // 256px = ширина sidebar
		
		const handleMouseMove = (e: MouseEvent) => {
			const deltaX = e.clientX - startX;
			const deltaPercent = (deltaX / containerWidth) * 100;
			const newWidth = Math.max(minEditorWidth, Math.min(maxEditorWidth, startWidth + deltaPercent));
			
			console.log('Mouse move:', { deltaX, deltaPercent, newWidth, startWidth });
			
			// Если разделитель уведен в край (менее 10%), скрываем редактор
			if (newWidth < 10) {
				console.log('Hiding editor');
				setEditorWidth(0);
			} 
			// Если разделитель уведен в другой край (более 90%), скрываем preview
			else if (newWidth > 90) {
				console.log('Hiding preview');
				setEditorWidth(100);
			} 
			else {
				console.log('Setting editor width:', newWidth);
				setEditorWidth(newWidth);
			}
		};
		
		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
		
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	// Обработчик двойного клика для сброса размера
	const handleDoubleClick = () => {
		setEditorWidth(50);
	};

	// Don't render until mounted to prevent hydration mismatch
	if (!isMounted) {
		return (
			<div>
				<Head>
					<title>MarkFocus</title>
					<meta name="description" content="MarkFocus" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<main className="relative h-screen flex min-w-[768px]">
					{/* Show a loading state or skeleton */}
					<div className="w-full h-full flex items-center justify-center">
						<div className="text-gray-500">Loading...</div>
					</div>
				</main>
			</div>
		);
	}

	return (
		<div>
			<Head>
				<title>MarkFocus</title>
				<meta name="description" content="MarkFocus" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="relative h-screen flex min-w-[768px]">
				{/* Overlay */}
				{gearStatus ? (
					<div className="absolute inset-0 w-full h-full z-10 bg-black opacity-40"></div>
				) : null}

				{/* Gear Modal */}
				{gearStatus ? (
					<GearModal className="absolute top-[180px] left-1/2 transform -translate-x-1/2 z-20 px-10 py-8 min-w-fit min-h-fit border border-slate-200 bg-white rounded-xl shadow-md" />
				) : null}

				{/* Left Sidebar */}
				{isOpen && (
					<div className="w-64 h-screen bg-notion-yellow z-10">
						<SiderBar />
					</div>
				)}

				{/* Right side */}
				<div className="flex w-full">
					{/* Monaco Editor / Textarea */}
					{editorWidth > 0 && (
						<div
							className={`h-full ${
								monacoEditorOptions.editorType === 'text' ? 'px-14' : 'px-8'
							} py-14 overflow-hidden z-0 ${
								isDark ? 'bg-[rgb(30,30,30)]' : 'bg-white'
							} relative`}
							style={{ width: `${editorWidth}%` }}
						>
							{/* Sidebar Toggle Button - показывается только когда sidebar закрыт */}
							{!isOpen && (
								<button
									onClick={openSidebar}
									className="absolute top-4 left-4 z-20 p-2 bg-white rounded-lg shadow-md border border-slate-200 text-slate-600 transition duration-300 ease-in-out hover:text-slate-800 hover:shadow-lg"
									title="Open sidebar"
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
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								</button>
							)}
							
							{monacoEditorOptions.editorType === 'text' ? (
								<Textarea />
							) : (
								<MonacoEditor />
							)}
						</div>
					)}

					{/* Splitter */}
					<div
						className={`h-full w-1 bg-gray-300 hover:bg-gray-400 cursor-col-resize transition-colors duration-200 ${
							editorWidth === 0 || editorWidth === 100 ? 'hidden' : ''
						}`}
						onMouseDown={handleMouseDown}
						onDoubleClick={handleDoubleClick}
						title="Drag to resize, double-click to reset"
					/>

					{/* Markdown Preview */}
					{editorWidth < 100 && (
						<div 
							className="h-full prose"
							style={{ width: editorWidth === 0 ? '100%' : `${100 - editorWidth}%` }}
						>
							<MarkdownParser />
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default Home;
