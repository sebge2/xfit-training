import {Exercise} from "../../../model/exercise/exercise.ts";
import {ExerciseTags} from "../../../components/activity/ExerciseTags.tsx";
import Box from "@mui/material/Box";
import {MAIN_CATEGORY_LABELS} from "../../../model/exercise/main-category.ts";
import {SUB_CATEGORY_LABELS} from "../../../model/exercise/sub-category.ts";
import {MEASURE_UNIT_LABELS} from "../../../model/exercise/measure-unit.ts";
import {Button} from "@mui/material";
import {AUTHENTICATION_SERVICE} from "../../../services/authentication-service.ts";
import {Permission} from "../../../model/auth/permission.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate, useRouteLoaderData} from "react-router-dom";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";

export function ExerciseMetadataView() {
    const routeData = useRouteLoaderData('exercise-details') as { exercise: Exercise, records: UserExerciseRecords };
    const exercise = routeData.exercise;

    const navigate = useNavigate();

    function onDelete(){
        // TODO
    }

    function onEdit(){
        navigate("./edit?tabIndex=0");
    }

    return <>
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
            {AUTHENTICATION_SERVICE.currentUserOrFail.hasPermission(Permission.MODIFY_EXERCISE, Permission.DELETE_EXERCISE) &&
                <Box component="section">
                    <Box sx={{display: 'flex', gap: '2rem', marginTop: '2rem'}}>
                        {AUTHENTICATION_SERVICE.currentUserOrFail.hasPermission(Permission.DELETE_EXERCISE) &&
                            <Button variant="outlined" color="error" startIcon={<DeleteIcon/>} onClick={onDelete}>
                                Delete
                            </Button>}
                        {AUTHENTICATION_SERVICE.currentUserOrFail.hasPermission(Permission.MODIFY_EXERCISE) &&
                            <Button variant="contained" startIcon={<EditIcon/>} onClick={onEdit}>
                                Edit
                            </Button>}
                    </Box>
                </Box>}
    </>;
}