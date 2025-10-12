import {useNavigate} from "react-router-dom";
import {ExerciseFormInitialValues, ExerciseFormType, ExerciseMetadataForm} from "./ExerciseMetadataForm.tsx";
import {Exercise} from "../../../model/exercise/exercise.ts";
import {
    getExerciseTagsValue,
    getMeasureUnitValue,
    getSubCategoryValue,
    getTextValue
} from "../../../utils/form-utils.ts";
import {EXERCISE_SERVICE} from "../../../services/exercise-service.ts";
import Box from "@mui/material/Box";

export function ExerciseMetadataCreator() {
    const navigate = useNavigate();
    const exercise: ExerciseFormInitialValues = {
        name: undefined,
        comment: undefined,
        category: undefined,
        subCategory: undefined,
        unit: undefined,
        tags: [],
    };

    async function onSave(formData: FormData, form: ExerciseFormType): Promise<void> {
        const exercise = new Exercise(
            null,
            getTextValue(form.nameField, formData) as string,
            getSubCategoryValue(form.categoryField, formData).mainCategory,
            getSubCategoryValue(form.categoryField, formData).subCategory,
            getExerciseTagsValue(form.tagsField, formData),
            getMeasureUnitValue(form.measureUnitField, formData),
            getTextValue(form.commentField, formData),
        );

        await EXERCISE_SERVICE.create(exercise); // TODO handle error

        navigate(`../${exercise.id}?tabIndex=0`, {replace: true}); // TODO move to route utils
    }

    function onCancel() {
        navigate("..", {replace: true}); // TODO move to route utils
    }

    return <Box sx={{m: '1rem'}}>
        <ExerciseMetadataForm exercise={exercise} onCancel={onCancel} onSave={onSave}/>
    </Box>;
}