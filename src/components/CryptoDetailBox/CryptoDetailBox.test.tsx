import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { vi } from 'vitest';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

import bitcoinDetailMock from '../../mock/bitcoin-detail.json';
import * as cryptoService from '../../services/crypto';
import CryptoDetailBox from './CryptoDetailBox';

const router = createBrowserRouter([
    {
        path: '/',
        element: <CryptoDetailBox />
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

describe('CryptoDetailBox', () => {  
    it('renders properly', async () => {
        vi.spyOn(cryptoService, 'getCoinDetail').mockImplementation(async () => {
            return bitcoinDetailMock
        })
        const { getByTestId, findByTestId } = render(
            <FakeComponentWrapper />
        );

        const loadingSpinner = getByTestId('loading-spinner')
        expect(loadingSpinner).toBeDefined()

        const coinTitle = await findByTestId('coin-title')
        expect(coinTitle).toBeDefined()

        queryClient.clear()
        queryClient.resetQueries()
    });
});