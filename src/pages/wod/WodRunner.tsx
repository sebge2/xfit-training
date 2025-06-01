import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Duration} from "../../model/wod/activity/duration.ts";
import {ChronometerService} from "../../services/board/chronometer-service.ts";
import DurationDisplay from "../../components/activity/duration-display.tsx";

const initialState = Duration.fromSeconds(61);
const service = new ChronometerService(initialState).start();

export default function WodRunner() {
    const {id} = useParams();
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

    return (
        <div>
            {id}
            <DurationDisplay duration={elapsedTime}/>
            <br/>
            {service.state.status}

            <br/>
            <button onClick={() => service.pause()}>Pause</button>
            <br/>
            <button onClick={() => service.start()}>Start</button>
        </div>
    );
}