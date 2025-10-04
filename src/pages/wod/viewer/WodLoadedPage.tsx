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
            header: 'Activity',
            content: <WodRunnerPage/>,
            defaultSelected: false,
        },
        {
            header: 'Records',
            content: <WodRecords/>,
            defaultSelected: false,
        },
    ];
}