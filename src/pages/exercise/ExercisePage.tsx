import {useParams} from "react-router-dom";

export default function ExercisePage() {
    const {id} = useParams();

    return (
        <div>ExercisePage {id}</div>
    );
}