import {Chip, Stack} from "@mui/material";

type ActivityTagsProps<T extends string> = {
    tags: T[],
    labelMaker: (tag: T) => string,
};

export function ActivityTags<T extends string>({tags, labelMaker}: ActivityTagsProps<T>) {
    if (!tags || (tags.length === 0)) {
        return <div>/</div>;
    }

    return <Stack direction="row" spacing={1}>
        {tags.map(tag =>
            <Chip key={tag as string} label={labelMaker(tag)} variant="outlined"/>
        )}
    </Stack>;
}