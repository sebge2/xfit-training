import {useMatches} from 'react-router-dom';

export function usePageName(defaultPageName: string = 'Xfit Training'): string[] {
    const matches = useMatches();
    const names: string[] = [];

    for (let i = 0; i < matches.length; i++) {
        const handle = matches[i]?.handle as
            | { pageName?: string | ((data: unknown) => string) }
            | undefined;

        if (typeof handle?.pageName === 'function') {
            names.push(
                handle.pageName({data: matches[i].data})
            );
        } else if (typeof handle?.pageName === 'string') {
            names.push(handle.pageName);
        }

    }

    if (names.length === 0) {
        names.push(defaultPageName);
    }

    return names;
}