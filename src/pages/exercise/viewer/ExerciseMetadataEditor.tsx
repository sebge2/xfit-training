import {useNavigate, useRouteLoaderData} from "react-router-dom";
import {Exercise} from "../../../model/exercise/exercise.ts";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {
    getExerciseTagsValue,
    getMeasureUnitValue,
    getSubCategoryValue,
    getTextValue
} from "../../../utils/form-utils.ts";
import {EXERCISE_SERVICE} from "../../../services/exercise-service.ts";
import {ExerciseFormType, ExerciseMetadataForm} from "./ExerciseMetadataForm.tsx";

export function ExerciseMetadataEditor() {
    const routeData = useRouteLoaderData('exercise-details') as { exercise: Exercise, records: UserExerciseRecords };
    const exercise = routeData.exercise;

    const navigate = useNavigate();

    async function onSave(formData: FormData, form: ExerciseFormType): Promise<void> {
        exercise.name = getTextValue(form.nameField, formData) as string;
        exercise.comment = getTextValue(form.commentField, formData);
        exercise.unit = getMeasureUnitValue(form.measureUnitField, formData);
        exercise.category = getSubCategoryValue(form.categoryField, formData).mainCategory;
        exercise.subCategory = getSubCategoryValue(form.categoryField, formData).subCategory;
        exercise.tags = getExerciseTagsValue(form.tagsField, formData);

        await EXERCISE_SERVICE.update(exercise); // TODO handle error

        navigate("..?tabIndex=0", {replace: true}); // TODO move to route utils
    }

    function onCancel() {
        navigate("..?tabIndex=0", {replace: true}); // TODO move to route utils
    }

    return <ExerciseMetadataForm exercise={exercise} onCancel={onCancel} onSave={onSave}/>;
}