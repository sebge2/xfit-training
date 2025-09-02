import * as React from "react";
import InfoIcon from '@mui/icons-material/Info';
import {Exercise} from "../../../model/exercise/exercise.ts";
import {ExerciseMetadataView} from "./ExerciseMetadataView.tsx";

export type TabDescriptor = {
    label: React.ReactNode,
    icon: React.ReactElement | undefined,
    defaultSelected: boolean | undefined,
    content: React.ReactNode,
};

export function createInfoTab(exercise: Exercise): TabDescriptor {
    return {
        label: undefined,
        icon: <InfoIcon/>,
        content: <ExerciseMetadataView exercise={exercise}/>,
        defaultSelected: false,
    };
}