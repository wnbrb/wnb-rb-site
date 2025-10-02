import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
    // Snapshot tests
    it('should match snapshot with default props', () => {
        const { container } = render(
            <Card>
                <p>Card content</p>
            </Card>,
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with custom className', () => {
        const { container } = render(
            <Card className="custom-card">
                <h2>Card Title</h2>
                <p>Card description</p>
            </Card>,
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with complex content', () => {
        const { container } = render(
            <Card className="featured-card">
                <div>
                    <h3>Complex Card</h3>
                    <p>With multiple elements</p>
                    <button type="button">Action</button>
                </div>
            </Card>,
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    // Functional tests
    it('should render children correctly', () => {
        const { getByText } = render(
            <Card>
                <p>Test content</p>
            </Card>,
        );
        expect(getByText('Test content')).toBeInTheDocument();
    });

    it('should apply default classes', () => {
        const { container } = render(<Card>Content</Card>);
        expect(container.firstChild).toHaveClass('card', 'p-10');
    });

    it('should apply custom className', () => {
        const { container } = render(<Card className="my-custom-class">Content</Card>);
        expect(container.firstChild).toHaveClass('card', 'p-10', 'my-custom-class');
    });

    it('should handle undefined className gracefully', () => {
        const { container } = render(<Card className={undefined}>Content</Card>);
        expect(container.firstChild).toHaveClass('card', 'p-10');
        expect(container.firstChild.classList.contains('undefined')).toBe(false);
    });
});
