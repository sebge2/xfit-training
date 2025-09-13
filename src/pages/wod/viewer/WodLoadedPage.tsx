import {Wod} from "../../../model/wod/wod.ts";

type Props = {
    wod: Wod,
};

export function WodLoadedPage({wod}: Props) {
    return <>
        {wod.name}
    </>;
}