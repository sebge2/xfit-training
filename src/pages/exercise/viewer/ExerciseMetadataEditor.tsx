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
import {EXERCISE_TAG_LABELS, ExerciseTag} from "../../../model/exercise/exercise-tag.ts";
import {useActionState} from "react";
import {FormValidationState} from "../../../model/core/form/form-validation-state.ts";
import {InputText} from "../../../components/core/form/InputText.tsx";

enum ExerciseFormFields {

    COMMENT = 'comment',

    MEASURE_UNIT = 'measure-unit',

    CATEGORY = 'category',

    TAGS = 'tags',
}

export function ExerciseMetadataEditor() {
    const routeData = useRouteLoaderData('exercise-details') as { exercise: Exercise, records: UserExerciseRecords };
    const exercise = routeData.exercise;

    const navigate = useNavigate();

    function onSave(prev: FormValidationState, formData: FormData): FormValidationState {
        console.log(prev);
        console.log((formData as FormData).get('comment'));
        console.log((formData as FormData).get('measure-unit'));
        console.log((formData as FormData).get('category'));
        console.log((formData as FormData).get('tags'));

        return FormValidationState.empty();
    }

    const [formState, formAction, saving] = useActionState<FormValidationState, FormData>(onSave, FormValidationState.empty());

    console.log(formState);


    function onCancel() {
        navigate("..?tabIndex=0", {replace: true});
    }

    return <>
        <form action={formAction}>
            <Box component="section">
                <h3>Comment</h3>

                <InputText id={ExerciseFormFields.COMMENT} originalValue={exercise.comment} onChange={(_) => {}} />
            </Box>

            <Box component="section">
                <h3>Unit</h3>

                <div>
                    <MeasureUnitSelector id={ExerciseFormFields.MEASURE_UNIT} originalValue={exercise.unit} onChange={(_) => {
                    }}/>
                </div>
            </Box>

            <Box component="section">
                <h3>Categorization</h3>

                <div>
                    <CategorySelector id={ExerciseFormFields.CATEGORY} originalValue={exercise.subCategory} onChange={(_) => {
                    }}/>
                </div>
            </Box>
            <Box component="section">
                <h3>Characteristics</h3>

                <TagSelector<ExerciseTag> id={ExerciseFormFields.TAGS}
                                          originalValues={exercise.tags}
                                          availableTags={Object.keys(ExerciseTag).map(tag => tag as ExerciseTag)}
                                          required={true}
                                          labelMaker={(tag) => EXERCISE_TAG_LABELS[tag]}/>
            </Box>

            {AUTHENTICATION_SERVICE.currentUserOrFail.hasPermission(Permission.MODIFY_EXERCISE) &&
                <Box component="section">
                    <Box sx={{display: 'flex', gap: '2rem', marginTop: '2rem'}}>
                        <Button variant="outlined" color="primary" startIcon={<CancelIcon/>} onClick={onCancel}
                                disabled={saving}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="success" startIcon={<SaveIcon/>} type="submit"
                                loading={saving} disabled={saving}>
                            Save
                        </Button>
                    </Box>
                </Box>}
        </form>
    </>;
}