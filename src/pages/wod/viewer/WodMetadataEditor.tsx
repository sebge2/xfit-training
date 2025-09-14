import {useRouteLoaderData} from "react-router-dom";
import {Wod} from "../../../model/wod/wod.ts";

export function WodMetadataEditor() {
    const routeData = useRouteLoaderData('wod-details') as { wod: Wod };
    const wod = routeData.wod;

    return <>
        edit:
        {wod.name}
        {wod.comment}
        {wod.tags}
    </>;
}