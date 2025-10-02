import React from 'react';
import { render } from '@testing-library/react';
import PageTitle from '../../components/PageTitle';

// Mock the NewLogo component
jest.mock('../../components/icons/NewLogo', () => {
    // eslint-disable-next-line react/prop-types
    function MockNewLogo({ className }) {
        return <div className={`mock-new-logo ${className || ''}`}>Logo</div>;
    }
    return MockNewLogo;
});

describe('PageTitle Component', () => {
    test('renders page title with default props', () => {
        const { container } = render(<PageTitle />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('renders page title with text prop', () => {
        const { container } = render(<PageTitle text="Welcome to our site" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('renders page title with text and altText props', () => {
        const { container } = render(<PageTitle text="Events" altText="Events page title" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('renders page title with children content', () => {
        const { container } = render(
            <PageTitle text="About Us">
                <p className="subtitle">Learn more about our community</p>
                <button>Get Started</button>
            </PageTitle>,
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    test('renders page title with all props and children', () => {
        const { container } = render(
            <PageTitle text="Contact" altText="Contact us page">
                <div className="contact-info">
                    <span>Email: info@example.com</span>
                </div>
            </PageTitle>,
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    test('applies correct CSS classes', () => {
        const { container } = render(<PageTitle text="Test" />);

        const pageTitle = container.firstChild;
        expect(pageTitle).toHaveClass('page-title');

        const titleContainer = pageTitle.querySelector('.title-container');
        expect(titleContainer).toBeInTheDocument();

        const titleText = pageTitle.querySelector('.title-text');
        expect(titleText).toBeInTheDocument();
        expect(titleText).toHaveClass('title-text');

        const logo = pageTitle.querySelector('.mock-new-logo');
        expect(logo).toHaveClass('new-logo');
    });

    test('renders title text correctly', () => {
        const titleText = 'My Page Title';
        const { getByText } = render(<PageTitle text={titleText} />);

        expect(getByText(titleText)).toBeInTheDocument();
    });

    test('applies altText to title element', () => {
        const altText = 'Page title alt text';
        const { container } = render(<PageTitle text="Title" altText={altText} />);

        const titleElement = container.querySelector('.title-text');
        expect(titleElement).toHaveAttribute('alt', altText);
    });

    test('renders children content correctly', () => {
        const { getByText } = render(
            <PageTitle text="Title">
                <span>Child content</span>
            </PageTitle>,
        );

        expect(getByText('Child content')).toBeInTheDocument();
    });
});
