import {Chip, Stack} from "@mui/material";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

type ActivityTagsProps<T extends string> = {
    tags: T[],
    labelMaker: (tag: T) => string,
    sx?: SxProps<Theme>,
};

export function ActivityTags<T extends string>({tags, labelMaker, sx}: ActivityTagsProps<T>) {
    if (!tags || (tags.length === 0)) {
        return <div>/</div>;
    }

    return <Stack direction="row" spacing={1} sx={sx}>
        {tags.map(tag =>
            <Chip key={tag as string} label={labelMaker(tag)} variant="outlined"/>
        )}
    </Stack>;
}