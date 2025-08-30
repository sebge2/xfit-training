import {SubCategoryExercises} from "../../../model/exercise/sub-category-exercises.ts";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionActions from '@mui/material/AccordionActions';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {SUB_CATEGORY_LABELS} from "../../../model/exercise/sub-category.ts";
import {useState} from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {ActivityTags} from "../../../components/core/exercise/ActivityTags.tsx";
import {ActivityIcon} from "../../../components/activity/ActivityIcon.tsx";
import {useMediaQuery} from '@mui/material';
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';

export function SubCategoryExercisesAccordion({subCategory}: { subCategory: SubCategoryExercises }) {
    const [expanded, setExpanded] = useState(subCategory.exercises.length > 0);
    const showTags = useMediaQuery('(min-width:800px)');
    const navigate = useNavigate();

    return <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls={subCategory.subCategory + '-content'}
            id={subCategory.subCategory}
        >
            <Typography component="span">{SUB_CATEGORY_LABELS[subCategory.subCategory]}</Typography>
        </AccordionSummary>

        <AccordionDetails>
            <List>
                {subCategory.exercises.map((exercise) =>
                    <ListItemButton key={exercise.id} onClick={() => navigate(exercise.id as string, {})}>
                        <ListItemIcon>
                            <ActivityIcon category={subCategory.category}/>
                        </ListItemIcon>
                        <ListItemText primary={exercise.name}/>
                        {showTags &&
                            <ListItemIcon>
                                <ActivityTags tags={exercise.tags}/>
                            </ListItemIcon>
                        }
                    </ListItemButton>
                )}
            </List>
        </AccordionDetails>
        <AccordionActions>
            <Button>Add</Button>
        </AccordionActions>
    </Accordion>;
}