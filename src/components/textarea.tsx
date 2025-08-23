import { useMarkdownContentStore } from '../global-stores/useMarkdownContentStore';
import { useMonacoEditorOptionsStore } from '../global-stores/useMonacoEditorOptionsStore';
import { getCurrentParagraph } from '../lib/focus-utils';
import { useState, useRef, useEffect } from 'react';

export default function Textarea() {
	const { markdownContent, setMarkdownContent } = useMarkdownContentStore();
	const { setMonacoEditorOptions, focusMode, ...monacoEditorOptions } =
		useMonacoEditorOptionsStore();
	
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [currentParagraph, setCurrentParagraph] = useState<{
		startIndex: number;
		endIndex: number;
		paragraphText: string;
	} | null>(null);

	function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		setMarkdownContent(event.target.value);
	}

	function handleCursorPosition() {
		if (!focusMode || !textareaRef.current) return;
		
		const cursorPosition = textareaRef.current.selectionStart;
		const paragraph = getCurrentParagraph(markdownContent, cursorPosition);
		setCurrentParagraph(paragraph);
	}

	// Применяем стили для фокуса
	const getFocusedText = () => {
		if (!focusMode || !currentParagraph) {
			return markdownContent;
		}

		const beforeParagraph = markdownContent.slice(0, currentParagraph.startIndex);
		const afterParagraph = markdownContent.slice(currentParagraph.endIndex);
		
		return (
			<>
				<span className="opacity-40">{beforeParagraph}</span>
				<span className="opacity-100 font-medium">{currentParagraph.paragraphText}</span>
				<span className="opacity-40">{afterParagraph}</span>
			</>
		);
	};

	// Обновляем позицию курсора при изменении режима фокуса
	useEffect(() => {
		if (focusMode) {
			handleCursorPosition();
		}
	}, [focusMode, markdownContent]);

	return (
		<div className="relative w-full h-full">
			{/* Невидимый textarea для ввода */}
			<textarea
				ref={textareaRef}
				className={`absolute inset-0 w-full h-full focus:outline-none ${
					focusMode ? 'opacity-0' : 'opacity-100'
				} ${
					monacoEditorOptions.theme === 'vs-dark'
						? 'bg-vs-dark text-white'
						: 'bg-white'
				}`}
				value={markdownContent}
				onChange={handleTextChange}
				onSelect={handleCursorPosition}
				onClick={handleCursorPosition}
				onKeyUp={handleCursorPosition}
			/>
			
			{/* Видимый div с подсветкой */}
			{focusMode && (
				<div 
					className={`absolute inset-0 w-full h-full pointer-events-none overflow-auto ${
						monacoEditorOptions.theme === 'vs-dark'
							? 'bg-vs-dark text-white'
							: 'bg-white'
					}`}
					style={{
						fontFamily: 'monospace',
						fontSize: `${monacoEditorOptions.fontSize}px`,
						lineHeight: '1.5',
						whiteSpace: 'pre-wrap',
						wordWrap: 'break-word',
						padding: 'inherit'
					}}
				>
					{getFocusedText()}
				</div>
			)}
		</div>
	);
}
