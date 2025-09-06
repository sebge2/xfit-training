import {ReactElement, useState} from "react";
import {SUB_CATEGORY_LABELS, SubCategory} from "../../model/exercise/sub-category.ts";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {MAIN_CATEGORY_LABELS, MAIN_SUB_CATEGORY_STRUCTURE, MainCategory} from "../../model/exercise/main-category.ts";
import {ListSubheader} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';

type CategorySelectorProps = {
    id: string,
    originalValue: SubCategory,
    onChange: (subCategory: SubCategory) => void
};

export function CategorySelector({id, originalValue, onChange}: CategorySelectorProps): ReactElement {
    const [subCategory, setSubCategory] = useState(originalValue);

    const handleChange = (event: SelectChangeEvent) => {
        setSubCategory(event.target.value as SubCategory);

        if (onChange) {
            onChange(event.target.value as SubCategory);
        }
    };

    const label = 'Category';

    return <Box sx={{minWidth: 120}}>
        <FormControl fullWidth>
            <InputLabel id={id + 'label'}>{label}</InputLabel>
            <Select
                labelId={id + 'label'}
                id={id}
                name={id}
                value={subCategory}
                label={label}
                onChange={handleChange}
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
        </FormControl>
    </Box>;
}