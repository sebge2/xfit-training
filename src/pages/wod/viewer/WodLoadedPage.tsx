import {createInfoTab, TabDescriptor} from "../../../model/core/structure/tab-descriptor.tsx";
import {Tabs} from "../../../components/core/structure/Tabs.tsx";
import WodRunnerPage from "../runner/WodRunnerPage.tsx";
import {WodRecords} from "./WodRecords.tsx";

export function WodLoadedPage() {
    const tabs: TabDescriptor[] = generateTabs();

    return <Tabs tabs={tabs}/>;
}

function generateTabs(): TabDescriptor[] {
    return [
        createInfoTab(true),
        {
            label: 'Activity',
            icon: undefined,
            content: <WodRunnerPage/>,
            defaultSelected: false,
        },
        {
            label: 'Records',
            icon: undefined,
            content: <WodRecords/>,
            defaultSelected: false,
        },
    ];
}