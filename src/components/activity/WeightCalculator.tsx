import Box from '@mui/material/Box';
import {Paper, Typography, Slider} from '@mui/material';


type Props = {
    weight: number | undefined;
};

export function WeightCalculator({weight}: Props) {
    function valueText(value: number) {
        return `${value}% = ${(value / 100) * (weight || 0)} kg`;
    }

    const DEFAULT_VALUE = 80;

    return <Box sx={{position: 'relative', p: '1rem', margin: '1rem'}}>
        <Paper
            variant="outlined"
            sx={{p: '1rem', position: 'relative'}}
        >
            <Slider
                aria-label="Kilograms"
                defaultValue={DEFAULT_VALUE}
                getAriaValueText={valueText}
                shiftStep={30}
                step={10}
                marks
                min={10}
                max={100}
                valueLabelDisplay="on"
                valueLabelFormat={(number) => valueText(number)}
            />
        </Paper>

        <Typography
            sx={{
                position: 'absolute',
                top: 0,
                left: '1rem',
                transform: 'translateY(-50%)',
                px: 1,
                bgcolor: 'background.paper',
            }}
        >
            Kg base on my last record
        </Typography>
    </Box>;
}