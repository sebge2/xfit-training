export interface ExerciseDto {

    get id(): string,

    get name(): string;

    get tags(): string[];

    get comment(): string | undefined;

}