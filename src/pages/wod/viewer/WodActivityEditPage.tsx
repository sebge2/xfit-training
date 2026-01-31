import {useRouteLoaderData} from "react-router-dom";
import {Wod} from "../../../model/wod/wod.ts";
import {ActivityContext, ActivityDisplay} from "../../../components/wod/activity/activity-display.tsx";
import {Activity} from "../../../model/wod/activity/activity.ts";
import {useState} from "react";

export const WodActivityViewPage = () => {
    const routeData = useRouteLoaderData('wod-details') as { wod: Wod };
    const [wod, setWod] = useState(routeData.wod);

    const parentActivityContext: ActivityContext = {
        editing: true,
        activity: undefined,
    };

    function onUpdate(activity: Activity) {
        setWod(wod.updateActivity(activity));
    }

    return <>
        <ActivityDisplay activity={wod.activity} parentContext={parentActivityContext} onUpdate={onUpdate}/>
    </>;
}