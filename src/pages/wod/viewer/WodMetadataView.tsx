import {useNavigate, useRouteLoaderData} from "react-router-dom";
import {Wod} from "../../../model/wod/wod.ts";
import Box from "@mui/material/Box";
import {MEASURE_UNIT_LABELS} from "../../../model/exercise/measure-unit.ts";
import {AUTHENTICATION_SERVICE} from "../../../services/authentication-service.ts";
import {Permission} from "../../../model/auth/permission.ts";
import {EditButton} from "../../../components/core/buttton/EditButton.tsx";
import {DeleteButton} from "../../../components/core/buttton/DeleteButton.tsx";
import {WodTags} from "../../../components/activity/WodTags.tsx";
import {ActionsContainer} from "../../../components/core/interaction/ActionsContainer.tsx";

export function WodMetadataView() {
    const routeData = useRouteLoaderData('wod-details') as { wod: Wod };
    const wod = routeData.wod;

    const navigate = useNavigate();

    function onDelete() {
        // TODO
    }

    function onEdit() {
        navigate("./edit?tabIndex=0"); // TODO move to route utils
    }

    return <>
        {wod.name && <Box component="section">
            <h3>Name</h3>

            <p>{wod.name}</p>
        </Box>}
        {wod.comment && <Box component="section">
            <h3>Comment</h3>

            <p>{wod.comment}</p>
        </Box>}
        <Box component="section">
            <h3>Unit</h3>

            <p>{MEASURE_UNIT_LABELS[wod.unit]}</p>
        </Box>
        <Box component="section">
            <h3>Characteristics</h3>

            <WodTags tags={wod.tags}/>
        </Box>

        <ActionsContainer>
            {AUTHENTICATION_SERVICE.currentUserOrFail.hasPermission(Permission.DELETE_WOD) &&
                <DeleteButton confirmationText="Are you sure you want to delete this wod?"
                              onDelete={onDelete}/>}
            {AUTHENTICATION_SERVICE.currentUserOrFail.hasPermission(Permission.MODIFY_WOD) &&
                <EditButton onEdit={onEdit}/>}
        </ActionsContainer>
    </>;
}