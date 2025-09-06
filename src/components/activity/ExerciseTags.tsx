import {EXERCISE_TAG_LABELS, ExerciseTag} from "../../model/exercise/exercise-tag.ts";
import {ActivityTags} from "./ActivityTags.tsx";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

type ExerciseTagsProps = {
    tags: ExerciseTag[],
    sx?: SxProps<Theme>,
};

export function ExerciseTags({tags, sx}: ExerciseTagsProps) {
    return <ActivityTags<ExerciseTag> tags={tags} sx={sx}
                                      labelMaker={(tag: ExerciseTag) => EXERCISE_TAG_LABELS[tag]}/>
}