import {useEffect, useState} from "react";
import {Wod} from "../model/activity/wod.ts";
import {Enom} from "../model/activity/enom.ts";
import {Duration} from "../model/activity/duration.ts";
import {Sequence} from "../model/activity/sequence.ts";
import {ActivityExercise} from "../model/activity/activity-exercise.ts";
import {Exercise} from "../model/exercise/exercise.ts";
import {ForTime} from "../model/activity/for-time.ts";
import {Repetitions} from "../model/activity/repetitions.ts";
import {WodDisplay} from "../components/activity/wod-display.tsx";
import DurationDisplay from "../components/activity/duration-display.tsx";
import {ChronometerService} from "../services/board/chronometer-service.ts";

const initialState = Duration.fromSeconds(61);
const service = new ChronometerService(initialState).start();

export default function ExercisesPage() {
    const [elapsedTime, setElapsedTime] = useState(initialState);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Call the chronometer service and update the state
            const time = service.remainingTime;
            setElapsedTime(time);
        }, 1000); // Call every second

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const wod = new Wod(
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
            <div>
                <DurationDisplay duration={elapsedTime}/>
                <br/>
                {service.state.status}

                <br/>
                <button onClick={() => service.pause()}>Pause</button>
                <br/>
                <button onClick={() => service.start()}>Start</button>
            </div>
        </div>
    );
}