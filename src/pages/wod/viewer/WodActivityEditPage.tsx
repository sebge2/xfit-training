import {useRouteLoaderData} from "react-router-dom";
import {Wod} from "../../../model/wod/wod.ts";
import {ActivityDisplay} from "../../../components/wod/activity/activity-display.tsx";

export const WodActivityViewPage = () => {
    const routeData = useRouteLoaderData('wod-details') as { wod: Wod };
    const wod = routeData.wod;

    return <>
        <ActivityDisplay activity={wod.activity}/>
    </>;
}