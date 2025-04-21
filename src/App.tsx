import './App.css'
import {ForTime} from "./model/activity/for-time.ts";
import {ActivityExercise} from "./model/activity/activity-exercise.ts";
import {Exercise} from "./model/exercise/exercise.ts";
import {Wod} from "./model/activity/wod.ts";
import {ActivityDisplay} from "./components/activity/activity-display.tsx";
import {ACTIVITY_TYPE_LABELS} from "./model/activity/activity-type.ts";

export default function App() {
    const wod = new Wod(
        "1",
        new ForTime(
            undefined,
            [
                new ActivityExercise("1000m", new Exercise("1", "run", ["cardio"], undefined), undefined),
                new ActivityExercise("30", new Exercise("2", "handstand push-ups", ["strength training", "gym"], undefined), undefined),
                new ActivityExercise("1000m", new Exercise("3", "row", ["cardio"], undefined), undefined),
            ],
            undefined
        ),
        "Monday 250421",
        [],
        undefined
    );


    return (
        <>
            <div>
                    <label>Name:</label>
                    <span>{wod.name}</span>

                    <div>
                        <p>{ACTIVITY_TYPE_LABELS[wod.activity.type()]}</p>
                    </div>
                    <div>
                        <ActivityDisplay activity={wod.activity}/>
                    </div>
            </div>
        </>
    )
}
