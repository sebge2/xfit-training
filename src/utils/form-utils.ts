import {FormState} from "../model/core/form/form-state.ts";

export function validateRequiredFields(state: FormState, formData: FormData) {
    state.fields
        .filter(field => field.required)
        .forEach(field => {
            const fieldValue = formData.get(field.id);

            if (!fieldValue || fieldValue.toString().trim() === '') {
                field.addError('Please enter a value.');
            }
        })
}