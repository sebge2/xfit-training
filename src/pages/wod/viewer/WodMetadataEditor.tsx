import {useNavigate, useRouteLoaderData} from "react-router-dom";
import {Wod} from "../../../model/wod/wod.ts";
import {getMeasureUnitValue, getTextValue, getWodTagsValue} from "../../../utils/form-utils.ts";
import {WOD_SERVICE} from "../../../services/wod-service.ts";
import {WodFormType, WodMetadataForm} from "./WodMetadataForm.tsx";

export function WodMetadataEditor() {
    const routeData = useRouteLoaderData('wod-details') as { wod: Wod };
    const wod = routeData.wod;

    const navigate = useNavigate();

    async function onSave(formData: FormData, form: WodFormType): Promise<void> {
        wod.name = getTextValue(form.nameField, formData) as string;
        wod.comment = getTextValue(form.commentField, formData);
        wod.unit = getMeasureUnitValue(form.measureUnitField, formData);
        wod.tags = getWodTagsValue(form.tagsField, formData);

        await WOD_SERVICE.update(wod); // TODO handle error

        navigate("..?tabIndex=0", {replace: true}); // TODO move to route utils
    }

    function onCancel() {
        navigate("..?tabIndex=0", {replace: true}); // TODO move to route utils
    }

    return <WodMetadataForm wod={wod} onSave={onSave} onCancel={onCancel}/>
}