import {Await, Form, Link, redirect, useNavigation, useRouteLoaderData} from "react-router-dom";
import {Suspense} from "react";
import {Wod} from "../../../model/wod/wod.ts";
import {WodDisplay} from "../../../components/wod/activity/wod-display.tsx";
import {ErrorComponent} from "../../../components/core/ErrorComponent.tsx";

export async function sendWod({params, request}: { params: any, request: any }): Promise<Response> {
    const data = await request.formData();

    console.log(data.get('name'));
    console.log(params);

    // in case of error json({{message: 'my message'}, {status: 500})

    return redirect('/wods');
}

export default function WodPage() {
    const routeData = useRouteLoaderData('wod-details') as { wod: Wod };
    const navigation = useNavigation();

    return <Suspense fallback={<p>Loading wod...</p>}>
        <Await resolve={routeData.wod} errorElement={<ErrorComponent/>}>
            {(wod: Wod) => (
                <>
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
                        <Link to="/wods">Back to Workouts</Link>
                    </div>
                </>
            )}
        </Await>
    </Suspense>;
}
