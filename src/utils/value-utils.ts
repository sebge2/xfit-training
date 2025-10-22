import {MeasureUnit} from "../model/exercise/measure-unit.ts";

export function formatValue(value: number, unit: MeasureUnit): string {
    switch (unit) {
        case MeasureUnit.KILOGRAMS:
            return `${value} kg`;
        case MeasureUnit.REPS:
            return `${value} reps`;
        case MeasureUnit.TIME: {
            const minutes = Math.floor(value / 60);
            const seconds = Math.floor(value % 60);
            const secondsPadded = String(seconds).padStart(2, '0');

            return `${minutes}m:${secondsPadded}s`;
        }
        default:
            throw new Error(`Unknown unit: ${unit}`);
    }
}