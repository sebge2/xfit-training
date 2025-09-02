import {Exercise} from "../../../model/exercise/exercise.ts";
import {ExerciseTags} from "../../../components/activity/ExerciseTags.tsx";
import Box from "@mui/material/Box";

type ExerciseDetailsViewProps = {
    exercise: Exercise
};

export function ExerciseMetadataView({exercise}: ExerciseDetailsViewProps) {
    return <>
        <Box component="section" sx={{m: 2}}>
            <p>{exercise.comment}</p>
        </Box>
        {/*<div>{exercise.name}</div>*/}
        {/*<div>Unit: {exercise.unit}*/}
        {/*    /!*<MeasureUnitSelector originalValue={exercise.unit} id="measure-unit" />*!/*/}
        {/*</div>*/}
        {/*<div>Location: {MAIN_CATEGORY_LABELS[exercise.category]} &gt; {SUB_CATEGORY_LABELS[exercise.subCategory]}*/}
        {/*    /!*<CategorySelector originalValue={exercise.subCategory} />*!/*/}
        {/*</div>*/}
        <Box component="section" sx={{m: 2}}>
            <ExerciseTags tags={exercise.tags}/>

            {/*<TagSelector<ExerciseTag> id="tags"*/}
            {/*                          originalValues={exercise.tags}*/}
            {/*                          availableTags={Object.keys(ExerciseTag).map(tag => tag as ExerciseTag)}*/}
            {/*                          labelMaker={(tag) => EXERCISE_TAG_LABELS[tag]}/>*/}
        </Box>
    </>;
}