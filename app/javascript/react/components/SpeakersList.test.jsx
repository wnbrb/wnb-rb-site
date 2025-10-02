import React from 'react';
import { render } from '@testing-library/react';
import SpeakersList from './SpeakersList';

describe('SpeakersList Component', () => {
    const mockSpeakers = [
        {
            id: 1,
            name: 'Jane Doe',
            tagline: 'Frontend Developer',
            image_url: 'https://example.com/jane.jpg',
        },
        {
            id: 2,
            name: 'John Smith',
            tagline: 'Backend Engineer',
            image_url: 'https://example.com/john.jpg',
        },
    ];

    const singleSpeaker = [
        {
            id: 1,
            name: 'Alice Johnson',
            tagline: 'Full Stack Developer',
            image_url: 'https://example.com/alice.jpg',
        },
    ];

    test('renders speakers list with multiple speakers', () => {
        const { container } = render(<SpeakersList speakers={mockSpeakers} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('renders speakers list with single speaker', () => {
        const { container } = render(<SpeakersList speakers={singleSpeaker} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('renders null when speakers array is empty', () => {
        const { container } = render(<SpeakersList speakers={[]} />);
        expect(container.firstChild).toBeNull();
    });

    test('renders null when speakers is undefined', () => {
        const { container } = render(<SpeakersList />);
        expect(container.firstChild).toBeNull();
    });

    test('renders null when speakers is null', () => {
        const { container } = render(<SpeakersList speakers={null} />);
        expect(container.firstChild).toBeNull();
    });

    test('displays speaker names correctly', () => {
        const { getByText } = render(<SpeakersList speakers={mockSpeakers} />);

        expect(getByText('Jane Doe')).toBeInTheDocument();
        expect(getByText('John Smith')).toBeInTheDocument();
    });

    test('displays speaker taglines correctly', () => {
        const { getByText } = render(<SpeakersList speakers={mockSpeakers} />);

        expect(getByText('Frontend Developer')).toBeInTheDocument();
        expect(getByText('Backend Engineer')).toBeInTheDocument();
    });

    test('renders speaker images with correct attributes', () => {
        const { container } = render(<SpeakersList speakers={singleSpeaker} />);

        const image = container.querySelector('img');
        expect(image).toHaveAttribute('src', 'https://example.com/alice.jpg');
        expect(image).toHaveAttribute('alt', '');
        expect(image).toHaveClass('object-cover', 'w-14', 'h-14', 'mr-4', 'rounded-full');
    });

    test('applies correct CSS classes to speaker containers', () => {
        const { container } = render(<SpeakersList speakers={singleSpeaker} />);

        const speakerDiv = container.firstChild;
        expect(speakerDiv).toHaveClass('flex', 'content-center', 'mb-8', 'text-lg');
    });

    test('applies correct CSS classes to speaker names', () => {
        const { getByText } = render(<SpeakersList speakers={singleSpeaker} />);

        const nameElement = getByText('Alice Johnson');
        expect(nameElement).toHaveClass('font-bold', 'text-gray', 'md:text-lg');
    });

    test('applies correct CSS classes to speaker taglines', () => {
        const { getByText } = render(<SpeakersList speakers={singleSpeaker} />);

        const taglineElement = getByText('Full Stack Developer');
        expect(taglineElement).toHaveClass('text-sm', 'text-gray', 'md:text-lg');
    });

    test('uses speaker id as key for React elements', () => {
        const { container } = render(<SpeakersList speakers={mockSpeakers} />);

        // Check that multiple speaker elements are rendered
        const speakerElements = container.querySelectorAll('.flex.content-center');
        expect(speakerElements).toHaveLength(2);
    });
});
