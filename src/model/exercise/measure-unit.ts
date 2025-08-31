export enum MeasureUnit {

    KILOGRAMS = 'KILOGRAMS',

    REPS = 'REPS',

    TIME = 'TIME',

}

export const MEASURE_UNIT_LABELS: { [key in MeasureUnit]: string } = {
    [MeasureUnit.KILOGRAMS]: 'Kilograms',
    [MeasureUnit.REPS]: 'REPS',
    [MeasureUnit.TIME]: 'Time',
}