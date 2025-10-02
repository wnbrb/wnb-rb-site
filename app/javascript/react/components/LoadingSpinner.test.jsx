import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner Component', () => {
    // Snapshot tests
    it('should match snapshot with default props', () => {
        const { container } = render(<LoadingSpinner />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with custom className', () => {
        const { container } = render(<LoadingSpinner className="large-spinner" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    // Functional tests
    it('should render with default classes', () => {
        const { container } = render(<LoadingSpinner />);
        expect(container.firstChild).toHaveClass('loading-spinner');
    });

    it('should apply custom className', () => {
        const { container } = render(<LoadingSpinner className="custom-spinner" />);
        expect(container.firstChild).toHaveClass('loading-spinner', 'custom-spinner');
    });

    it('should render three loading dots', () => {
        const { container } = render(<LoadingSpinner />);
        const dots = container.querySelectorAll('.loading-dot');
        expect(dots).toHaveLength(3);
    });

    it('should handle undefined className gracefully', () => {
        const { container } = render(<LoadingSpinner className={undefined} />);
        expect(container.firstChild).toHaveClass('loading-spinner');
        expect(container.firstChild.classList.contains('undefined')).toBe(false);
    });

    it('should have correct DOM structure', () => {
        const { container } = render(<LoadingSpinner />);
        const spinner = container.firstChild;

        expect(spinner.tagName).toBe('DIV');
        expect(spinner.children).toHaveLength(3);

        Array.from(spinner.children).forEach((dot) => {
            expect(dot.tagName).toBe('DIV');
            expect(dot).toHaveClass('loading-dot');
        });
    });
});