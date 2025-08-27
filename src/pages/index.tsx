/* eslint-disable react/no-children-prop */
import type { NextPage } from 'next';
import * as React from 'react';
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

const Home: NextPage = () => {
	const { gearStatus } = useGearStatusStore();
	const { setMonacoEditorOptions, ...monacoEditorOptions } =
		useMonacoEditorOptionsStore();
	const { isOpen, openSidebar } = useSidebarStatusStore();

	const editorTheme = () => {
		const darkThemes = ['vs-dark'];
		if (darkThemes.includes(monacoEditorOptions.theme)) {
			return true;
		}
	};

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
				<div className="grid grid-cols-2 grid-flow-row w-full">
					{/* Monaco Editor / Textarea */}
					<div
						className={`col-span-1 h-full ${
							monacoEditorOptions.editorType === 'text' ? 'px-14' : 'px-8'
						} py-14 overflow-hidden z-0 ${
							editorTheme() ? 'bg-vs-dark' : 'bg-white'
						} relative`}
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

					{/* Markdown Preview */}
					<div className="col-span-1 h-full prose">
						<MarkdownParser />
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
