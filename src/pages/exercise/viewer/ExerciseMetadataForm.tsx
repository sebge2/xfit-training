import {FormStack} from "../../../components/core/form/FormStack.tsx";
import {InputText} from "../../../components/core/form/InputText.tsx";
import {MeasureUnitField, MeasureUnitSelector} from "../../../components/activity/MeasureUnitSelector.tsx";
import {CategoryFormField, CategorySelector} from "../../../components/activity/CategorySelector.tsx";
import {ExerciseTagSelector} from "../../../components/activity/ExerciseTagSelector.tsx";
import {ActionsContainer} from "../../../components/core/interaction/ActionsContainer.tsx";
import {CancelFormButton} from "../../../components/core/form/CancelFormButton.tsx";
import {SaveFormButton} from "../../../components/core/form/SaveFormButton.tsx";
import {FormField} from "../../../model/core/form/form-field.ts";
import {MeasureUnit} from "../../../model/exercise/measure-unit.ts";
import {SubCategory} from "../../../model/exercise/sub-category.ts";
import {ExerciseTag} from "../../../model/exercise/exercise-tag.ts";
import {FormState} from "../../../model/core/form/form-state.ts";
import {validateRequiredFields} from "../../../utils/form-utils.ts";
import {useActionState} from "react";

export type ExerciseFormType = {
    nameField: FormField<string | undefined>,
    commentField: FormField<string | undefined>,
    measureUnitField: MeasureUnitField,
    categoryField: CategoryFormField,
    tagsField: FormField<ExerciseTag[]>,
}

export type ExerciseFormInitialValues = {
    name: string | undefined,
    comment: string | undefined,
    unit: MeasureUnit | undefined,
    subCategory: SubCategory | undefined,
    tags: ExerciseTag[],
}

type Props = {
    exercise: ExerciseFormInitialValues,
    onSave: (formData: FormData, form: ExerciseFormType) => Promise<void>,
    onCancel: () => void,
};

export function ExerciseMetadataForm({exercise, onSave: onSaveDelegate, onCancel: onCancelDelegate}: Props) {
    const nameField = new FormField<string | undefined>('name', 'Name', exercise.name, true);
    const commentField = new FormField<string | undefined>('comment', 'Comment', exercise.comment);
    const measureUnitField = new FormField<MeasureUnit | undefined>('measure-unit', 'Unit', exercise.unit, true);
    const categoryField = new FormField<SubCategory | undefined>('category', 'Category', exercise.subCategory, true);
    const tagsField = new FormField<ExerciseTag[]>('tags', 'Tags', exercise.tags, true);
    const originalFormState = FormState.create([nameField, commentField, measureUnitField, categoryField, tagsField]);

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
                    categoryField: categoryField,
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

            <CategorySelector formField={state.fieldById[categoryField.id] as CategoryFormField}/>

            <ExerciseTagSelector formField={state.fieldById[tagsField.id] as FormField<ExerciseTag[]>}/>
        </FormStack>

        <ActionsContainer>
            <CancelFormButton onCancel={onCancel}/>
            <SaveFormButton/>
        </ActionsContainer>
    </form>;
}