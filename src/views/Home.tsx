import { Container } from '@mui/material';

import CryptoTable from '../components/CryptoTable/CryptoTable';

export default function Home() {
    return (
        <Container maxWidth="lg">
            <CryptoTable />
        </Container>
    )
}