import {FormField} from "../../../model/core/form/form-field.ts";
import {ReactElement} from "react";
import FormControl from "@mui/material/FormControl";
import {MobileDatePicker} from "@mui/x-date-pickers";
import {FormHelperText} from "@mui/material";

export type InputDateFormField = FormField<Date | undefined>;

type Props = {
    formField: InputDateFormField,
};

export function DatePicker({formField}: Props): ReactElement {
    return <FormControl fullWidth>
        {/*
        TODO
        defaultValue={formField.defaultValue}
        error={formField.hasErrors}
        */}
        <MobileDatePicker
            name={formField.id}
            label={formField.label}
            format="YYYY-MM-DD"
            slotProps={{
                textField: {
                    sx: {
                        padding: 0,
                        '> .MuiPickersInputBase-root': {
                            height: '2rem',
                            width: '8.8rem',
                            padding: '0.5rem',
                            marginLeft: '-0.5rem',
                        }
                    }
                },

                openPickerButton: {
                    sx: {
                        '& .MuiSvgIcon-root': {
                            fontSize: '1rem'
                        },
                        '& .MuiInputAdornment-outlined': {
                            margin: 0,
                        }
                    },
                }
            }}
        />
        {formField.required && <FormHelperText>{formField.joinedError || 'Required'}</FormHelperText>}
    </FormControl>;
}