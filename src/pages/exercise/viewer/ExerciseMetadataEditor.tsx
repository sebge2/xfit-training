import {useNavigate, useRouteLoaderData} from "react-router-dom";
import {Exercise} from "../../../model/exercise/exercise.ts";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {MeasureUnitSelector} from "../../../components/activity/MeasureUnitSelector.tsx";
import {CategorySelector} from "../../../components/activity/CategorySelector.tsx";
import {ExerciseTag} from "../../../model/exercise/exercise-tag.ts";
import {useActionState} from "react";
import {FormState} from "../../../model/core/form/form-state.ts";
import {InputText} from "../../../components/core/form/InputText.tsx";
import {
    getExerciseTagsValue,
    getMeasureUnitValue,
    getSubCategoryValue,
    getTextValue,
    validateRequiredFields
} from "../../../utils/form-utils.ts";
import {EXERCISE_SERVICE} from "../../../services/exercise-service.ts";
import {SaveFormButton} from "../../../components/core/form/SaveFormButton.tsx";
import {CancelFormButton} from "../../../components/core/form/CancelFormButton.tsx";
import {FormField} from "../../../model/core/form/form-field.ts";
import {MeasureUnit} from "../../../model/exercise/measure-unit.ts";
import {SubCategory} from "../../../model/exercise/sub-category.ts";
import {ExerciseTagSelector} from "../../../components/activity/ExerciseTagSelector.tsx";
import {ActionsContainer} from "../../../components/core/interaction/ActionsContainer.tsx";
import {FormStack} from "../../../components/core/form/FormStack.tsx";

export function ExerciseMetadataEditor() {
    const routeData = useRouteLoaderData('exercise-details') as { exercise: Exercise, records: UserExerciseRecords };
    const exercise = routeData.exercise;

    const navigate = useNavigate();

    const nameField = new FormField<string | undefined>('name', 'Name', exercise.name, true);
    const commentField = new FormField<string | undefined>('comment', 'Comment', exercise.comment);
    const measureUnitField = new FormField<MeasureUnit>('measure-unit', 'Unit', exercise.unit, true);
    const categoryField = new FormField<SubCategory>('category', 'Category', exercise.subCategory, true);
    const tagsField = new FormField<ExerciseTag[]>('tags', 'Tags', exercise.tags, true);
    const originalFormState = FormState.create([nameField, commentField, measureUnitField, categoryField, tagsField]);

    async function onSave(prev: FormState, formData: FormData): Promise<FormState> {
        const newState = prev.reset();

        validateRequiredFields(newState, formData);

        if (newState.isSuccessful) {
            exercise.name = getTextValue(nameField, formData) as string;
            exercise.comment = getTextValue(commentField, formData);
            exercise.unit = getMeasureUnitValue(measureUnitField, formData);
            exercise.subCategory = getSubCategoryValue(categoryField, formData);
            exercise.tags = getExerciseTagsValue(tagsField, formData);

            await EXERCISE_SERVICE.update(exercise); // TODO handle error

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

            <CategorySelector formField={categoryField}/>

            <ExerciseTagSelector formField={tagsField}/>
        </FormStack>

        <ActionsContainer>
            <CancelFormButton onCancel={onCancel}/>
            <SaveFormButton/>
        </ActionsContainer>
    </form>;
}