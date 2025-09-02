import {Exercise} from "../../../model/exercise/exercise.ts";
import {ExerciseRecordsTabs} from "./ExerciseRecordsTabs.tsx";
import {createInfoTab, TabDescriptor} from "./tab-descriptor.tsx";

type ExerciseRecordsSkeletonProps = {
    exercise: Exercise,
};

export function ExerciseSkeletonView({exercise}: ExerciseRecordsSkeletonProps) {
    const tabs: TabDescriptor[] = [
        createInfoTab(exercise),
        {
            icon: undefined,
            label: `Loading`,
            content: undefined, // TODO
            defaultSelected: true,
        }
    ];

    return <ExerciseRecordsTabs tabs={tabs}/>;
}