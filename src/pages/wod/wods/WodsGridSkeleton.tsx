import {Skeleton} from "@mui/material";
import {ReactElement} from "react";
import {WodsGrid} from "./WodsGrid.tsx";

export function WodsGridSkeleton(): ReactElement {
    const numberSkeletons = 10;

    return <WodsGrid>
        {[...Array(numberSkeletons)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" width="25rem" height="10rem" />
        ))}
    </WodsGrid>;
}