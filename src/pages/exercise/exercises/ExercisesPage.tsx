import {Await, useLoaderData} from "react-router-dom";
import {Suspense} from "react";
import {ErrorComponent} from "../../../components/core/ErrorComponent.tsx";
import {AllCategoriesExercisesTabs} from "./AllCategoriesExercisesTabs.tsx";
import {ExercisesPageSkeleton} from "./ExercisesPageSkeleton.tsx";
import {AllCategoriesExercises} from "../../../model/exercise/all-categories-exercises.ts";

export default function ExercisesPage() {
    const routeData = useLoaderData() as { exercises: AllCategoriesExercises };

    return <Suspense fallback={<ExercisesPageSkeleton/>}>
        <Await resolve={routeData.exercises} errorElement={<ErrorComponent/>}>
            {(exercises: AllCategoriesExercises) => (
                <AllCategoriesExercisesTabs exercises={exercises}/>
            )}
        </Await>
    </Suspense>;
}