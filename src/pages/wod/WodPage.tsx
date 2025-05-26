import {useParams} from "react-router-dom";

export default function WodPage() {
    const {id} = useParams();

    return (
        <div>WodPage {id}</div>
    );
}