import {EXERCISE_TAG_LABELS, ExerciseTag} from "../../model/exercise/exercise-tag.tsx";
import {ActivityTags} from "./ActivityTags.tsx";

type ExerciseTagsProps = {
    tags: ExerciseTag[]
};

export function ExerciseTags({tags}: ExerciseTagsProps) {
    return <ActivityTags<ExerciseTag> tags={tags}
                                      labelMaker={(tag: ExerciseTag) => EXERCISE_TAG_LABELS[tag]}/>
}