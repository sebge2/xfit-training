export interface WodDto {

    get name(): string;

    get tags(): string[];

    get comment(): string | undefined;
}