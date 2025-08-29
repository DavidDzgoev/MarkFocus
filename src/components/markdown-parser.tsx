import ReactMarkdownParser from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { 
	vs,
	dark
} from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { useMarkdownContentStore } from '../global-stores/useMarkdownContentStore';
import { useMonacoEditorOptionsStore } from '../global-stores/useMonacoEditorOptionsStore';
import { useSplitterStore } from '../global-stores/useSplitterStore';

export default function MarkdownParser() {
	const { markdownContent } = useMarkdownContentStore();
	const { theme } = useMonacoEditorOptionsStore();
	const { editorWidth, setEditorWidth } = useSplitterStore();

	// Выбираем стиль синтаксиса в зависимости от темы Monaco
	const syntaxStyle = theme === 'vs-dark' ? dark : vs;
	
	// Определяем классы для темной/светлой темы
	const isDark = theme === 'vs-dark';
	const themeClasses = {
		background: isDark ? 'bg-[rgb(30,30,30)]' : 'bg-white',
		text: isDark ? 'text-[#d4d4d4]' : 'text-gray-900',
		prose: isDark ? 'prose prose-invert' : 'prose'
	};

	// Функция для восстановления редактора
	const handleRestoreEditor = () => {
		setEditorWidth(50); // Восстанавливаем на 50%
	};

	return (
		<div className={`h-full w-full ${themeClasses.background} ${themeClasses.text} relative`}>
			{/* Кнопка восстановления редактора - показывается только когда редактор скрыт */}
			{editorWidth === 0 && (
				<button
					onClick={handleRestoreEditor}
					className={`absolute top-4 left-4 z-20 p-2 rounded-lg shadow-md border transition duration-300 ease-in-out hover:shadow-lg ${
						isDark 
							? 'bg-[rgb(30,30,30)] border-gray-600 text-gray-300 hover:text-gray-100' 
							: 'bg-white border-slate-200 text-slate-600 hover:text-slate-800'
					}`}
					title="Restore editor"
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
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
				</button>
			)}

			<div className={`h-full overflow-y-auto overflow-x-hidden p-6 ${themeClasses.prose} max-w-none break-words`}>
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
									wrapLines={true}
									showLineNumbers={false}
									customStyle={{
										maxWidth: '100%',
										overflow: 'auto',
										wordBreak: 'break-word',
										whiteSpace: 'pre-wrap',
									}}
								/>
							) : (
								<code className={`${className} ${themeClasses.text} break-words`} {...props}>
									{children}
								</code>
							);
						},
						// Добавляем обработку для pre блоков
						pre({ children, ...props }) {
							return (
								<pre 
									{...props} 
									className="max-w-full overflow-x-auto break-words whitespace-pre-wrap"
									style={{ 
										wordBreak: 'break-word',
										whiteSpace: 'pre-wrap'
									}}
								>
									{children}
								</pre>
							);
						},
						// Добавляем обработку для всех текстовых элементов
						p({ children, ...props }) {
							return (
								<p 
									{...props} 
									className="break-words whitespace-pre-wrap"
									style={{ wordBreak: 'break-word' }}
								>
									{children}
								</p>
							);
						},
						// Обработка для заголовков
						h1: ({ children, ...props }) => (
							<h1 {...props} className="break-words whitespace-pre-wrap">{children}</h1>
						),
						h2: ({ children, ...props }) => (
							<h2 {...props} className="break-words whitespace-pre-wrap">{children}</h2>
						),
						h3: ({ children, ...props }) => (
							<h3 {...props} className="break-words whitespace-pre-wrap">{children}</h3>
						),
						h4: ({ children, ...props }) => (
							<h4 {...props} className="break-words whitespace-pre-wrap">{children}</h4>
						),
						h5: ({ children, ...props }) => (
							<h5 {...props} className="break-words whitespace-pre-wrap">{children}</h5>
						),
						h6: ({ children, ...props }) => (
							<h6 {...props} className="break-words whitespace-pre-wrap">{children}</h6>
						),
						// Обработка для списков
						li: ({ children, ...props }) => (
							<li {...props} className="break-words whitespace-pre-wrap">{children}</li>
						),
						// Обработка для блоков цитат
						blockquote: ({ children, ...props }) => (
							<blockquote {...props} className="break-words whitespace-pre-wrap">{children}</blockquote>
						),
					}}
				>
					{markdownContent}
				</ReactMarkdownParser>
			</div>
		</div>
	);
}
