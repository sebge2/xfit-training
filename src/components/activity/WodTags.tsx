import {ActivityTags} from "./ActivityTags.tsx";
import {WOD_TAG_LABELS, WodTag} from "../../model/wod/wod-tag.tsx";

type WodTagsProps = {
    tags: WodTag[]
};

export function WodTags({tags}: WodTagsProps) {
    return <ActivityTags<WodTag> tags={tags}
                                 labelMaker={(tag: WodTag) => WOD_TAG_LABELS[tag]}/>;
}