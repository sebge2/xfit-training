import {Await, Link, useLoaderData} from "react-router-dom";
import {Suspense} from "react";
import {ErrorComponent} from "../../components/core/ErrorComponent.tsx";
import {Exercise} from "../../model/exercise/exercise.ts";

export default function ExercisesPage() {
    const routeData = useLoaderData() as { exercises: Exercise[] };

    return <Suspense fallback={<p>Loading workouts...</p>}>
        <Await resolve={routeData.exercises} errorElement={<ErrorComponent/>}>
            {(exercises: Exercise[]) => (
                <>
                    {exercises.length === 0 && (
                        <p>No exercise found. Add some exercises to get started!</p>
                    )}

                    {exercises.length > 0 && (
                        <ul>
                            {exercises.map((exercise) => (
                                <li key={exercise.id}>
                                    <Link to={exercise.id} relative="path">
                                        {exercise.name || `Exercise ${exercise.id}`}
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