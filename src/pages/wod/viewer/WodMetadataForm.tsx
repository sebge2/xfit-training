import {MeasureUnit} from "../../../model/exercise/measure-unit.ts";
import {WodTag} from "../../../model/wod/wod-tag.ts";
import {FormField} from "../../../model/core/form/form-field.ts";
import {MeasureUnitField, MeasureUnitSelector} from "../../../components/activity/MeasureUnitSelector.tsx";
import {FormState} from "../../../model/core/form/form-state.ts";
import {validateRequiredFields} from "../../../utils/form-utils.ts";
import {useActionState} from "react";
import {FormStack} from "../../../components/core/form/FormStack.tsx";
import {InputText} from "../../../components/core/form/InputText.tsx";
import {ActionsContainer} from "../../../components/core/interaction/ActionsContainer.tsx";
import {CancelFormButton} from "../../../components/core/form/CancelFormButton.tsx";
import {SaveFormButton} from "../../../components/core/form/SaveFormButton.tsx";
import {WodTagSelector} from "../../../components/activity/WodTagSelector.tsx";

export type WodFormType = {
    nameField: FormField<string | undefined>,
    commentField: FormField<string | undefined>,
    measureUnitField: MeasureUnitField,
    tagsField: FormField<WodTag[]>,
}

export type WodFormInitialValues = {
    name: string | undefined,
    comment: string | undefined,
    unit: MeasureUnit | undefined,
    tags: WodTag[],
}

type Props = {
    wod: WodFormInitialValues,
    onSave: (formData: FormData, form: WodFormType) => Promise<void>,
    onCancel: () => void,
};

export function WodMetadataForm({wod, onSave: onSaveDelegate, onCancel: onCancelDelegate}: Props) {
    const nameField = new FormField<string | undefined>('name', 'Name', wod.name, true);
    const commentField = new FormField<string | undefined>('comment', 'Comment', wod.comment);
    const measureUnitField = new FormField<MeasureUnit | undefined>('measure-unit', 'Unit', wod.unit, true);
    const tagsField = new FormField<WodTag[]>('tags', 'Tags', wod.tags, true);
    const originalFormState = FormState.create([nameField, commentField, measureUnitField, tagsField]);

    async function onSave(prev: FormState, formData: FormData): Promise<FormState> {
        const newState = prev.reset();

        validateRequiredFields(newState, formData);

        if (newState.isSuccessful) {
            await onSaveDelegate(
                formData,
                {
                    nameField: nameField,
                    commentField: commentField,
                    measureUnitField: measureUnitField,
                    tagsField: tagsField,
                }
            );
        }

        return newState;
    }

    function onCancel() {
        onCancelDelegate();
    }

    const [state, formAction] = useActionState<FormState, FormData>(onSave, originalFormState);

    return <form action={formAction}>
        <FormStack>
            <InputText formField={state.fieldById[nameField.id] as FormField<string | undefined>}/>

            <InputText formField={state.fieldById[commentField.id] as FormField<string | undefined>}/>

            <MeasureUnitSelector formField={state.fieldById[measureUnitField.id] as MeasureUnitField}/>

            <WodTagSelector formField={state.fieldById[tagsField.id] as FormField<WodTag[]>}/>
        </FormStack>

        <ActionsContainer>
            <CancelFormButton onCancel={onCancel}/>
            <SaveFormButton/>
        </ActionsContainer>
    </form>;
}