import {WodFormType, WodFormInitialValues, WodMetadataForm} from "./WodMetadataForm.tsx";
import {useNavigate} from "react-router-dom";
import {WOD_SERVICE} from "../../../services/wod-service.ts";
import {Wod} from "../../../model/wod/wod.ts";
import {
    getWodTagsValue,
    getMeasureUnitValue,
    getTextValue
} from "../../../utils/form-utils.ts";
import Box from "@mui/material/Box";
import {Rest} from "../../../model/wod/rest.ts";
import {Duration} from "../../../model/wod/activity/duration.ts";

export function WodMetadataCreator() {
    const navigate = useNavigate();
    const wod: WodFormInitialValues = {
        name: undefined,
        comment: undefined,
        unit: undefined,
        tags: [],
    };

    async function onSave(formData: FormData, form: WodFormType): Promise<void> {
        const wod = new Wod(
            null,
            new Rest(new Duration(1), null),
            getTextValue(form.nameField, formData) as string,
            getMeasureUnitValue(form.measureUnitField, formData),
            getWodTagsValue(form.tagsField, formData),
            getTextValue(form.commentField, formData),
        );

        await WOD_SERVICE.create(wod); // TODO handle error

        navigate(`../${wod.id}?tabIndex=0`, {replace: true}); // TODO move to route utils
    }

    function onCancel() {
        navigate("..", {replace: true}); // TODO move to route utils
    }

    return <Box sx={{m: '1rem'}}>
        <WodMetadataForm wod={wod} onSave={onSave} onCancel={onCancel}/>
    </Box>;
}