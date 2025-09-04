import {Exercise} from "../../../model/exercise/exercise.ts";
import {ExerciseTags} from "../../../components/activity/ExerciseTags.tsx";
import Box from "@mui/material/Box";
import {MAIN_CATEGORY_LABELS} from "../../../model/exercise/main-category.ts";
import {SUB_CATEGORY_LABELS} from "../../../model/exercise/sub-category.ts";
import {MEASURE_UNIT_LABELS} from "../../../model/exercise/measure-unit.ts";

type ExerciseDetailsViewProps = {
    exercise: Exercise
};

export function ExerciseMetadataView({exercise}: ExerciseDetailsViewProps) {
    return <>
        {exercise.comment && <Box component="section">
            <h3>Comment</h3>

            <p>{exercise.comment}</p>
        </Box>}

        <Box component="section">
            <h3>Unit</h3>

            <p>{MEASURE_UNIT_LABELS[exercise.unit]}</p>
        </Box>

        {/*<div>Unit: {exercise.unit}*/}
        {/*    /!*<MeasureUnitSelector originalValue={exercise.unit} id="measure-unit" />*!/*/}
        {/*</div>*/}

        <Box component="section">
            <h3>Categorization</h3>

            <p>{MAIN_CATEGORY_LABELS[exercise.category]} &gt; {SUB_CATEGORY_LABELS[exercise.subCategory]}</p>
            {/*    /!*<CategorySelector originalValue={exercise.subCategory} />*!/*/}
            {/*</div>*/}
        </Box>
        <Box component="section">
            <h3>Characteristics</h3>

            <ExerciseTags tags={exercise.tags}/>

            {/*<TagSelector<ExerciseTag> id="tags"*/}
            {/*                          originalValues={exercise.tags}*/}
            {/*                          availableTags={Object.keys(ExerciseTag).map(tag => tag as ExerciseTag)}*/}
            {/*                          labelMaker={(tag) => EXERCISE_TAG_LABELS[tag]}/>*/}
        </Box>
    </>;
}