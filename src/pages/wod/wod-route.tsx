import {RouteObject} from "react-router";
import {WOD_SERVICE} from "../../services/wod-service.ts";
import WodSearchPage from "./wods/WodSearchPage.tsx";
import {Wod} from "../../model/wod/wod.ts";
import {Params} from "../../App.tsx";
import {WodMetadataCreator} from "./viewer/WodMetadataCreator.tsx";
import {WodViewPage} from "./viewer/WodViewPage.tsx";
import {WodEditPage} from "./viewer/WodEditPage.tsx";

export const WOD_ROUTE: RouteObject = {
    path: 'wods',
    handle: {pageName: 'Workouts'},
    children: [
        {
            index: true,
            loader: () => {
                return {
                    wods: WOD_SERVICE.findAll()
                }
            },
            element: <WodSearchPage/>
        },
        {
            id: 'wod-details',
            path: ':id',
            loader: async ({params}: { params: Params }) => {
                return {
                    wod: await WOD_SERVICE.findById(params.id as string)
                }
            },
            handle: {
                pageName: ({data}: { data: { wod: Wod } }) => data?.wod?.name,
            },
            children: [
                {
                    index: true,
                    element: <WodViewPage/>,
                },
                {
                    path: 'edit',
                    element: <WodEditPage/>,
                }
            ]
        },
        {
            id: 'wod-new',
            path: 'new',
            handle: {
                pageName: 'New',
            },
            element: <WodMetadataCreator/>,
        }
    ]
};