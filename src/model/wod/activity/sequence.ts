import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";
import {SequenceDto} from "../../dto/wod/activity/sequence.dto.ts";
import {TaskSet} from "../board/task-set.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";
import {mapActivityFromAllDto, mapActivityToAllDto} from "./activity-utils.ts";

export class Sequence extends Activity {

    static fromDto(dto: SequenceDto): Sequence {
        return new Sequence(
            mapActivityFromAllDto(dto.activities),
            dto.name || undefined,
            dto.comment || undefined,
        );
    }

    static toDto(activity: Sequence): SequenceDto {
        return {
            type: activity.type,
            activities: mapActivityToAllDto(activity.activities),
            name: activity.name || null,
            comment: activity.comment || null,
        };
    }

    static empty(): Sequence {
        return new Sequence([], undefined, undefined);
    }

    constructor(
        public readonly activities: Activity[],
        public readonly name: string | undefined,
        comment: string | undefined,
    ) {
        super(ActivityType.SEQUENCE, comment);
    }

    toSequencerTasks(parent: BoardTextInfo): TaskSet {
        return this.activities.reduce((acc, activity) => acc.merge(activity.toSequencerTasks(parent)), new TaskSet([]));
    }

    addActivity(child: Activity): Sequence {
        return new Sequence(
            [...this.activities, child],
            this.name,
            this.comment,
        );
    }

    updateActivity(child: Activity): Sequence {
        const index = this._findIndex(child.id);
        if (index < 0) {
            return this;
        }

        return new Sequence(
            this.activities.slice(0, index).concat(child).concat(this.activities.slice(index + 1)),
            this.name,
            this.comment,
        );
    }

    deleteActivity(id: string) {
        const index = this._findIndex(id);
        if (index < 0) {
            return this;
        }

        return new Sequence(
            this.activities.slice(0, index).concat(this.activities.slice(index + 1)),
            this.name,
            this.comment,
        );
    }

    moveActivity(id: string, newIndex: number) {
        const index = this._findIndex(id);
        if (index < 0) {
            return this;
        }

        const count = this.activities.length;
        if (count <= 1) {
            return this;
        }

        const targetIndex = Math.max(0, Math.min(newIndex, count - 1));
        if (targetIndex === index) {
            return this;
        }

        const updatedActivities = this.activities.slice();
        const [moved] = updatedActivities.splice(index, 1);
        updatedActivities.splice(targetIndex, 0, moved);

        return new Sequence(
            updatedActivities,
            this.name,
            this.comment,
        );
    }

    private _findIndex(id: string): number {
        return this.activities.findIndex(child => child.id === id);
    }
}