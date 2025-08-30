import {MainCategory} from "../../model/exercise/main-category.ts";
import FitnessCenter from '@mui/icons-material/FitnessCenter';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

export function ActivityIcon({category}: { category: MainCategory }) {
    switch (category) {
        case MainCategory.STRENGTH:
            return <FitnessCenter/>
        case MainCategory.CARDIO:
            return <DirectionsRunIcon/>;
        case MainCategory.GYM:
            return <SportsGymnasticsIcon/>;
    }
}