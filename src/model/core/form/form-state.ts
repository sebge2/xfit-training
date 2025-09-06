import {FormField} from "./form-field.ts";

export class FormState {

    static create(fields: FormField[]): FormState {
        return new FormState(fields);
    }

    readonly hasFailed: boolean;
    readonly fieldById: { [key: string]: FormField };

    constructor(
        public readonly fields: FormField[],
        public readonly globalErrors: string[] = [],
    ) {
        this.hasFailed = (globalErrors.length > 0) || fields.some(field => field.errors.length > 0);
        this.fieldById = Object.fromEntries(fields.map((field) => [field.id, field])) as Record<string, FormField>;
    }

    public reset(): FormState {
        return new FormState(this.fields.map((field) => field.reset()));
    }
}