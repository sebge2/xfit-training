export class BoardTextInfo {

    static empty(): BoardTextInfo {
        return new BoardTextInfo([], []);
    }

    static single(header: string | undefined, footer: string | undefined) {
        return new BoardTextInfo(
            header ? [header] : [],
            footer ? [footer] : []
        );
    }

    constructor(
        public readonly header: string[],
        public readonly footer: string [],
    ) {
    }

    mergeWithParent(parent?: BoardTextInfo): BoardTextInfo {
        return new BoardTextInfo(
            [...(parent?.header || []), ...this.header],
            [...(parent?.footer || []), ...this.footer],
        )
    }
}