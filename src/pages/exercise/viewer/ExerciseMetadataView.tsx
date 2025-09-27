import {Exercise} from "../../../model/exercise/exercise.ts";
import {ExerciseTags} from "../../../components/activity/ExerciseTags.tsx";
import Box from "@mui/material/Box";
import {MAIN_CATEGORY_LABELS} from "../../../model/exercise/main-category.ts";
import {SUB_CATEGORY_LABELS} from "../../../model/exercise/sub-category.ts";
import {MEASURE_UNIT_LABELS} from "../../../model/exercise/measure-unit.ts";
import {AUTHENTICATION_SERVICE} from "../../../services/authentication-service.ts";
import {Permission} from "../../../model/auth/permission.ts";
import {useNavigate, useRouteLoaderData} from "react-router-dom";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {EditButton} from "../../../components/core/buttton/EditButton.tsx";
import {DeleteButton} from "../../../components/core/buttton/DeleteButton.tsx";
import {ActionsContainer} from "../../../components/core/interaction/ActionsContainer.tsx";
import {EXERCISE_SERVICE} from "../../../services/exercise-service.ts";

export function ExerciseMetadataView() {
    const routeData = useRouteLoaderData('exercise-details') as { exercise: Exercise, records: UserExerciseRecords };
    const exercise = routeData.exercise;

    const navigate = useNavigate();

    async function onDelete() {
        await EXERCISE_SERVICE.delete(exercise.id as string);
        navigate("../"); // TODO move to route utils
    }

    function onEdit() {
        navigate("./edit?tabIndex=0"); // TODO move to route utils
    }

    return <>
        {exercise.name && <Box component="section">
            <h3>Name</h3>

            <p>{exercise.name}</p>
        </Box>}
        {exercise.comment && <Box component="section">
            <h3>Comment</h3>

            <p>{exercise.comment}</p>
        </Box>}
        <Box component="section">
            <h3>Unit</h3>

            <p>{MEASURE_UNIT_LABELS[exercise.unit]}</p>
        </Box>

        <Box component="section">
            <h3>Categorization</h3>

            <p>{MAIN_CATEGORY_LABELS[exercise.category]} &gt; {SUB_CATEGORY_LABELS[exercise.subCategory]}</p>
        </Box>
        <Box component="section">
            <h3>Characteristics</h3>

            <ExerciseTags tags={exercise.tags}/>
        </Box>

        <ActionsContainer>
            {AUTHENTICATION_SERVICE.currentUserOrFail.hasPermission(Permission.DELETE_EXERCISE) &&
                <DeleteButton confirmationText="Are you sure you want to delete this exercise?"
                              onDelete={onDelete}/>}
            {AUTHENTICATION_SERVICE.currentUserOrFail.hasPermission(Permission.MODIFY_EXERCISE) &&
                <EditButton onEdit={onEdit}/>}
        </ActionsContainer>
    </>;
}