export class FormField<T> {

    errors: string[] = [];

    constructor(
        public readonly id: string,
        public readonly label: string,
        public readonly defaultValue: T,
        public readonly required: boolean = false,
    ) {
    }

    public reset(): FormField<T> {
        return new FormField<T>(this.id, this.label, this.defaultValue, this.required);
    }

    addError(error: string): void {
        this.errors.push(error);
    }

    get hasErrors(): boolean {
        return this.errors.length > 0;
    }

    get joinedError(): string | undefined {
        if (this.errors.length === 0) {
            return undefined;
        }

        return this.errors.join(' ');
    }
}