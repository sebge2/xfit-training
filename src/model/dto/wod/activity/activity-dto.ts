import {ActivityType} from "../../../wod/activity/activity-type.ts";

export interface ActivityDto {

    get type(): ActivityType;

    get comment(): string | undefined;
}