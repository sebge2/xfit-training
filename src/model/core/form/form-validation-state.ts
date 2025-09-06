export class FormValidationState {

    static empty(): FormValidationState {
        return new FormValidationState({});
    }

    constructor(
        public readonly errors: { [key: string]: string[] },
    ) {
    }

    hasErrors(): boolean {
        return Object.keys(this.errors).length > 0;
    }

    hasErrorsForField(field: string): boolean {
        return this.errors[field]?.length > 0;
    }
}