import { useLocation } from 'react-router-dom';

import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

export default function Home() {
    const { state } = useLocation()
    
    return (
        <div>
            <ErrorMessage error={state.error} />
        </div>
    )
}