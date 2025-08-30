# MarkFocus - Professional Markdown Editor

A modern, distraction-free markdown editor with focus mode and typewriter mode for enhanced writing experience.

## ✨ Features

- **Focus Mode**: Highlights only the current paragraph, dimming the rest for better concentration
- **Typewriter Mode**: Automatically centers the current line on screen for comfortable typing
- **Theme Support**: Light and dark themes with automatic switching
- **Monaco Editor**: Professional code editor with syntax highlighting
- **Real-time Preview**: Live markdown preview with split view
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Local Storage**: Automatically saves your content locally

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/markfocus.git
cd markfocus
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: Next.js 12 with TypeScript
- **Styling**: TailwindCSS
- **Editor**: Monaco Editor (VS Code's editor)
- **State Management**: Zustand
- **Deployment**: Vercel

## 📖 Usage

### Focus Mode
Toggle focus mode to highlight only the current paragraph. This helps you concentrate on one section at a time while writing.

### Typewriter Mode
Enable typewriter mode to automatically center the current line on screen, providing a comfortable typing experience similar to traditional typewriters.

### Theme Switching
Switch between light and dark themes using the settings panel. The theme preference is automatically saved.

### Content Management
- Your content is automatically saved to local storage
- Use the "Clear Content" button to start fresh
- All changes are preserved between sessions

## 🔧 Customization

### Themes
The editor supports multiple themes. You can add custom themes by placing JSON theme files in the `public/themes/` directory.

### Editor Settings
Customize your editing experience through the settings panel:
- Font size
- Cursor style
- Line numbers
- Minimap
- And more...

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Editor powered by [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/)

---

**MarkFocus** - Write better, focus more. ✍️
