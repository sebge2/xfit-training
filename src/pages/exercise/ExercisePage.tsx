import {Await, useRouteLoaderData} from "react-router-dom";
import {Exercise} from "../../model/exercise/exercise.ts";
import {Suspense} from "react";
import {ErrorComponent} from "../../components/core/ErrorComponent.tsx";

export default function ExercisePage() {
    const routeData = useRouteLoaderData('exercise-details') as { exercise: Exercise };

    return <Suspense fallback={<p>Loading exercise...</p>}>
        <Await resolve={routeData.exercise} errorElement={<ErrorComponent/>}>
            {(exercise: Exercise) => (
                <>
                    <div>{exercise.name}</div>
                    <div>{exercise.tags.map(tag => ' ' + tag)}</div>
                </>
            )}
        </Await>
    </Suspense>;
}