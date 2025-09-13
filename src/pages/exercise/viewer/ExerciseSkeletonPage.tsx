import {createInfoTab, TabDescriptor} from "../../../model/core/structure/tab-descriptor.tsx";
import {Tabs} from "../../../components/core/structure/Tabs.tsx";

export function ExerciseSkeletonPage() {
    const tabs: TabDescriptor[] = [
        createInfoTab(),
        {
            icon: undefined,
            label: `Loading`,
            content: undefined, // TODO
            defaultSelected: true,
        }
    ];

    return <Tabs tabs={tabs}/>;
}