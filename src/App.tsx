import {ForTime} from "./model/activity/for-time.ts";
import {ActivityExercise} from "./model/activity/activity-exercise.ts";
import {Exercise} from "./model/exercise/exercise.ts";
import {Wod} from "./model/activity/wod.ts";
import {WodDisplay} from "./components/activity/wod-display.tsx";
import {Sequence} from "./model/activity/sequence.ts";
import {Repetitions} from "./model/activity/repetitions.ts";
import {Duration} from "./model/activity/duration.ts";

export default function App() {
    const wod = new Wod(
        "1",
        new ForTime(
            undefined,
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

    const wod2 = new Wod(
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

    return (
        <div>
            <WodDisplay wod={wod}/>
            <WodDisplay wod={wod2}/>
        </div>
    )
}
