import {Link} from "react-router-dom";

export default function WodSearchPage() {
    return (
        <>
            <div>Wod search Page</div>

            <ul>
                <li><Link to="1" relative='path'>Wod 1</Link></li>
                <li><Link to="2" relative='path'>Wod 2</Link></li>
            </ul>
        </>
    );
}