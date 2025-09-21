import {TagSelector} from "./TagSelector.tsx";
import {FormField} from "../../model/core/form/form-field.ts";
import {WOD_TAG_LABELS, WodTag} from "../../model/wod/wod-tag.ts";

export type WodTagFormField = FormField<WodTag[]>;

type Props = {
    formField: WodTagFormField,
};

export function WodTagSelector({formField}: Props) {
    return <TagSelector<WodTag> formField={formField}
                                availableTags={Object.keys(WodTag).map(tag => tag as WodTag)}
                                labelMaker={(tag) => WOD_TAG_LABELS[tag]}/>;
}