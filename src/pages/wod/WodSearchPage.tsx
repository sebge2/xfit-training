import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Wod} from "../../model/wod/wod.ts";
import {WOD_SERVICE} from "../../services/wod-service.ts";

export default function WodSearchPage() {
    const [wods, setWods] = useState<Wod[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWods = async () => {
            try {
                setLoading(true);
                const fetchedWods = await WOD_SERVICE.findAll();
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
            {loading && <p>Loading workouts...</p>}

            {error && <p className="error">{error}</p>}

            {!loading && !error && wods.length === 0 && (
                <p>No workouts found. Add some workouts to get started!</p>
            )}

            {!loading && !error && wods.length > 0 && (
                <ul>
                    {wods.map((wod) => (
                        <li key={wod.id}>
                            <Link to={wod.id as string} relative="path">
                                {wod.name || `Wod ${wod.id}`}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
