import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Exercise} from "../../model/exercise/exercise.ts";
import {EXERCISE_SERVICE} from "../../services/exercise-service.ts";

export default function ExercisePage() {
    const {id} = useParams();

    const [wod, setWod] = useState<Exercise | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWod = async () => {
            if (!id) {
                setError("No workout ID provided");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const fetchedWod = await EXERCISE_SERVICE.findById(id);

                if (!fetchedWod) {
                    setError(`Workout with ID ${id} not found`);
                } else {
                    setWod(fetchedWod);
                    setError(null);
                }
            } catch (err) {
                console.error(`Error fetching workout with ID ${id}:`, err);
                setError("Failed to load workout. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchWod();
    }, [id]);

    return (
        <>
            <div>ExercisePage {id}</div>

            {loading && <p>Loading workouts...</p>}

            {error && <p className="error">{error}</p>}

            {!loading && !error && wod === null && (
                <p>No workouts found. Add some workouts to get started!</p>
            )}

            {!loading && !error && wod && (
                <div>{wod.name}</div>
            )}
        </>
    );
}