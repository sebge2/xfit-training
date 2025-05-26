import {Link, useParams} from "react-router-dom";
import {WodDisplay} from "../../components/activity/wod-display.tsx";
import {Wod} from "../../model/activity/wod.ts";
import {wod1, wod2} from "../../model/wod-temp.tsx";

export default function WodPage() {
    const {id} = useParams();
    let wod: Wod;
    if (id === '1')
        wod = wod1;
    else if (id === '2')
        wod = wod2;
    else
        throw new Error('Wod not found');

    return (
        <>
            <WodDisplay wod={wod}/>

            <Link to="run">Run</Link>
        </>
    );
}