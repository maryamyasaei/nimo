import { useNavigate } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';

import CryptoDetailBox from '../components/CryptoDetailBox/CryptoDetailBox';

export default function CryptoDetail() {
    const navigateTo = useNavigate()

    const goToList = () => {
        navigateTo('/')
    }

    return (
        <>
            <Button size="small" variant="outlined" onClick={goToList}>
                <ArrowBack />
                Back
            </Button>
            <CryptoDetailBox />
        </>
    )
}