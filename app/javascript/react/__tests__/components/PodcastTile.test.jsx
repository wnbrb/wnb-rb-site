/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import PodcastTile from '../../components/PodcastTile';

// Mock the Card and Button components to focus on PodcastTile logic
jest.mock('../../components/Card', () => ({ children, className }) => (
    <div className={className}>{children}</div>
));

jest.mock('../../components/Button', () => ({ children, type, className }) => (
    <button className={`${type} ${className}`}>{children}</button>
));

describe('PodcastTile Component', () => {
    const mockPodcasts = [
        {
            id: 1,
            tile_image: '/images/podcast1.jpg',
            tile_image_alt: 'Podcast 1 Cover',
            title: 'Amazing Tech Podcast',
            url: 'https://podcast1.com',
        },
        {
            id: 2,
            tile_image: '/images/podcast2.jpg',
            tile_image_alt: 'Podcast 2 Cover',
            title: 'Ruby Development Stories',
            url: 'https://podcast2.com',
        },
    ];

    const singlePodcast = [mockPodcasts[0]];

    // Snapshot tests
    it('should match snapshot with single podcast', () => {
        const { container } = render(<PodcastTile podcasts={singlePodcast} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with multiple podcasts', () => {
        const { container } = render(<PodcastTile podcasts={mockPodcasts} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with empty podcasts array', () => {
        const { container } = render(<PodcastTile podcasts={[]} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    // Functional tests
    it('should render all podcasts', () => {
        const { container } = render(<PodcastTile podcasts={mockPodcasts} />);
        const podcastListings = container.querySelectorAll('.podcast-listing');
        expect(podcastListings).toHaveLength(mockPodcasts.length);
    });

    it('should render podcast images with correct attributes', () => {
        const { container } = render(<PodcastTile podcasts={singlePodcast} />);
        const image = container.querySelector('img');

        expect(image).toHaveAttribute('src', singlePodcast[0].tile_image);
        expect(image).toHaveAttribute('alt', singlePodcast[0].tile_image_alt);
    });

    it('should render podcast titles as links', () => {
        const { getByText } = render(<PodcastTile podcasts={singlePodcast} />);
        const titleLink = getByText(singlePodcast[0].title);

        expect(titleLink.tagName).toBe('A');
        expect(titleLink).toHaveAttribute('href', singlePodcast[0].url);
        expect(titleLink).toHaveClass('podcast-title');
    });

    it('should render listen buttons with correct links', () => {
        const { container } = render(<PodcastTile podcasts={singlePodcast} />);
        const listenLink = container.querySelector('button a');

        expect(listenLink).toHaveAttribute('href', singlePodcast[0].url);
        expect(listenLink).toHaveAttribute('target', '_blank');
        expect(listenLink).toHaveAttribute('rel', 'noopener noreferrer');
        expect(listenLink).toHaveTextContent('Listen');
    });

    it('should use Card component with podcast-tile class', () => {
        const { container } = render(<PodcastTile podcasts={mockPodcasts} />);
        expect(container.firstChild).toHaveClass('podcast-tile');
    });

    it('should handle empty podcast array gracefully', () => {
        const { container } = render(<PodcastTile podcasts={[]} />);
        const podcastListings = container.querySelectorAll('.podcast-listing');
        expect(podcastListings).toHaveLength(0);
    });

    it('should render unique keys for each podcast', () => {
        const { container } = render(<PodcastTile podcasts={mockPodcasts} />);
        const podcastListings = container.querySelectorAll('.podcast-listing');

        // Each podcast listing should be present
        expect(podcastListings).toHaveLength(mockPodcasts.length);

        // Verify that both podcasts are rendered (check for unique content)
        expect(container).toHaveTextContent('Amazing Tech Podcast');
        expect(container).toHaveTextContent('Ruby Development Stories');
    });
});
