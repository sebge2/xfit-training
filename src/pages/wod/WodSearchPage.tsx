import {Await, useLoaderData, useNavigate} from "react-router-dom";
import {Wod} from "../../model/wod/wod.ts";
import {Suspense} from "react";
import {ErrorComponent} from "../../components/core/ErrorComponent.tsx";
import Box from "@mui/material/Box";
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {ActivityTags} from "../../components/core/exercise/ActivityTags.tsx";

export default function WodSearchPage() {
    const routeData = useLoaderData() as { wods: Wod[] };
    const navigate = useNavigate();

    return <Suspense fallback={<p>Loading workouts...</p>}>
        <Await resolve={routeData.wods} errorElement={<ErrorComponent/>}>
            {(wods: Wod[]) => (
                <>
                    {wods.length === 0 && (
                        <p>No workouts found. Add some workouts to get started!</p>
                    )}

                    {wods.length > 0 && (
                        <Box
                            sx={{
                                width: 'calc(100%-2rem)',
                                display: 'grid',
                                margin: '2rem',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(min(25rem, 100%), 1fr))',
                                gap: 2,
                            }}
                        >
                            {wods.map((wod) => (
                                <Card>
                                    <CardActionArea
                                        onClick={() => navigate(wod.id as string, {})}
                                        sx={{
                                            '&[data-active]': {
                                                backgroundColor: 'action.selected',
                                                '&:hover': {
                                                    backgroundColor: 'action.selectedHover',
                                                },
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {wod.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <Box sx={{mt: 1}}>
                                                    {wod.comment}
                                                </Box>
                                                <Box sx={{mt: 1}}>
                                                    <ActivityTags tags={wod.tags}/>
                                                </Box>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </Box>
                    )}
                </>
            )}
        </Await>
    </Suspense>;
}
