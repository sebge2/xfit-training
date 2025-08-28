export enum SubCategory {

    SQUAT = 'SQUAT',

    SNATCH = 'SNATCH',

    SLED = 'SLED',

    ROW = 'ROW',

    PRESS = 'PRESS',

    OLYMPIC_LIFT = 'OLYMPIC_LIFT',

    JERK = 'JERK',

    DEADLIFT = 'DEADLIFT',

    CLEAN = 'CLEAN',

    OTHER = 'OTHER',

}

export const SUB_CATEGORY_LABELS: { [key in SubCategory]: string } = {
    [SubCategory.SQUAT]: 'Squat',
    [SubCategory.SNATCH]: 'Snatch',
    [SubCategory.SLED]: 'Sled',
    [SubCategory.ROW]: 'Row',
    [SubCategory.PRESS]: 'Press',
    [SubCategory.OLYMPIC_LIFT]: 'Olympic lift',
    [SubCategory.JERK]: 'Jerk',
    [SubCategory.DEADLIFT]: 'Deadlift',
    [SubCategory.CLEAN]: 'Clean',
    [SubCategory.OTHER]: 'Other',
}