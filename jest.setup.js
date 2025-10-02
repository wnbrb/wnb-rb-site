// Jest Setup - Testing Library & Emotion Integration
import '@testing-library/jest-dom';
import { matchers } from '@emotion/jest';

// Add the Emotion matchers to Jest
// eslint-disable-next-line no-undef
expect.extend(matchers);

// TODO: Add more global configurations as the project grows
// Examples for future expansion:
// - Mock browser APIs (matchMedia, IntersectionObserver, etc.)
// - Global test utilities
// - Custom matchers
// - Test data factories
