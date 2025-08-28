import {Chip, Stack} from "@mui/material";

export function ActivityTags({tags}: { tags: string[] }) {
    return <Stack direction="row" spacing={1}>
        {(tags || []).map(tag =>
            <Chip key={tag} label={tag} variant="outlined"/>
        )}
    </Stack>;
}