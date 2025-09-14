import {RouteObject} from "react-router";
import {WOD_SERVICE} from "../../services/wod-service.ts";
import WodSearchPage from "./wods/WodSearchPage.tsx";
import {Wod} from "../../model/wod/wod.ts";
import WodPage from "./viewer/WodPage.tsx";
import {WodMetadataView} from "./viewer/WodMetadataView.tsx";
import {WodMetadataEditor} from "./viewer/WodMetadataEditor.tsx";
import {Params} from "../../App.tsx";

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
            element: <WodPage/>,
            children: [
                {
                    index: true,
                    element: <WodMetadataView/>,
                },
                {
                    path: 'edit',
                    element: <WodMetadataEditor/>,
                }
            ]
        },
    ]
};