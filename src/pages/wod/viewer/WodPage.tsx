import {redirect, useRouteLoaderData} from "react-router-dom";
import {Wod} from "../../../model/wod/wod.ts";
import {WodLoadedPage} from "./WodLoadedPage.tsx";

export async function sendWod({params, request}: { params: any, request: any }): Promise<Response> {
    const data = await request.formData();

    console.log(data.get('name'));
    console.log(params);

    // in case of error json({{message: 'my message'}, {status: 500})

    return redirect('/wods');
}

export default function WodPage() {
    const routeData = useRouteLoaderData('wod-details') as { wod: Wod };

    return <WodLoadedPage wod={routeData.wod}/>;

    // return <Suspense fallback={<WodSkeletonPage/>}>
    //     <Await resolve={routeData.records} errorElement={<ErrorComponent/>}>
    //         {() => <WodLoadedPage wod={routeData.wod}/>}
    //     </Await>
    // </Suspense>;

    // return <Suspense fallback={<p>Loading wod...</p>}>
    //     <Await resolve={routeData.wod} errorElement={<ErrorComponent/>}>
    //         {(wod: Wod) => (
    //             <>
    //                 <Form method="post">
    //                     <p>
    //                         <label htmlFor="name">Name</label>
    //                         <input type="text" name="name" defaultValue={wod.name}/>
    //                     </p>
    //                     <p>
    //                         <label htmlFor="tags">Tags</label>
    //                         <input type="text" name="tags" defaultValue={wod.tags}/>
    //                     </p>
    //
    //                     <button type="submit" disabled={navigation.state === 'submitting'}>Save</button>
    //                 </Form>
    //
    //                 <WodDisplay wod={wod}/>
    //
    //                 <Link to="run">Run</Link>
    //                 <div>
    //                     <Link to="/wods">Back to Workouts</Link>
    //                 </div>
    //             </>
    //         )}
    //     </Await>
    // </Suspense>;
}
