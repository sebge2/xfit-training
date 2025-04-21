import {ActivityType} from "./activity-type.ts";

export interface Activity {

    type(): ActivityType;

    get comment(): string | undefined;
}