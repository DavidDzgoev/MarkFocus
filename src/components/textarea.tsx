import { useMarkdownContentStore } from '../global-stores/useMarkdownContentStore';

import { useMonacoEditorOptionsStore } from '../global-stores/useMonacoEditorOptionsStore';

export default function Textarea() {
	const { markdownContent, setMarkdownContent } = useMarkdownContentStore();
	const { setMonacoEditorOptions, ...monacoEditorOptions } =
		useMonacoEditorOptionsStore();

	function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		setMarkdownContent(event.target.value);
	}

	return (
		<textarea
			className={`w-full h-full focus:outline-none ${
				monacoEditorOptions.theme === 'vs-dark'
					? 'bg-vs-dark text-white'
					: 'bg-white'
			}`}
			value={markdownContent}
			onChange={handleTextChange}
		/>
	);
}
