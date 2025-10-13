import React from 'react';
import { render } from '@testing-library/react';
import Banner from '../../components/Banner';

// Mock the Card component to avoid external dependencies in snapshot
jest.mock('../../components/Card', () => {
    // eslint-disable-next-line react/prop-types
    function MockCard({ children, className }) {
        return <div className={`mock-card ${className || ''}`}>{children}</div>;
    }
    return MockCard;
});

describe('Banner Component', () => {
    test('renders banner with default props', () => {
        const { container } = render(<Banner />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('renders banner with children content', () => {
        const { container } = render(
            <Banner>
                <h1>Welcome to our site!</h1>
                <p>This is a banner message.</p>
            </Banner>,
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    test('renders banner with text content', () => {
        const { container } = render(<Banner>Simple text content</Banner>);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('renders banner with complex nested content', () => {
        const { container } = render(
            <Banner>
                <div className="banner-content">
                    <h2>Event Title</h2>
                    <span className="date">March 15, 2024</span>
                    <button>Register Now</button>
                </div>
            </Banner>,
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    test('applies correct CSS classes', () => {
        const { container } = render(<Banner>Test content</Banner>);

        const bannerDiv = container.firstChild;
        expect(bannerDiv).toHaveClass('banner');

        const cardElement = bannerDiv.querySelector('.mock-card');
        expect(cardElement).toHaveClass('banner-card');
    });

    test('passes children correctly to Card component', () => {
        const testContent = 'Test banner content';
        const { getByText } = render(<Banner>{testContent}</Banner>);

        expect(getByText(testContent)).toBeInTheDocument();
    });
});
