import { useNavigate } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';

import css from './ErrorMessage.module.css';

interface Props {
    error: Error
}

export default function ErrorMessage({ error }: Props) {
    const navigateTo = useNavigate()

    const goBack = () => {
        navigateTo('/')
    }

    return (
        <div className={css.errorWrapper}>
            <h4>Oops! 😬</h4>
            <p>Seems like the coin 💰 got stolen! 🥷</p>
            {error?.message && <pre>{error.message}</pre>}

            <div>
                <Button size="small" variant="outlined" onClick={goBack}>
                    <ArrowBack />
                    Back
                </Button>
            </div>
        </div>
    )
}