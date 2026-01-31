import {Await, useLoaderData, useNavigate} from "react-router-dom";
import {Wod} from "../../../model/wod/wod.ts";
import {Suspense} from "react";
import {ErrorComponent} from "../../../components/core/ErrorComponent.tsx";
import {WodsGridSkeleton} from "./WodsGridSkeleton.tsx";
import {WodsGrid} from "./WodsGrid.tsx";
import {WodCard} from "./WodCard.tsx";

export default function WodSearchPage() {
    const routeData = useLoaderData() as { wods: Wod[] };
    const navigate = useNavigate();

    return <Suspense fallback={<WodsGridSkeleton/>}>
        <Await resolve={routeData.wods} errorElement={<ErrorComponent/>}>
            {(wods: Wod[]) => (
                <>
                    {wods.length === 0 && (
                        <p>No workouts found. Add some workouts to get started!</p>
                    )}

                    {wods.length > 0 && (
                        <WodsGrid>
                            {wods.map((wod) => (
                                <WodCard key={wod.id} wod={wod} onClick={() => navigate(wod.id as string, {})}/>
                            ))}
                        </WodsGrid>
                    )}
                </>
            )}
        </Await>
    </Suspense>;
}
