import {Task} from "./task.ts";

export class TaskSet {

    constructor(
        public readonly tasks: Task[],
    ) {
    }

    merge(other: TaskSet): TaskSet {
        return new TaskSet([...this.tasks, ...other.tasks]);
    }
}