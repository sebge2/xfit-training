import {WodLoadedPage} from "./WodLoadedPage.tsx";

export default function WodPage() {
    // TODO
    // const routeData = useRouteLoaderData('exercise-details') as { exercise: Exercise, records: UserExerciseRecords };
    //
    // return <Suspense fallback={<ExerciseSkeletonPage/>}>
    //     <Await resolve={routeData.records} errorElement={<ErrorComponent/>}>
    //         {(records: UserExerciseRecords) => <ExerciseLoadedPage exercise={routeData.exercise} records={records}/>}
    //     </Await>
    // </Suspense>;

    return <WodLoadedPage/>;
}
