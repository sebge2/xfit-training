import {TabDescriptor} from "../../../model/core/structure/tab-descriptor.tsx";
import {Tabs} from "../../../components/core/structure/Tabs.tsx";
import WodRunnerPage from "../runner/WodRunnerPage.tsx";
import {WodRecords} from "./WodRecords.tsx";
import InfoIcon from "@mui/icons-material/Info";
import {WodMetadataView} from "./WodMetadataView.tsx";

export function WodViewPage() {
    const tabs: TabDescriptor[] = generateTabs();

    return <Tabs tabs={tabs}/>;
}

function generateTabs(): TabDescriptor[] {
    return [
        {
            header: <InfoIcon/>,
            content: <WodMetadataView/>,
            defaultSelected: true,
        },
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