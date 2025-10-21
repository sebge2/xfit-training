export enum ExerciseTag {

    WEIGHTLIFTING = 'WEIGHTLIFTING',

    BARBELL = 'BARBELL',

    OVERHEAD = 'OVERHEAD',

    SQUAT = 'SQUAT',

    SNATCH = 'SNATCH',

    JERK = 'JERK',

    PUSH = 'PUSH',

    CLEAN = 'CLEAN',

    SINGLE_DB = 'SINGLE_DB',

    DOUBLE_DB = 'DOUBLE_DB',

    BODY_WEIGHT = 'BODY_WEIGHT',

    GYM = 'GYM',

    BOX = 'BOX',

    SLED = 'SLED',

    SKI = 'SKI',

    ROW = 'ROW',

    RUN = 'RUN',

}

export const EXERCISE_TAG_LABELS: { [key in ExerciseTag]: string } = {
    [ExerciseTag.WEIGHTLIFTING]: 'Weightlifing',
    [ExerciseTag.BARBELL]: 'Barbell',
    [ExerciseTag.OVERHEAD]: 'Overhead',
    [ExerciseTag.SQUAT]: 'Squat',
    [ExerciseTag.SNATCH]: 'Snatch',
    [ExerciseTag.JERK]: 'Jerk',
    [ExerciseTag.PUSH]: 'Push',
    [ExerciseTag.CLEAN]: 'Clean',
    [ExerciseTag.SINGLE_DB]: '1 DB',
    [ExerciseTag.DOUBLE_DB]: '2 DB',
    [ExerciseTag.BODY_WEIGHT]: 'Body Weight',
    [ExerciseTag.GYM]: 'Gym',
    [ExerciseTag.BOX]: 'Box',
    [ExerciseTag.SLED]: 'Sled',

    [ExerciseTag.SKI]: 'Ski',
    [ExerciseTag.ROW]: 'Row',
    [ExerciseTag.RUN]: 'Run',
}