import cn from 'classnames';
import { ChangeEvent, MouseEvent, useCallback, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import * as cryptoService from '../../services/crypto';
import { priceFormatter } from '../../utils/price-formatter';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import css from './CryptoTable.module.css';
import TablePaginationActions from './TablePaginationActions';

interface Coin {
    id: string
    name: string
    symbol: string
    image: string
    current_price: number
    market_cap: number
    price_change_percentage_1h_in_currency: number
    price_change_percentage_24h_in_currency: number
    price_change_percentage_7d_in_currency: number
}

export default function CryptoTable() {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const navigateTo = useNavigate()

    const handleChangePage = (
        _: MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const { isLoading, error, data: rows } = useQuery<Coin[]>(['markets', page], {
        retry: false,
        staleTime: Infinity,
        cacheTime: Infinity,
        queryFn: async () => cryptoService.getMarketData({ page, rowsPerPage })
    })

    const handleCoingClick = useCallback((coinId: string) => {
        navigateTo(`/detail/${coinId}`)
    }, [])

    if(isLoading) {
        return <LoadingSpinner />
    }

    if(error) {
        console.log("🚀 ~ file: CryptoTable.tsx:49 ~ CryptoTable ~ error:", error)
        return <Navigate to={'/error'} state={{ error }} />
    }

    return (
        <TableContainer data-testid="table-container" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Coin</TableCell>
                        <TableCell>Price ($)</TableCell>
                        <TableCell>1h</TableCell>
                        <TableCell>24h</TableCell>
                        <TableCell>7d</TableCell>
                        <TableCell>Market Cap</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((coin, index) => (
                        <TableRow
                            data-testid={coin.id}
                            className={css.coinRow}
                            onClick={() => handleCoingClick(coin.id)}
                            key={coin.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th">
                                {(page - 1) * 10 + (index + 1)}
                            </TableCell>
                            <TableCell className={css.coinCell} component="th" scope="row">
                                <div>
                                    <img src={coin.image} alt={coin.name} />
                                    <h5>
                                        {coin.name}
                                    </h5>
                                    <span>
                                        {coin.symbol}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className={css.coinCell}>{priceFormatter.format(coin.current_price)}</TableCell>
                            <TableCell className={cn(css.coinCell, {
                                [css.positiveNumber]: Number(coin.price_change_percentage_1h_in_currency >= 0),
                                [css.negativeNumber]: Number(coin.price_change_percentage_1h_in_currency < 0),
                            })}>
                                <span>{coin.price_change_percentage_1h_in_currency.toFixed(2)}%</span>
                            </TableCell>
                            <TableCell className={cn(css.coinCell, {
                                [css.positiveNumber]: Number(coin.price_change_percentage_24h_in_currency >= 0),
                                [css.negativeNumber]: Number(coin.price_change_percentage_24h_in_currency < 0),
                            })}>
                                <span>{coin.price_change_percentage_24h_in_currency.toFixed(2)}%</span>
                            </TableCell>
                            <TableCell className={cn(css.coinCell, {
                                [css.positiveNumber]: Number(coin.price_change_percentage_7d_in_currency >= 0),
                                [css.negativeNumber]: Number(coin.price_change_percentage_7d_in_currency < 0),
                            })}>
                                <span>{coin.price_change_percentage_7d_in_currency.toFixed(2)}%</span>
                            </TableCell>
                            <TableCell className={css.coinCell}>{priceFormatter.format(coin.market_cap)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination 
                            colSpan={3}
                            count={1000}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}