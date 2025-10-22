import {UserExerciseGroupRecords} from "../../../../model/record/user-exercise-group-records.tsx";
import {LineChart} from '@mui/x-charts/LineChart';
import {formatDateYYYYMMDD} from "../../../../utils/date-utils.ts";
import {MeasureUnit} from "../../../../model/exercise/measure-unit.ts";
import {formatValue} from "../../../../utils/value-utils.ts";

type Props = {
    records: UserExerciseGroupRecords,
    unit: MeasureUnit,
};

export function ExerciseRecordsEvolution({records, unit}: Props) {
    type Point = {
        epoch: number;
        recordValue: number;
    };

    const data: Point[] = records.records
        .map((record) => ({epoch: record.date.getTime(), recordValue: record.value}));

    const formatSeriesValue = (value: number) => {
        return formatValue(value, unit);
    };

    return (
        <LineChart
            series={[{dataKey: 'recordValue', valueFormatter: (number) => formatSeriesValue(number as number)}]}
            xAxis={[
                {
                    dataKey: 'epoch',
                    valueFormatter: (value: number) => formatDateYYYYMMDD(new Date(value)),
                },
            ]}
            yAxis={[{ valueFormatter: formatSeriesValue }]}
            height={320}
            dataset={data}
        />
    );

}