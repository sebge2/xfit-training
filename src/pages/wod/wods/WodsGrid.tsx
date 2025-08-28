import Box from "@mui/material/Box";

export function WodsGrid({children}: { children: React.ReactNode }) {
    return <Box
        sx={{
            width: 'calc(100%-2rem)',
            display: 'grid',
            margin: '2rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(25rem, 100%), 1fr))',
            gap: 2,
        }}>
        {children}
    </Box>
}