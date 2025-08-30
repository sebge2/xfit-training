import {SubCategoryExercises} from "../../../model/exercise/sub-category-exercises.ts";
import {Link} from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {SUB_CATEGORY_LABELS} from "../../../model/exercise/sub-category.ts";
import {useState} from "react";

export function SubCategoryExercisesAccordion({subCategory}: { subCategory: SubCategoryExercises }) {
    const [expanded, setExpanded] = useState(subCategory.exercises.length > 0);

    return <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls={subCategory.subCategory + '-content'}
            id={subCategory.subCategory}
        >
            <Typography component="span">{SUB_CATEGORY_LABELS[subCategory.subCategory]}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {subCategory.exercises.map((exercise) => (
                <li key={exercise.id}>
                    <Link to={exercise.id} relative="path">
                        {exercise.name || `Exercise ${exercise.id}`}
                    </Link>
                </li>
            ))}
        </AccordionDetails>
    </Accordion>;
}