import {Exercise} from "../../../model/exercise/exercise.ts";
import {ExerciseRecordsTabs} from "./ExerciseRecordsTabs.tsx";
import {createInfoTab} from "./tab-descriptor.tsx";

type ExerciseRecordsSkeletonProps = {
    exercise: Exercise,
};

export function ExerciseRecordsSkeleton({exercise}: ExerciseRecordsSkeletonProps) {
    const tabs: TabDescriptor[] = [
        createInfoTab(exercise),
        {
            icon: undefined,
            label: `Loading`,
            content: undefined, // TODO
            default: true,
        }
    ];

    return <ExerciseRecordsTabs tabs={tabs}/>;
}