import React from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import Community from './Community';

// Mock SharedLayout component
jest.mock('../layout/SharedLayout', () => {
    // eslint-disable-next-line react/prop-types
    function MockSharedLayout({ children }) {
        return <div className="mock-shared-layout">{children}</div>;
    }
    return MockSharedLayout;
});

// Mock all community section components
jest.mock('../community/OurCommunitySection', () => {
    function MockOurCommunitySection() {
        return <div className="mock-our-community-section">Our Community Section</div>;
    }
    return MockOurCommunitySection;
});

jest.mock('../community/AdviceSection', () => {
    function MockAdviceSection() {
        return <div className="mock-advice-section">Advice Section</div>;
    }
    return MockAdviceSection;
});

jest.mock('../community/CodeofConductSection', () => {
    function MockCodeofConductSection() {
        return <div className="mock-code-of-conduct-section">Code of Conduct Section</div>;
    }
    return MockCodeofConductSection;
});

jest.mock('../community/CFPWorkingGroupSection', () => {
    function MockCFPWorkingGroupSection() {
        return <div className="mock-cfp-working-group-section">CFP Working Group Section</div>;
    }
    return MockCFPWorkingGroupSection;
});

jest.mock('../community/BookClubSection', () => {
    function MockBookClubSection() {
        return <div className="mock-book-club-section">Book Club Section</div>;
    }
    return MockBookClubSection;
});

jest.mock('../community/In-PersonConferenceMeetupsSection', () => {
    function MockInPersonConferenceMeetupsSection() {
        return (
            <div className="mock-in-person-conference-meetups-section">
                In-Person Conference Meetups Section
            </div>
        );
    }
    return MockInPersonConferenceMeetupsSection;
});

jest.mock('../community/InterviewPrepSection', () => {
    function MockInterviewPrepSection() {
        return <div className="mock-interview-prep-section">Interview Prep Section</div>;
    }
    return MockInterviewPrepSection;
});

describe('Community Component', () => {
    const renderWithHelmet = (component) => {
        return render(<HelmetProvider>{component}</HelmetProvider>);
    };

    test('renders community page correctly', () => {
        const { container } = renderWithHelmet(<Community />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('applies correct CSS classes to main sections', () => {
        const { container } = renderWithHelmet(<Community />);

        const communitySection = container.querySelector('.community-section');
        expect(communitySection).toBeInTheDocument();

        const community = container.querySelector('.community');
        expect(community).toBeInTheDocument();

        const infoSection = container.querySelector('.info');
        expect(infoSection).toBeInTheDocument();

        const infoLayout = container.querySelector('.info-layout');
        expect(infoLayout).toBeInTheDocument();
    });

    test('renders Our Community section with correct styling', () => {
        const { container, getByText } = renderWithHelmet(<Community />);

        expect(getByText('Our Community')).toBeInTheDocument();
        expect(getByText('Our Community Section')).toBeInTheDocument();

        const ourCommunityCard = container.querySelector('.bg-color-community');
        expect(ourCommunityCard).toBeInTheDocument();
    });

    test('renders all info cards with correct titles', () => {
        const { getByText } = renderWithHelmet(<Community />);

        expect(getByText('Advice')).toBeInTheDocument();
        expect(getByText('Book Club')).toBeInTheDocument();
        expect(getByText('CFP Working Group')).toBeInTheDocument();
        expect(getByText('In-Person Conference Meetups')).toBeInTheDocument();
        expect(getByText('Code of Conduct')).toBeInTheDocument();
        expect(getByText('Jobs & Interview Prep')).toBeInTheDocument();
    });

    test('applies correct background colors to info cards', () => {
        const { container } = renderWithHelmet(<Community />);

        const bgColor1Cards = container.querySelectorAll('.bg-color-1');
        const bgColor2Cards = container.querySelectorAll('.bg-color-2');
        const bgColor3Cards = container.querySelectorAll('.bg-color-3');

        expect(bgColor1Cards.length).toBeGreaterThan(0);
        expect(bgColor2Cards.length).toBeGreaterThan(0);
        expect(bgColor3Cards.length).toBeGreaterThan(0);
    });

    test('renders all mocked section components', () => {
        const { getByText } = renderWithHelmet(<Community />);

        expect(getByText('Our Community Section')).toBeInTheDocument();
        expect(getByText('Advice Section')).toBeInTheDocument();
        expect(getByText('Code of Conduct Section')).toBeInTheDocument();
        expect(getByText('CFP Working Group Section')).toBeInTheDocument();
        expect(getByText('Book Club Section')).toBeInTheDocument();
        expect(getByText('In-Person Conference Meetups Section')).toBeInTheDocument();
        expect(getByText('Interview Prep Section')).toBeInTheDocument();
    });

    test('applies correct typography classes to titles', () => {
        const { container } = renderWithHelmet(<Community />);

        const mainTitle = container.querySelector('.font-bold.font-syne');
        expect(mainTitle).toBeInTheDocument();

        const infoTitles = container.querySelectorAll('.text-xl.font-bold.font-syne');
        expect(infoTitles.length).toBeGreaterThan(0);
    });

    test('applies correct content typography', () => {
        const { container } = renderWithHelmet(<Community />);

        const contentDivs = container.querySelectorAll('.font-noto.text-base');
        expect(contentDivs.length).toBeGreaterThan(0);
    });

    test('renders within SharedLayout', () => {
        const { container } = renderWithHelmet(<Community />);

        const sharedLayout = container.querySelector('.mock-shared-layout');
        expect(sharedLayout).toBeInTheDocument();
    });
});
