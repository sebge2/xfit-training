import {isRouteErrorResponse, useAsyncError, useRouteError} from "react-router-dom";

export function ErrorComponent() {
    const asyncError = useAsyncError();
    const routeError = useRouteError();
    const error = asyncError || routeError;

    if (error instanceof Error) {
        return <p className="error">{error.message}</p>;
    }

    if (isRouteErrorResponse(error)) {
        return <p className="error">{error.status} {error.statusText}</p>;
    }

    return <p className="error">Unknown error</p>;
}