import {ReactElement, useState} from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import {Checkbox, FormHelperText} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import {FormField} from "../../model/core/form/form-field.ts";

type TagSelectorProps<T extends string> = {
    formField: FormField,
    availableTags: T[],
    labelMaker: (tag: T) => string,
};

export function TagSelector<T extends string>({
                                                  formField,
                                                  availableTags,
                                                  labelMaker,
                                              }: TagSelectorProps<T>): ReactElement {
    const [tags, setTags] = useState<T[]>(formField.defaultValue as T[] || []);

    const handleChange = (event: SelectChangeEvent<T[]>) => {
        const tags = event.target.value as T[];

        setTags(tags);
    };

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

    function renderValue(selected: T[]): string | undefined {
        if (!selected || (selected.length === 0)) {
            return undefined;
        }

        return selected.map(tag => labelMaker(tag)).join(', ');
    }

    /*
TODO
TagSelector.tsx:60 MUI: A component is changing the default value state of an uncontrolled Select after being initialized. To suppress this warning opt to use a controlled Select.
*/

    return <Box sx={{minWidth: 120}}>
        <FormControl fullWidth>
            <InputLabel id={formField.id + 'label'}>{formField.label}</InputLabel>
            <Select<T[]>
                labelId={formField.id + 'label'}
                id={formField.id}
                name={formField.id}
                multiple
                defaultValue={tags}
                label={formField.label}
                onChange={handleChange}
                input={<OutlinedInput label={formField.label}/>}
                renderValue={renderValue}
                error={formField.hasErrors}
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
            {formField.required && <FormHelperText>{formField.joinedError || 'Required'}</FormHelperText>}
        </FormControl>
    </Box>;
}