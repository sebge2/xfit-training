import {ReactElement, useState} from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import {Checkbox, FormHelperText} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";

type TagSelectorProps<T extends string> = {
    id: string,
    originalValues: T[],
    availableTags: T[],
    required?: boolean,
    labelMaker: (tag: T) => string,
    onChange?: (tags: T[]) => void,
};

export function TagSelector<T extends string>({
                                                  id,
                                                  originalValues,
                                                  availableTags,
                                                  required,
                                                  labelMaker,
                                                  onChange
                                              }: TagSelectorProps<T>): ReactElement {
    const [tags, setTags] = useState<T[]>(originalValues);

    const handleChange = (event: SelectChangeEvent<T[]>) => {
        const tags = event.target.value as T[];

        setTags(tags);

        if (onChange) {
            onChange(tags);
        }
    };

    const label = 'Tags';
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    return <Box sx={{minWidth: 120}}>
        <FormControl fullWidth>
            <InputLabel id={id + 'label'}>{label}</InputLabel>
            <Select<T[]>
                labelId={id + 'label'}
                id={id}
                name={id}
                multiple
                value={tags}
                label={label}
                required={required}
                onChange={handleChange}
                input={<OutlinedInput label="Tag"/>}
                renderValue={(selected) => selected.map(tag => labelMaker(tag)).join(', ')}
                MenuProps={MenuProps}
            >
                {availableTags
                    .map(availableTag =>
                        <MenuItem key={availableTag} value={availableTag}>
                            <Checkbox checked={tags.includes(availableTag)}/>
                            <ListItemText primary={labelMaker(availableTag)}/>
                        </MenuItem>
                    )
                }
            </Select>
            {required && <FormHelperText>Required</FormHelperText>}
        </FormControl>
    </Box>;
}