import {FormField} from "./form-field.ts";

export class FormState {

    static create(fields: FormField<any>[]): FormState {
        return new FormState(fields);
    }

    readonly fieldById: { [key: string]: FormField<any> };

    constructor(
        public readonly fields: FormField<any>[],
    ) {
        this.fieldById = Object.fromEntries(fields.map((field) => [field.id, field])) as Record<string, FormField<any>>;
    }

    get isSuccessful(): boolean {
        return this.fields.every(field => field.errors.length === 0);
    }

    reset(): FormState {
        return new FormState(this.fields.map((field) => field.reset()));
    }
}