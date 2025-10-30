import React from 'react';
import { render } from '@testing-library/react';
import PageTitleWithContainer from '../../components/PageTitleWithContainer';

// Mock the PageTitle component to avoid external dependencies in snapshot
jest.mock('../../components/PageTitle', () => {
    // eslint-disable-next-line react/prop-types
    function MockPageTitle({ text }) {
        return <div className="mock-page-title">Mock PageTitle: {text}</div>;
    }
    return MockPageTitle;
});

describe('PageTitleWithContainer Component', () => {
    test('renders page title with container with default props', () => {
        const { container } = render(<PageTitleWithContainer />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('renders page title with container and text prop', () => {
        const { container } = render(<PageTitleWithContainer text="Welcome" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('renders page title with container and longer text', () => {
        const { container } = render(<PageTitleWithContainer text="This is a longer page title" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('applies correct container CSS classes', () => {
        const { container } = render(<PageTitleWithContainer text="Test" />);

        const containerDiv = container.firstChild;
        expect(containerDiv).toHaveClass('max-w-[73rem]');
        expect(containerDiv).toHaveClass('px-10');
        expect(containerDiv).toHaveClass('lg:px-8');
        expect(containerDiv).toHaveClass('xl:px-0');
        expect(containerDiv).toHaveClass('mx-auto');
        expect(containerDiv).toHaveClass('my-10');
        expect(containerDiv).toHaveClass('sm:my-20');
    });

    test('passes text prop correctly to PageTitle component', () => {
        const testText = 'My Page Title';
        const { getByText } = render(<PageTitleWithContainer text={testText} />);

        expect(getByText(`Mock PageTitle: ${testText}`)).toBeInTheDocument();
    });

    test('renders PageTitle component inside container', () => {
        const { container } = render(<PageTitleWithContainer text="Test" />);

        const mockPageTitle = container.querySelector('.mock-page-title');
        expect(mockPageTitle).toBeInTheDocument();
    });
});
