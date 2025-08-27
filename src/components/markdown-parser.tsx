import ReactMarkdownParser from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { 
	vs,
	dark
} from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { useMarkdownContentStore } from '../global-stores/useMarkdownContentStore';
import { useMonacoEditorOptionsStore } from '../global-stores/useMonacoEditorOptionsStore';

export default function MarkdownParser() {
	const { markdownContent } = useMarkdownContentStore();
	const { theme } = useMonacoEditorOptionsStore();

	// Выбираем стиль синтаксиса в зависимости от темы Monaco
	const syntaxStyle = theme === 'vs-dark' ? dark : vs;
	
	// Определяем классы для темной/светлой темы
	const isDark = theme === 'vs-dark';
	const themeClasses = {
		background: isDark ? 'bg-[rgb(30,30,30)]' : 'bg-white',
		text: isDark ? 'text-[#d4d4d4]' : 'text-gray-900',
		prose: isDark ? 'prose prose-invert' : 'prose'
	};

	return (
		<div className={`h-full p-6 ${themeClasses.background} ${themeClasses.text}`}>
			<div className={`${themeClasses.prose} max-w-none`}>
				<ReactMarkdownParser
					remarkPlugins={[remarkGfm]}
					components={{
						code({ node, inline, className, children, ...props }) {
							const match = /language-(\w+)/.exec(className || '');
							return !inline && match ? (
								<SyntaxHighlighter
									// eslint-disable-next-line react/no-children-prop
									children={String(children).replace(/\n$/, '')}
									style={syntaxStyle}
									language={match[1]}
									PreTag="div"
									{...props}
								/>
							) : (
								<code className={`${className} ${themeClasses.text}`} {...props}>
									{children}
								</code>
							);
						},
					}}
				>
					{markdownContent}
				</ReactMarkdownParser>
			</div>
		</div>
	);
}
