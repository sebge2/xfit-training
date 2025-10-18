import FormControl from "@mui/material/FormControl";
import {FormHelperText} from "@mui/material";
import {ReactElement} from "react";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import {FormField} from "../../../model/core/form/form-field.ts";
import {PickerValue} from "@mui/x-date-pickers/internals";

export type InputMinuteSecondFormField = FormField<number | undefined>;

type Props = {
    formField: InputMinuteSecondFormField,
    onChange?: (value: number | undefined) => Promise<void> | void,
};

function numberToDayJs(seconds?: number): PickerValue {
    if (seconds === undefined || seconds === null) {
        return null;
    }

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return dayjs().minute(mins).second(secs).millisecond(0);
}

function dayJsToNumber(value: PickerValue): number | undefined {
    if (!value) {
        return undefined;
    }

    const mins = value.minute();
    const secs = value.second();
    return mins * 60 + secs;
}

export function InputMinuteSecond({formField, onChange: onChangeDelegate}: Props): ReactElement {
    async function onChange(value: PickerValue): Promise<void> {
        if (onChangeDelegate) {
            await onChangeDelegate(dayJsToNumber(value));
        }
    }

    return <FormControl fullWidth>
        <TimePicker
            name={formField.id}
            label={formField.label}
            defaultValue={numberToDayJs(formField.defaultValue)}
            onChange={onChange}
            views={['minutes', 'seconds']}
            format="mm:ss"
            slotProps={{
                textField: {
                    error: formField.hasErrors,
                    sx: {
                        padding: 0,
                        '> .MuiPickersInputBase-root': {
                            height: '2rem',
                            width: '5.8rem',
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