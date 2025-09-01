import * as React from "react";
import InfoIcon from '@mui/icons-material/Info';
import {Exercise} from "../../../model/exercise/exercise.ts";
import {ExerciseDetailsView} from "./ExerciseDetailsView.tsx";

export type TabDescriptor = {
    label: React.ReactNode,
    icon: React.ReactElement | undefined,
    default: boolean,
    content: React.ReactNode,
};

export function createInfoTab(exercise: Exercise): TabDescriptor {
    return {
        label: undefined,
        icon: <InfoIcon/>,
        content: <ExerciseDetailsView exercise={exercise}/>,
    };
}