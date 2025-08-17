import {Form, Link, Navigate, redirect, useNavigation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Wod} from "../../model/wod/wod.ts";
import {WOD_SERVICE} from "../../services/wod-service.ts";
import {WodDisplay} from "../../components/wod/activity/wod-display.tsx";

export async function sendWod({params, request}: { params: any, request: any }): Promise<Response> {
    const data = await request.formData();

    console.log(data.get('name'));
    console.log(params);

    // in case of error json({{message: 'my message'}, {status: 500})

    return redirect('/wods');
}

export default function WodPage() {
    const {id} = useParams();
    const [wod, setWod] = useState<Wod | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();

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

    return (
        <>
            {/*            <p>{wod.name}</p>
            <p>{wod.tags}</p>*/}

            <Form method="post">
                <p>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" defaultValue={wod.name}/>
                </p>
                <p>
                    <label htmlFor="tags">Tags</label>
                    <input type="text" name="tags" defaultValue={wod.tags}/>
                </p>

                <button type="submit" disabled={navigation.state === 'submitting'}>Save</button>
            </Form>

            <WodDisplay wod={wod}/>

            <Link to="run">Run</Link>
            <div>
                <Link to="/wod">Back to Workouts</Link>
            </div>
        </>
    );
}
