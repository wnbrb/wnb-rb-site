import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
    // Snapshot tests
    it('should match snapshot with default props', () => {
        const { container } = render(<Button>Click me</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with custom props', () => {
        const { container } = render(
            <Button type="primary" className="custom-class" disabled>
                Disabled Button
            </Button>,
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with different button types', () => {
        const { container } = render(
            <Button type="secondary" className="btn-large">
                Secondary Button
            </Button>,
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    // Functional tests
    it('should render children correctly', () => {
        const { getByText } = render(<Button>Test Button</Button>);
        expect(getByText('Test Button')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(<Button className="custom-btn">Test</Button>);
        expect(container.firstChild).toHaveClass('button', 'custom-btn');
    });

    it('should apply type as className', () => {
        const { container } = render(<Button type="primary">Test</Button>);
        expect(container.firstChild).toHaveClass('button', 'primary');
    });

    it('should handle disabled state correctly', () => {
        const { container, rerender } = render(<Button disabled>Test</Button>);

        // Initially disabled
        expect(container.firstChild).toHaveClass('disabled');

        // Re-render with disabled=false
        rerender(<Button disabled={false}>Test</Button>);
        expect(container.firstChild).not.toHaveClass('disabled');
    });

    it('should call onClick when clicked and not disabled', () => {
        const mockOnClick = jest.fn();
        const { getByText } = render(<Button onClick={mockOnClick}>Clickable Button</Button>);

        fireEvent.click(getByText('Clickable Button'));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should have correct default props', () => {
        const { container } = render(<Button>Default Button</Button>);
        const button = container.firstChild;

        expect(button).toHaveClass('button');
        expect(button).not.toHaveClass('disabled');
    });
});
