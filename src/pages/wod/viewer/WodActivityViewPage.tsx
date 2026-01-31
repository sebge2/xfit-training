import {useRouteLoaderData} from "react-router-dom";
import {Wod} from "../../../model/wod/wod.ts";
import {ActivityContext, ActivityDisplay} from "../../../components/wod/activity/activity-display.tsx";

export const WodActivityViewPage = () => {
    const routeData = useRouteLoaderData('wod-details') as { wod: Wod };
    const wod = routeData.wod;

    const parentActivityContext: ActivityContext = {
        editing: false,
        activity: undefined,
    };

    return <>
        <ActivityDisplay activity={wod.activity} parentContext={parentActivityContext}/>
    </>;
}