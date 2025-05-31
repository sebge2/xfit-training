import {useEffect, useState} from "react";
import {EXERCISES_SERVICE} from "../../services/exercise-service.ts";
import {Exercise} from "../../model/exercise/exercise.ts";
import {Link} from "react-router-dom";

export default function ExercisesPage() {
    const [wods, setWods] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWods = async () => {
            try {
                setLoading(true);
                const fetchedWods = await EXERCISES_SERVICE.findAll();
                setWods(fetchedWods);
                setError(null);
            } catch (err) {
                console.error("Error fetching wods:", err);
                setError("Failed to load workouts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchWods();
    }, []);

    return (
        <>
            <div>Exercises</div>

            {loading && <p>Loading workouts...</p>}

            {error && <p className="error">{error}</p>}

            {!loading && !error && wods.length === 0 && (
                <p>No workouts found. Add some workouts to get started!</p>
            )}

            {!loading && !error && wods.length > 0 && (
                <ul>
                    {wods.map((wod) => (
                        <li key={wod.id}>
                            <Link to={wod.id} relative="path">
                                {wod.name || `Wod ${wod.id}`}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}