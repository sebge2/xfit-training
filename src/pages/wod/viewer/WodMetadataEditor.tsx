import {useNavigate, useRouteLoaderData} from "react-router-dom";
import {Wod} from "../../../model/wod/wod.ts";
import {FormField} from "../../../model/core/form/form-field.ts";
import {MeasureUnit} from "../../../model/exercise/measure-unit.ts";
import {FormState} from "../../../model/core/form/form-state.ts";
import {getMeasureUnitValue, getTextValue, getWodTagsValue, validateRequiredFields} from "../../../utils/form-utils.ts";
import {useActionState} from "react";
import {FormStack} from "../../../components/core/form/FormStack.tsx";
import {InputText} from "../../../components/core/form/InputText.tsx";
import {MeasureUnitSelector} from "../../../components/activity/MeasureUnitSelector.tsx";
import {ActionsContainer} from "../../../components/core/interaction/ActionsContainer.tsx";
import {CancelFormButton} from "../../../components/core/form/CancelFormButton.tsx";
import {SaveFormButton} from "../../../components/core/form/SaveFormButton.tsx";
import {WodTag} from "../../../model/wod/wod-tag.ts";
import {WodTagSelector} from "../../../components/activity/WodTagSelector.tsx";

export function WodMetadataEditor() {
    const routeData = useRouteLoaderData('wod-details') as { wod: Wod };
    const wod = routeData.wod;

    const navigate = useNavigate();

    const nameField = new FormField<string | undefined>('name', 'Name', wod.name, true);
    const commentField = new FormField<string | undefined>('comment', 'Comment', wod.comment);
    const measureUnitField = new FormField<MeasureUnit>('measure-unit', 'Unit', wod.unit, true);
    const tagsField = new FormField<WodTag[]>('tags', 'Tags', wod.tags, true);
    const originalFormState = FormState.create([nameField, commentField, measureUnitField, tagsField]);

    async function onSave(prev: FormState, formData: FormData): Promise<FormState> {
        const newState = prev.reset();

        validateRequiredFields(newState, formData);

        if (newState.isSuccessful) {
            wod.name = getTextValue(nameField, formData) as string;
            wod.comment = getTextValue(commentField, formData);
            wod.unit = getMeasureUnitValue(measureUnitField, formData);
            wod.tags = getWodTagsValue(tagsField, formData);

            //await EXERCISE_SERVICE.update(exercise); // TODO handle error

            navigate("..?tabIndex=0", {replace: true}); // TODO move to route utils
        }

        return newState;
    }

    function onCancel() {
        navigate("..?tabIndex=0", {replace: true}); // TODO move to route utils
    }

    const [, formAction] = useActionState<FormState, FormData>(onSave, originalFormState);

    return <form action={formAction}>
        <FormStack>
            <InputText formField={nameField}/>

            <InputText formField={commentField}/>

            <MeasureUnitSelector formField={measureUnitField}/>

            <WodTagSelector formField={tagsField}/>
        </FormStack>

        <ActionsContainer>
            <CancelFormButton onCancel={onCancel}/>
            <SaveFormButton/>
        </ActionsContainer>
    </form>;
}