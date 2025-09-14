import {useNavigate} from "react-router-dom";
import {ExerciseFormType, ExerciseMetadataForm} from "./ExerciseMetadataForm.tsx";
import {Exercise} from "../../../model/exercise/exercise.ts";

export function ExerciseMetadataCreator() {
    const navigate = useNavigate();
    const exercise = Exercise.empty();

    async function onSave(formData: FormData, form: ExerciseFormType): Promise<void> {
        console.log(formData);
        console.log(form);
        // exercise.name = getTextValue(form.nameField, formData) as string;
        // exercise.comment = getTextValue(form.commentField, formData);
        // exercise.unit = getMeasureUnitValue(form.measureUnitField, formData);
        // exercise.subCategory = getSubCategoryValue(form.categoryField, formData);
        // exercise.tags = getExerciseTagsValue(form.tagsField, formData);

        //await EXERCISE_SERVICE.update(exercise); // TODO handle error

        //navigate("..?tabIndex=0", {replace: true}); // TODO move to route utils
    }

    function onCancel() {
        navigate("..", {replace: true}); // TODO move to route utils
    }

    return <ExerciseMetadataForm exercise={exercise} onCancel={onCancel} onSave={onSave}/>;
}