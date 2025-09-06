import {TagSelector} from "./TagSelector.tsx";
import {EXERCISE_TAG_LABELS, ExerciseTag} from "../../model/exercise/exercise-tag.ts";
import {FormField} from "../../model/core/form/form-field.ts";

export type ExerciseTagFormField = FormField<ExerciseTag[]>;

type Props = {
    formField: ExerciseTagFormField,
};

export function ExerciseTagSelector({formField}: Props) {
    return <TagSelector<ExerciseTag> formField={formField}
                                     availableTags={Object.keys(ExerciseTag).map(tag => tag as ExerciseTag)}
                                     labelMaker={(tag) => EXERCISE_TAG_LABELS[tag]}/>;
}