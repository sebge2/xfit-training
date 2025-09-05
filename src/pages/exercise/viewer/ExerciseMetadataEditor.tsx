import {useNavigate, useRouteLoaderData} from "react-router-dom";
import Box from "@mui/material/Box";
import {Exercise} from "../../../model/exercise/exercise.ts";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {Button} from "@mui/material";
import {AUTHENTICATION_SERVICE} from "../../../services/authentication-service.ts";
import {Permission} from "../../../model/auth/permission.ts";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import {MeasureUnitSelector} from "../../../components/activity/MeasureUnitSelector.tsx";
import {CategorySelector} from "../../../components/activity/CategorySelector.tsx";
import {TagSelector} from "../../../components/activity/TagSelector.tsx";
import {EXERCISE_TAG_LABELS, ExerciseTag} from "../../../model/exercise/exercise-tag.tsx";

export function ExerciseMetadataEditor() {
    const routeData = useRouteLoaderData('exercise-details') as { exercise: Exercise, records: UserExerciseRecords };
    const exercise = routeData.exercise;

    const navigate = useNavigate();

    function onCancel() {
        navigate("..?tabIndex=0", {replace: true});
    }

    function onSave() {
        // TODO
    }

    return <>
        <Box component="section">
            <h3>Comment</h3>

            <p>{exercise.comment}</p>
        </Box>

        <Box component="section">
            <h3>Unit</h3>

            <div>
                <MeasureUnitSelector id="measure-unit" originalValue={exercise.unit} onChange={(_) => {
                }}/>
            </div>
        </Box>

        <Box component="section">
            <h3>Categorization</h3>

            <div>
                <CategorySelector id="category" originalValue={exercise.subCategory} onChange={(_) => {
                }}/>
            </div>
        </Box>
        <Box component="section">
            <h3>Characteristics</h3>

            <TagSelector<ExerciseTag> id="tags"
                                      originalValues={exercise.tags}
                                      availableTags={Object.keys(ExerciseTag).map(tag => tag as ExerciseTag)}
                                      labelMaker={(tag) => EXERCISE_TAG_LABELS[tag]}/>
        </Box>
        {AUTHENTICATION_SERVICE.currentUserOrFail.hasPermission(Permission.MODIFY_EXERCISE) &&
            <Box component="section">
                <h3>Admin</h3>

                <Box sx={{display: 'flex', gap: 2}}>
                    <Button variant="outlined" color="primary" startIcon={<CancelIcon/>} onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="success" startIcon={<SaveIcon/>} onClick={onSave}>
                        Save
                    </Button>
                </Box>
            </Box>}
    </>;
}