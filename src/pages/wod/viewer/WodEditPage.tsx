import {TabDescriptor} from "../../../model/core/structure/tab-descriptor.tsx";
import {Tabs} from "../../../components/core/structure/Tabs.tsx";
import {WodRecords} from "./WodRecords.tsx";
import InfoIcon from "@mui/icons-material/Info";
import {WodMetadataEditor} from "./WodMetadataEditor.tsx";
import {WodActivityViewPage} from "./WodActivityEditPage.tsx";

export function WodEditPage() {
    const tabs: TabDescriptor[] = generateTabs();

    return <Tabs tabs={tabs}/>;
}

function generateTabs(): TabDescriptor[] {
    return [
        {
            header: <InfoIcon/>,
            content: <WodMetadataEditor/>,
            defaultSelected: true,
        },
        {
            header: 'Activity',
            content: <WodActivityViewPage/>,
            defaultSelected: false,
        },
        {
            header: 'Records',
            content: <WodRecords/>,
            defaultSelected: false,
        },
    ];
}