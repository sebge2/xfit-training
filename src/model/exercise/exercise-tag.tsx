export enum ExerciseTag {

    WEIGHTLIFTING = 'WEIGHTLIFTING',

    BARBELL = 'BARBELL',

    OVERHEAD = 'OVERHEAD',

    SQUAT = 'SQUAT',

    SNATCH = 'SNATCH',

    JERK = 'JERK',

    PUSH = 'PUSH',

}

export const EXERCISE_TAG_LABELS: { [key in ExerciseTag]: string } = {
    [ExerciseTag.WEIGHTLIFTING]: 'Weightlifing',
    [ExerciseTag.BARBELL]: 'Barbell',
    [ExerciseTag.OVERHEAD]: 'Overhead',
    [ExerciseTag.SQUAT]: 'Squat',
    [ExerciseTag.SNATCH]: 'Snatch',
    [ExerciseTag.JERK]: 'Jerk',
    [ExerciseTag.PUSH]: 'Push',
}