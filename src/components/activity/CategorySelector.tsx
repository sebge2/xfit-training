import {ReactElement} from "react";
import {SUB_CATEGORY_LABELS} from "../../model/exercise/sub-category.ts";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import {MAIN_CATEGORY_LABELS, MAIN_SUB_CATEGORY_STRUCTURE, MainCategory} from "../../model/exercise/main-category.ts";
import {FormHelperText, ListSubheader} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import {FormField} from "../../model/core/form/form-field.ts";

type Props = {
    formField: FormField,
};

export function CategorySelector({formField}: Props): ReactElement {
    return <Box sx={{minWidth: 120}}>
        <FormControl fullWidth>
            <InputLabel id={formField.id + 'label'}>{formField.label}</InputLabel>
            <Select
                labelId={formField.id + 'label'}
                id={formField.id}
                name={formField.id}
                defaultValue={formField.defaultValue}
                label={formField.label}
            >
                {Object.keys(MainCategory)
                    .map(mainCategory => mainCategory as MainCategory)
                    .flatMap(mainCategory =>
                        [
                            <ListSubheader value={mainCategory}>{MAIN_CATEGORY_LABELS[mainCategory]}</ListSubheader>,

                            ...MAIN_SUB_CATEGORY_STRUCTURE[mainCategory]
                                .map((subCategory) =>
                                    <MenuItem value={subCategory}>{SUB_CATEGORY_LABELS[subCategory]}</MenuItem>
                                )
                        ]
                    )
                }
            </Select>
            {formField.required && <FormHelperText>{formField.joinedError || 'Required'}</FormHelperText>}
        </FormControl>
    </Box>;
}