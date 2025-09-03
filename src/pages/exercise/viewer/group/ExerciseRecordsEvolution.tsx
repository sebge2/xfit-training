import {UserExerciseGroupRecords} from "../../../../model/record/user-exercise-group-records.tsx";
import {LineChart} from '@mui/x-charts/LineChart';
import {formatDateYYYYMMDD} from "../../../../utils/date-utils.ts";

type Props = {
    records: UserExerciseGroupRecords,
};

export function ExerciseRecordsEvolution({records}: Props) {
    type Point = {
        epoch: number;
        recordValue: number;
    };

    const data: Point[] = records.records
        .map((record) => ({epoch: record.date.getTime(), recordValue: record.value}));

    return (
        <LineChart
            series={[{dataKey: 'recordValue'}]}
            xAxis={[
                {
                    dataKey: 'epoch',
                    valueFormatter: (value: number) => formatDateYYYYMMDD(new Date(value)),
                },
            ]}
            height={320}
            dataset={data}
        />
    );

}