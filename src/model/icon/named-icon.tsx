import React from "react";
import type {SvgIconProps} from "@mui/material/SvgIcon";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import KayakingIcon from '@mui/icons-material/Kayaking';
import RowingIcon from '@mui/icons-material/Rowing';

export const ALL_ICONS: { [key in string]: React.ComponentType<SvgIconProps> } = {

    FITNESS_CENTER: FitnessCenterIcon,

    SPORTS_GYMNASTIC: SportsGymnasticsIcon,

    RUN: DirectionsRunIcon,

    DOWNHILL_SKIING: DownhillSkiingIcon,

    KAYAKING: KayakingIcon,

    ROWING: RowingIcon,
}