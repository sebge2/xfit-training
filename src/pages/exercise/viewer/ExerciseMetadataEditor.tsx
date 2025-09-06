import {useNavigate, useRouteLoaderData} from "react-router-dom";
import Box from "@mui/material/Box";
import {Exercise} from "../../../model/exercise/exercise.ts";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {AUTHENTICATION_SERVICE} from "../../../services/authentication-service.ts";
import {Permission} from "../../../model/auth/permission.ts";


import {MeasureUnitSelector} from "../../../components/activity/MeasureUnitSelector.tsx";
import {CategorySelector} from "../../../components/activity/CategorySelector.tsx";
import {TagSelector} from "../../../components/activity/TagSelector.tsx";
import {EXERCISE_TAG_LABELS, ExerciseTag} from "../../../model/exercise/exercise-tag.ts";
import {useActionState} from "react";
import {FormState} from "../../../model/core/form/form-state.ts";
import {InputText} from "../../../components/core/form/InputText.tsx";
import Stack from '@mui/material/Stack';
import {FormField} from "../../../model/core/form/form-field.ts";
import {validateRequiredFields} from "../../../utils/form-utils.ts";
import {EXERCISE_SERVICE} from "../../../services/exercise-service.ts";
import {SaveFormButton} from "../../../components/core/form/SaveFormButton.tsx";
import {CancelFormButton} from "../../../components/core/form/CancelFormButton.tsx";

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

    const defaultState = FormState.create([
        new FormField(ExerciseFormFields.COMMENT, 'Comment', exercise.comment),
        new FormField(ExerciseFormFields.MEASURE_UNIT, 'Unit', exercise.unit, true),
        new FormField(ExerciseFormFields.CATEGORY, 'Category', exercise.subCategory, true),
        new FormField(ExerciseFormFields.TAGS, 'Tags', exercise.tags, true),
    ]);

    async function onSave(prev: FormState, formData: FormData): Promise<FormState> {
        const newState = prev.reset();

        validateRequiredFields(newState, formData);

        if (newState.isSuccessful) {
            await EXERCISE_SERVICE.update(exercise);
        }

        return newState;
    }

    const [formState, formAction] = useActionState<FormState, FormData>(onSave, defaultState);

    function onCancel() {
        navigate("..?tabIndex=0", {replace: true});
    }

    return <>
        <form action={formAction}>
            <Stack spacing={4}>
                <InputText formField={formState.fieldById[ExerciseFormFields.COMMENT]}/>

                <MeasureUnitSelector formField={formState.fieldById[ExerciseFormFields.MEASURE_UNIT]}/>

                <CategorySelector formField={formState.fieldById[ExerciseFormFields.CATEGORY]}/>

                <TagSelector<ExerciseTag> formField={formState.fieldById[ExerciseFormFields.TAGS]}
                                          availableTags={Object.keys(ExerciseTag).map(tag => tag as ExerciseTag)}
                                          labelMaker={(tag) => EXERCISE_TAG_LABELS[tag]}/>
            </Stack>

            {AUTHENTICATION_SERVICE.currentUserOrFail.hasPermission(Permission.MODIFY_EXERCISE) &&
                <Box component="section">
                    <Box sx={{display: 'flex', gap: '2rem', marginTop: '2rem'}}>
                        <CancelFormButton onCancel={onCancel}/>
                        <SaveFormButton/>
                    </Box>
                </Box>}
        </form>
    </>;
}