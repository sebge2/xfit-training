import {Slider} from '@mui/material';


type Props = {
    weight: number;
};

export function WeightCalculator({weight}: Props) {
    function valueText(value: number) {
        return `${value}% = ${(value / 100) * (weight || 0)} kg`;
    }

    const DEFAULT_VALUE = 80;

    return <Slider
        aria-label="Kilograms"
        defaultValue={DEFAULT_VALUE}
        getAriaValueText={valueText}
        sx={{width: '90%', marginLeft: '5%', marginRight: '5%'}}
        shiftStep={30}
        step={5}
        marks
        min={10}
        max={100}
        valueLabelDisplay="on"
        valueLabelFormat={(number) => valueText(number)}
    />;
}