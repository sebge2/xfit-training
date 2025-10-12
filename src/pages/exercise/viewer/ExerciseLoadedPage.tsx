import {Exercise} from "../../../model/exercise/exercise.ts";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {MeasureUnit} from "../../../model/exercise/measure-unit.ts";
import {ExerciseKilogramsLoadedPage} from "./ExerciseKilogramsLoadedPage.tsx";

type Props = {
    exercise: Exercise,
    records: UserExerciseRecords | undefined,
};


export function ExerciseLoadedPage({exercise, records}: Props) {
    switch (exercise.unit) {
        case MeasureUnit.KILOGRAMS: {
            return <ExerciseKilogramsLoadedPage exercise={exercise} records={records}/>;
        }
        case MeasureUnit.REPS:
        case MeasureUnit.TIME:
            return <></>
    }
}