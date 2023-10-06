import '@testing-library/jest-dom/vitest';

import { afterEach, vi } from 'vitest';

import { cleanup } from '@testing-library/react';

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

vi.resetModules()