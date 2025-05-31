import {useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error: {status?: number} = useRouteError() as {status?: number};

    return (
        <div>ErrorPage {error?.status}</div>
    );
}