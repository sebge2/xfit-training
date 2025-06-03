import {isRouteErrorResponse, useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    // Handle Router Error Response (4xx, 5xx errors)
    if (isRouteErrorResponse(error)) {
        return (
            <div className="error-container">
                <h1>
                    {error.status} {error.statusText}
                </h1>
                {error.data?.message && <p>{error.data.message}</p>}
            </div>
        );
    }

    // Handle Firebase Errors
    if (error instanceof Error && 'code' in error) {
        const firebaseError = error as { code: string; message: string };
        return (
            <div className="error-container">
                <h1>Firebase Error</h1>
                <p>Error Code: {firebaseError.code}</p>
                <p>Message: {firebaseError.message}</p>
            </div>
        );
    }

    // Handle standard Error objects
    if (error instanceof Error) {
        return (
            <div className="error-container">
                <h1>Error</h1>
                <p>Message: {error.message}</p>
                {error.stack && (
                    <details>
                        <summary>Stack Trace</summary>
                        <pre>{error.stack}</pre>
                    </details>
                )}
            </div>
        );
    }

    // Handle unknown errors
    return (
        <div className="error-container">
            <h1>Unknown Error</h1>
            <p>An unexpected error occurred.</p>
            <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
    );

}