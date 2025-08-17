import {Await, Link, useLoaderData} from "react-router-dom";
import {Wod} from "../../model/wod/wod.ts";
import {Suspense} from "react";
import {ErrorComponent} from "../../components/core/ErrorComponent.tsx";

export default function WodSearchPage() {
    const routeData = useLoaderData() as { wods: Wod[] };

    return <Suspense fallback={<p>Loading workouts...</p>}>
        <Await resolve={routeData.wods} errorElement={<ErrorComponent/>}>
            {(wods: Wod[]) => (
                <>
                    {wods.length === 0 && (
                        <p>No workouts found. Add some workouts to get started!</p>
                    )}

                    {wods.length > 0 && (
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
            )}
        </Await>
    </Suspense>;
}
