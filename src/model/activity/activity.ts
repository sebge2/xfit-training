export interface Activity {

    type(): string;

    get comment(): string | undefined;
}