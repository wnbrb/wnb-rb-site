import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AlertBanner from '../../components/AlertBanner';

describe('AlertBanner Component', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        mockOnClose.mockClear();
    });

    // Snapshot tests
    it('should match snapshot with success type', () => {
        const { container } = render(
            <AlertBanner
                type="success"
                message="Operation completed successfully"
                onClose={mockOnClose}
            />,
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with error type', () => {
        const { container } = render(
            <AlertBanner type="error" message="Something went wrong" onClose={mockOnClose} />,
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with warning type', () => {
        const { container } = render(
            <AlertBanner type="warning" message="Please check your input" onClose={mockOnClose} />,
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    // Functional tests
    it('should render message correctly', () => {
        const message = 'Test alert message';
        const { getByText } = render(
            <AlertBanner type="success" message={message} onClose={mockOnClose} />,
        );
        expect(getByText(message)).toBeInTheDocument();
    });

    it('should display correct emoji for each type', () => {
        const { rerender, container } = render(
            <AlertBanner type="success" message="Success" onClose={mockOnClose} />,
        );
        expect(container.querySelector('.emoji-icon')).toHaveTextContent('👍🏼');

        rerender(<AlertBanner type="error" message="Error" onClose={mockOnClose} />);
        expect(container.querySelector('.emoji-icon')).toHaveTextContent('😨');

        rerender(<AlertBanner type="warning" message="Warning" onClose={mockOnClose} />);
        expect(container.querySelector('.emoji-icon')).toHaveTextContent('⚠️❗️');
    });

    it('should apply correct CSS class for type', () => {
        const { container } = render(
            <AlertBanner type="error" message="Error message" onClose={mockOnClose} />,
        );
        expect(container.firstChild).toHaveClass('alert-banner', 'error');
    });

    it('should call onClose when close button is clicked', () => {
        const { getByText } = render(
            <AlertBanner type="success" message="Test message" onClose={mockOnClose} />,
        );

        fireEvent.click(getByText('X'));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should have accessible close button', () => {
        const { container } = render(
            <AlertBanner type="success" message="Test message" onClose={mockOnClose} />,
        );

        const closeButton = container.querySelector('.close-button');
        expect(closeButton).toBeInTheDocument();
        expect(closeButton.tagName).toBe('BUTTON');
    });
});
