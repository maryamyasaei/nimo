import cn from 'classnames';
import { Navigate, useParams } from 'react-router-dom';

import { NotificationsOutlined, ReplyOutlined, Star, StarBorder } from '@mui/icons-material';
import { Button, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getCoinDetail } from '../../services/crypto';
import { priceFormatter } from '../../utils/price-formatter';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import css from './CryptoDetailBox.module.css';

export default function CryptoDetailBox() {
    const params = useParams()

    const { isLoading, error, data: coinDetail } = useQuery(['detail', params.id], {
        retry: false,
        queryFn: async () => getCoinDetail({ id: params.id })
    })

    if(isLoading) {
        return <LoadingSpinner />
    }

    const latestUsdPrice = coinDetail?.tickers?.find((ticker: { target: string }) => ticker.target.toLowerCase() === 'usd')?.converted_last?.usd || 0;


    if(error) {
        return (
            <Navigate to={'/error'} state={{ error }} />
        )
    }

    return (
        <Paper className={css.detailWrapper}>
            <div className={css.coinDetail}>
                {coinDetail?.image && <img src={coinDetail?.image.thumb} alt={coinDetail.name} />}
                <h4 data-testid="coin-title">{coinDetail?.name}</h4>
                <span>{coinDetail?.symbol}</span>
            </div>

            <div className={css.priceDetail}>
                <h5>{priceFormatter.format(latestUsdPrice)}</h5>
                <strong
                    className={cn({
                        [css.positiveNumber]: Number(coinDetail?.market_data?.price_change_percentage_24h) >= 0,
                        [css.negativeNumber]: Number(coinDetail?.market_data?.price_change_percentage_24h) < 0,
                    })}
                >{coinDetail?.market_data?.price_change_percentage_24h?.toFixed(2)}$</strong>
                <i>ℹ</i>
            </div>

            <div className={css.coinToolbar}>
                <div>
                    <Button color="inherit" variant="outlined">
                        <ReplyOutlined />
                    </Button>
                    <Button color="inherit" variant="outlined">
                        <NotificationsOutlined /> 
                    </Button>
                    <Button color="inherit" variant="outlined">
                        <StarBorder />
                    </Button>
                </div>
                <span>
                    <Star color="warning" />
                    {coinDetail?.watchlist_portfolio_users || 0}
                </span>
            </div>

            <div className={css.marketDataWrapper}>
                <ul>
                    <li>
                        <span>
                            Market Cap <i>ⓘ</i>
                        </span>
                        <span>
                            {priceFormatter.format(coinDetail?.market_data?.market_cap?.usd || 0)}
                        </span>
                    </li>
                    <li>
                        <span>
                            24 Hour Trading Vol <i>ⓘ</i>
                        </span>
                        <span>
                            {priceFormatter.format(coinDetail?.market_data?.total_volume?.usd || 0)}
                        </span>
                    </li>
                    <li>
                        <span>
                            Fully Diluted Valuation <i>ⓘ</i>
                        </span>
                        <span>
                            {priceFormatter.format(coinDetail?.market_data?.fully_diluted_valuation?.usd || 0)}
                        </span>
                    </li>
                </ul>

                <ul>
                    <li>
                        <span>
                            Circulating Supply <i>ⓘ</i>
                        </span>
                        <span>
                            {priceFormatter.format(coinDetail?.market_data?.circulating_supply || 0)}
                        </span>
                    </li>
                    <li>
                        <span>
                            Total Supply <i>ⓘ</i>
                        </span>
                        <span>
                            {priceFormatter.format(coinDetail?.market_data?.total_supply || 0)}
                        </span>
                    </li>
                    <li>
                        <span>
                            Max Supply <i>ⓘ</i>
                        </span>
                        <span>
                            {priceFormatter.format(coinDetail?.market_data?.max_supply || 0)}
                        </span>
                    </li>
                </ul>
            </div>
        </Paper>
    )
}