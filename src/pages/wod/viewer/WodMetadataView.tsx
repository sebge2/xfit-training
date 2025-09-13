import {useRouteLoaderData} from "react-router-dom";
import {Wod} from "../../../model/wod/wod.ts";

export function WodMetadataView() {
    const routeData = useRouteLoaderData('wod-details') as { wod: Wod };
    const wod = routeData.wod;

    return <>
        {wod.name}
    </>;
}