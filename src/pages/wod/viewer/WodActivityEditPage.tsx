import {useRouteLoaderData} from "react-router-dom";
import {Wod} from "../../../model/wod/wod.ts";
import {ActivityContext, ActivityDisplay} from "../../../components/wod/activity/activity-display.tsx";
import {Activity} from "../../../model/wod/activity/activity.ts";
import {useState} from "react";
import {WOD_SERVICE} from "../../../services/wod-service.ts";

export const WodActivityEditPage = () => {
    const routeData = useRouteLoaderData('wod-details') as { wod: Wod };
    const [wod, setWod] = useState(routeData.wod);

    const parentActivityContext: ActivityContext = {
        editing: true,
        activity: undefined,
    };

    async function onUpdate(activity: Activity) {
        WOD_SERVICE.update(wod.updateActivity(activity))
            .then((wod) => setWod(wod));
        // TODO handle error + runner
    }

    return <>
        <ActivityDisplay activity={wod.activity} parentContext={parentActivityContext} onUpdate={onUpdate}/>
    </>;
}