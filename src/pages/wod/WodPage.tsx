import {Link, Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Wod} from "../../model/activity/wod.ts";
import {WOD_SERVICE} from "../../services/wod-service.ts";

export default function WodPage() {
    const {id} = useParams();
    const [wod, setWod] = useState<Wod | null>(null);
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
                const fetchedWod = await WOD_SERVICE.findById(id);

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

    if (loading) {
        return <p>Loading workout...</p>;
    }

    if (error) {
        return (
            <div>
                <p className="error">{error}</p>
                <Link to="/wod">Back to Workouts</Link>
            </div>
        );
    }

    if (!wod) {
        return <Navigate to="/wod"/>;
    }

    //<!--<WodDisplay wod={wod} />-->

    return (
        <>
            <p>{wod.name}</p>
            <Link to="run">Run</Link>
            <div>
                <Link to="/wod">Back to Workouts</Link>
            </div>
        </>
    );
}
