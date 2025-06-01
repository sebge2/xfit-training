import {Wod} from "./wod/wod.ts";
import {Enom} from "./wod/activity/enom.ts";
import {Duration} from "./wod/activity/duration.ts";
import {Sequence} from "./wod/activity/sequence.ts";
import {ActivityExercise} from "./wod/activity/activity-exercise.ts";
import {ForTime} from "./wod/activity/for-time.ts";
import {Repetitions} from "./wod/activity/repetitions.ts";
import {Exercise} from "./exercise/exercise.ts";

export const wod1 = new Wod(
    "1",
    new Enom(
        new Duration(3),
        3,
        new Sequence(
            [
                new ActivityExercise("1000m", new Exercise("1", "run", ["cardio"], undefined), undefined),
                new ActivityExercise("30", new Exercise("2", "handstand push-ups", ["strength training", "gym"], undefined), undefined),
                new ActivityExercise("1000m", new Exercise("3", "row", ["cardio"], undefined), undefined),
            ],
            undefined
        ),
        undefined
    ),
    "Monday 250421",
    [],
    undefined
);


export const wod2 = new Wod(
    "2",
    new ForTime(
        new Duration(24),
        new Sequence(
            [
                new Repetitions(
                    3,
                    new Sequence(
                        [
                            new ActivityExercise("15", new Exercise("1", "deadlift", ["strength"], undefined), "80kg/55kg"),
                            new ActivityExercise("5", new Exercise("2", "wall walks", ["strength", "cardio"], undefined), undefined),
                            new ActivityExercise("250m/200m", new Exercise("3", "row", ["strength", "cardio"], undefined), undefined),
                        ],
                        undefined
                    ),
                    undefined
                ),
                new Repetitions(
                    3,
                    new Sequence(
                        [
                            new ActivityExercise("15", new Exercise("1", "hang power clean", ["strength"], undefined), "40kg/30kg"),
                            new ActivityExercise("15", new Exercise("2", "handstand push-ups", ["strength", "cardio", "gym"], undefined), ""),
                            new ActivityExercise("250m/200m", new Exercise("3", "row", ["strength", "cardio"], undefined), undefined),
                        ],
                        undefined
                    ),
                    undefined
                )
            ],
            undefined
        ),
        undefined
    ),
    "",
    [],
    "Time Intention : 17-20min"
);