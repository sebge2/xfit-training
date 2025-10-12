import {FormField} from "../../../model/core/form/form-field.ts";
import {ReactElement} from "react";
import FormControl from "@mui/material/FormControl";
import {MobileDatePicker} from "@mui/x-date-pickers";
import {FormHelperText} from "@mui/material";
import dayjs from "dayjs";
import {PickerValue} from "@mui/x-date-pickers/internals";

export type InputDateFormField = FormField<Date | undefined>;

type Props = {
    formField: InputDateFormField,
    onChange?: (value: Date | undefined) => Promise<void> | void,
};

export function DatePicker({formField, onChange: onChangeDelegate}: Props): ReactElement {
    function dateToDayJs(date?: Date): PickerValue {
        if (!date) {
            return null;
        }

        return dayjs(date);
    }

    function dayJsToDate(dayJs: PickerValue): Date | undefined {
        if (!dayJs) {
            return undefined;
        }

        return dayJs.toDate();
    }

    async function onChange(value: PickerValue): Promise<void> {
        if (onChangeDelegate) {
            await onChangeDelegate(dayJsToDate(value));
        }
    }

    return <FormControl fullWidth>
        {/*
        TODO
        error={formField.hasErrors}
        */}
        <MobileDatePicker
            name={formField.id}
            label={formField.label}
            format="YYYY-MM-DD"
            defaultValue={dateToDayJs(formField.defaultValue)}
            onChange={onChange}
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