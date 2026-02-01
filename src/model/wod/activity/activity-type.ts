export enum ActivityType {

    EXERCISE = 'EXERCISE',
    SEQUENCE = 'SEQUENCE',
    REPETITIONS = 'REPETITIONS',
    REST = 'REST',
    AMRAP = 'AMRAP',
    ENOM = 'ENOM',
    FOR_TIME = 'FOR_TIME',

}

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
    [ActivityType.EXERCISE]: 'Exercise',
    [ActivityType.SEQUENCE]: 'Sequence',
    [ActivityType.REPETITIONS]: 'Repetitions',
    [ActivityType.REST]: 'Rest',
    [ActivityType.AMRAP]: 'AMRAP',
    [ActivityType.ENOM]: 'ENOM',
    [ActivityType.FOR_TIME]: 'For Time'
};