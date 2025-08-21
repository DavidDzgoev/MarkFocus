import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GearModal from '../../src/components/gear-modal';

describe('GearModal', () => {
	it('renders without crashing', () => {
		render(<GearModal />);
	});

	it('should render with correct title, text, and html element', () => {
		render(<GearModal />);

		const title = screen.getByRole('banner');
		const editor = screen.getByRole('heading', { name: /editor/i });
		const editorDropdown = screen.getByTestId('editorType');
		const theme = screen.getByRole('heading', { name: /theme/i });
		const themeDropdown = screen.getByTestId('theme');
		const language = screen.getByRole('heading', { name: /language/i });
		const languageDropdown = screen.getByTestId('language');
		const cursorBlinking = screen.getByRole('heading', {
			name: /cursor blinking/i,
		});
		const cursorBlinkingDropdown = screen.getByTestId('cursorBlinking');
		const cursorStyle = screen.getByRole('heading', { name: /cursor style/i });
		const cursorStyleDropdown = screen.getByTestId('cursorStyle');
		const showMiniMap = screen.getByRole('checkbox', {
			name: /show mini map/i,
		});
		const showMiniMapCheckbox = screen.getByRole('checkbox');
		const showLineNumber = screen.getByRole('heading', {
			name: /show line number/i,
		});
		const showLineNumberDropdown = screen.getByTestId('lineNumbers');

		expect(title).toBeInTheDocument();
		expect(title).toHaveTextContent('Editor Settings');

		expect(editor).toBeInTheDocument();
		expect(editorDropdown).toBeInTheDocument();
		expect(
			within(editorDropdown).getByRole('option', { name: /text/i })
		).toBeInTheDocument();
		expect(
			within(editorDropdown).getByRole('option', { name: /monaco/i })
		).toBeInTheDocument();

		expect(theme).toBeInTheDocument();
		expect(themeDropdown).toBeInTheDocument();
		expect(
			within(themeDropdown).getByRole('option', { name: /vs dark/i })
		).toBeInTheDocument();
		expect(
			within(themeDropdown).getByRole('option', { name: /vs light/i })
		).toBeInTheDocument();

		expect(language).toBeInTheDocument();
		expect(languageDropdown).toBeInTheDocument();
		expect(
			within(languageDropdown).getByRole('option', { name: /markdown/i })
		).toBeInTheDocument();
		expect(
			within(languageDropdown).getByRole('option', { name: /javascript/i })
		).toBeInTheDocument();
		expect(
			within(languageDropdown).getByRole('option', { name: /typescript/i })
		).toBeInTheDocument();

		expect(cursorBlinking).toBeInTheDocument();
		expect(cursorBlinkingDropdown).toBeInTheDocument();
		expect(
			within(cursorBlinkingDropdown).getByRole('option', { name: /blink/i })
		).toBeInTheDocument();
		expect(
			within(cursorBlinkingDropdown).getByRole('option', { name: /smooth/i })
		).toBeInTheDocument();
		expect(
			within(cursorBlinkingDropdown).getByRole('option', { name: /phase/i })
		).toBeInTheDocument();
		expect(
			within(cursorBlinkingDropdown).getByRole('option', { name: /expand/i })
		).toBeInTheDocument();
		expect(
			within(cursorBlinkingDropdown).getByRole('option', { name: /solid/i })
		).toBeInTheDocument();

		expect(cursorStyle).toBeInTheDocument();
		expect(cursorStyleDropdown).toBeInTheDocument();
		expect(
			within(cursorStyleDropdown).getByRole('option', { name: 'Line' })
		).toBeInTheDocument();
		expect(
			within(cursorStyleDropdown).getByRole('option', { name: 'Line-thin' })
		).toBeInTheDocument();
		expect(
			within(cursorStyleDropdown).getByRole('option', { name: 'Block' })
		).toBeInTheDocument();
		expect(
			within(cursorStyleDropdown).getByRole('option', {
				name: 'Block-outline',
			})
		).toBeInTheDocument();
		expect(
			within(cursorStyleDropdown).getByRole('option', { name: 'Underline' })
		).toBeInTheDocument();
		expect(
			within(cursorStyleDropdown).getByRole('option', {
				name: 'Underline-thin',
			})
		).toBeInTheDocument();

		expect(showMiniMap).toBeInTheDocument();
		expect(showMiniMapCheckbox).toBeInTheDocument();

		expect(showLineNumber).toBeInTheDocument();
		expect(showLineNumberDropdown).toBeInTheDocument();
		expect(
			within(showLineNumberDropdown).getByRole('option', { name: /on/i })
		).toBeInTheDocument();
		expect(
			within(showLineNumberDropdown).getByRole('option', { name: /off/i })
		).toBeInTheDocument();
		expect(
			within(showLineNumberDropdown).getByRole('option', { name: /relative/i })
		).toBeInTheDocument();
	});
});
