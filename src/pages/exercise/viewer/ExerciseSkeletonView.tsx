import {ExerciseRecordsTabs} from "./ExerciseRecordsTabs.tsx";
import {createInfoTab, TabDescriptor} from "./tab-descriptor.tsx";

export function ExerciseSkeletonView() {
    const tabs: TabDescriptor[] = [
        createInfoTab(),
        {
            icon: undefined,
            label: `Loading`,
            content: undefined, // TODO
            defaultSelected: true,
        }
    ];

    return <ExerciseRecordsTabs tabs={tabs}/>;
}