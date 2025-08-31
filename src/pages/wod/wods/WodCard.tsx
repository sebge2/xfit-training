import {Wod} from "../../../model/wod/wod.ts";
import Box from "@mui/material/Box";
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {WodTags} from "../../../components/core/exercise/WodTags.tsx";

export function WodCard({wod, onClick}: { wod: Wod, onClick?: () => void }) {
    return <Card>
        <CardActionArea
            onClick={onClick}
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
                        <WodTags tags={wod.tags}/>
                    </Box>
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>;
}