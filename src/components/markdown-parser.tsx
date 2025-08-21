import ReactMarkdownParser from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { useMarkdownContentStore } from '../global-stores/useMarkdownContentStore';

export default function MarkdownParser() {
	const { markdownContent } = useMarkdownContentStore();

	return (
		<ReactMarkdownParser
			remarkPlugins={[remarkGfm]}
			components={{
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || '');
					return !inline && match ? (
						<SyntaxHighlighter
							// eslint-disable-next-line react/no-children-prop
							children={String(children).replace(/\n$/, '')}
							style={dracula}
							language={match[1]}
							PreTag="div"
							{...props}
						/>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					);
				},
			}}
		>
			{markdownContent}
		</ReactMarkdownParser>
	);
}
