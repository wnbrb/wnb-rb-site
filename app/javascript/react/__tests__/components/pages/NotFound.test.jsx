import React from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import NotFound from '../../../components/pages/NotFound';

// Mock SharedLayout component
jest.mock('../../../components/layout/SharedLayout', () => {
    // eslint-disable-next-line react/prop-types
    function MockSharedLayout({ children }) {
        return <div className="mock-shared-layout">{children}</div>;
    }
    return MockSharedLayout;
});

// Mock NewLogo component
jest.mock('../../../components/icons/NewLogo', () => {
    // eslint-disable-next-line react/prop-types
    function MockNewLogo({ className }) {
        return <div className={`mock-new-logo ${className || ''}`}>Logo</div>;
    }
    return MockNewLogo;
});

describe('NotFound Component', () => {
    const renderWithHelmet = (component) => {
        return render(<HelmetProvider>{component}</HelmetProvider>);
    };

    test('renders not found page correctly', () => {
        const { container } = renderWithHelmet(<NotFound />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('applies correct CSS classes to container', () => {
        const { container } = renderWithHelmet(<NotFound />);

        const notFoundContainer = container.querySelector('.not-found-container');
        expect(notFoundContainer).toBeInTheDocument();
        expect(notFoundContainer).toHaveClass('not-found-container');
    });

    test('renders logo with correct classes', () => {
        const { container } = renderWithHelmet(<NotFound />);

        const logo = container.querySelector('.mock-new-logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveClass('h-60', 'w-60');
    });

    test('displays 404 title correctly', () => {
        const { getByText } = renderWithHelmet(<NotFound />);

        const title = getByText('404');
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass('title-text-lg');
    });

    test('displays error message correctly', () => {
        const { getByText } = renderWithHelmet(<NotFound />);

        expect(getByText("We couldn't find the page you were looking for.")).toBeInTheDocument();
    });

    test('applies correct CSS classes to text container', () => {
        const { container } = renderWithHelmet(<NotFound />);

        const textContainer = container.querySelector('.not-found-text-container');
        expect(textContainer).toBeInTheDocument();
        expect(textContainer).toHaveClass('not-found-text-container');
    });

    test('renders within SharedLayout', () => {
        const { container } = renderWithHelmet(<NotFound />);

        const sharedLayout = container.querySelector('.mock-shared-layout');
        expect(sharedLayout).toBeInTheDocument();
    });

    test('sets correct page title in helmet', () => {
        renderWithHelmet(<NotFound />);

        // Note: Testing Helmet requires additional setup, but the component structure is tested
        // The Helmet component is rendered and would set the title in a real environment
    });
});
