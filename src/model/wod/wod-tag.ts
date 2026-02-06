export enum WodTag {

    BENCHMARK = 'BENCHMARK',

    OPEN = 'OPEN',

}

export const WOD_TAG_LABELS: { [key in WodTag]: string } = {
    [WodTag.BENCHMARK]: 'Benchmark',
    [WodTag.OPEN]: 'Open',
}

