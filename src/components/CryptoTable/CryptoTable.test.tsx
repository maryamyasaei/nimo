import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { vi } from 'vitest';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render } from '@testing-library/react'; // test utility library

import marketsMockData from '../../mock/markets.json';
import * as cryptoService from '../../services/crypto';
import CryptoTable from './CryptoTable';

const router = createBrowserRouter([
    {
        path: '/',
        element: <CryptoTable />
    }
])

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: Infinity,
        staleTime: Infinity
      }
    }
  })

const FakeComponentWrapper = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

describe('CryptoTable', () => {
    it('renders properly', async () => {
        vi.spyOn(cryptoService, 'getMarketData').mockImplementation(async () => {
            return marketsMockData
        })
        const { getByTestId, findByTestId, findAllByRole } = render(
            <FakeComponentWrapper />
        );

        const loadingSpinner = getByTestId('loading-spinner')
        expect(loadingSpinner).toBeDefined()
        
        const tableContainer = await findByTestId('table-container')
        expect(tableContainer).toBeDefined()

        const tableRows = await findAllByRole('row')

        // should be 12 including header and footer
        expect(tableRows).toHaveLength(12)

        // first row after header row
        expect(tableRows[1].getAttribute('data-testid')).toBe('first-page-first-row')

        queryClient.clear()
        queryClient.resetQueries()
    });

    it('renders next page on click of a button', async () => {
        vi.spyOn(cryptoService, 'getMarketData').mockImplementation(async () => {
            const mockData = [
                ...marketsMockData
            ]

            mockData[0].id = 'second-page-first-row'
            return mockData
        })
        
        const { findByTestId, getByLabelText, findAllByRole } = render(
            <FakeComponentWrapper />
        );

        const loadingSpinner = await findByTestId('loading-spinner')
        expect(loadingSpinner).toBeDefined()
        
        
        const tableContainer = await findByTestId('table-container')
        expect(tableContainer).toBeDefined()

        const nextButton = getByLabelText('next page')
        expect(nextButton).toBeDefined()

        fireEvent.click(nextButton)

        expect(loadingSpinner).toBeDefined()

        const tableRows = await findAllByRole('row')
        // should be 12 including header and footer
        expect(tableRows).toHaveLength(12)

        // first row after header row
        expect(tableRows[1].getAttribute('data-testid')).toBe('second-page-first-row')
        
        queryClient.clear()
        queryClient.resetQueries()
    });

    it('goes to detail page on click of a row', async () => {
        vi.spyOn(cryptoService, 'getMarketData').mockImplementation(async () => {
            return marketsMockData
        })
        const { findByTestId, findAllByRole } = render(
            <FakeComponentWrapper />
        );

        const loadingSpinner = await findByTestId('loading-spinner')
        expect(loadingSpinner).toBeDefined()
        
        
        const tableContainer = await findByTestId('table-container')
        expect(tableContainer).toBeDefined()

        const tableRows = await findAllByRole('row')

        fireEvent.click(tableRows[1])
        expect(window.location.href).toContain('/detail/second-page-first-row')
    });
});