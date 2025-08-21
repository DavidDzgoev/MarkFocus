/* eslint-disable react/no-children-prop */
import type { NextPage } from 'next';
import * as React from 'react';
import Head from 'next/head';
import { Resizable, ResizeCallback } from 're-resizable';

import GearModal from '../components/gear-modal';
import SiderBar from '../components/sidebar';
import MonacoEditor from '../components/monaco-editor';
import Textarea from '../components/textarea';
import MarkdownParser from '../components/markdown-parser';

import { useEditorTypeStore } from '../global-stores/useEditorTypeStore';
import { useMonacoEditorOptionsStore } from '../global-stores/useMonacoEditorOptionsStore';
import { useGearStatusStore } from '../global-stores/useGearStatusStore';
import { useSidebarWidthStore } from '../global-stores/useSidebarWidthStore';

const Home: NextPage = () => {
	const { gearStatus } = useGearStatusStore();
	const { setMonacoEditorOptions, ...monacoEditorOptions } =
		useMonacoEditorOptionsStore();
	const { width, defaultWidth, minWidth, maxWidth, setWidth } =
		useSidebarWidthStore();

	const handleResize: ResizeCallback = (e, direction, ref, d) =>
		setWidth(width + d.width);

	const editorTheme = () => {
		const darkThemes = ['vs-dark'];
		if (darkThemes.includes(monacoEditorOptions.theme)) {
			return true;
		}
	};

	return (
		<div>
			<Head>
				<title>Online Markdown Tool</title>
				<meta name="description" content="Online markdown tool" />
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
				<Resizable
					minWidth={minWidth}
					maxWidth={maxWidth}
					defaultSize={{ height: '99%', width: defaultWidth }}
					size={{ width, height: '99%' }}
					onResizeStop={handleResize}
					style={{
						transition: 'all 0.3s ease-out',
					}}
					className="hidden lg:block z-10"
				>
					<SiderBar />
				</Resizable>

				{/* Right side */}
				<div className="grid grid-cols-2 grid-flow-row w-full">
					{/* Monaco Editor / Textarea */}
					<div
						className={`col-span-1 h-full sm:border-b sm:border-slate-200 sm:border-r-0 ${
							monacoEditorOptions.editorType === 'text' ? 'px-14' : 'px-8'
						} py-14 overflow-hidden md:border-r border-slate-100 z-0 ${
							editorTheme() ? 'bg-vs-dark' : 'bg-white'
						}`}
					>
						{monacoEditorOptions.editorType === 'text' ? (
							<Textarea />
						) : (
							<MonacoEditor />
						)}
					</div>

					{/* Markdown Preview */}
					<div className="col-span-1 h-full p-14 prose">
						<MarkdownParser />
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
