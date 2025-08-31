import {SubCategory} from "./sub-category.ts";

export enum MainCategory {

    STRENGTH = 'STRENGTH',

    GYM = 'GYM',

    CARDIO = 'CARDIO',

}

export const MAIN_CATEGORY_LABELS : {[key in MainCategory]: string} = {
    [MainCategory.STRENGTH]: 'Strength',
    [MainCategory.GYM]: 'Gym',
    [MainCategory.CARDIO]: 'Cardio',
}

export const MAIN_SUB_CATEGORY_STRUCTURE: { [key in MainCategory]: SubCategory[] } = {

    [MainCategory.STRENGTH]: [
        SubCategory.SQUAT,
        SubCategory.SNATCH,
        SubCategory.SLED,
        SubCategory.ROW,
        SubCategory.PRESS,
        SubCategory.OLYMPIC_LIFT,
        SubCategory.JERK,
        SubCategory.DEADLIFT,
        SubCategory.CLEAN,
        SubCategory.OTHER,
    ],

    [MainCategory.GYM]: [],

    [MainCategory.CARDIO]: [],

}

export function findMainCategory(subCategory: SubCategory): MainCategory {
    let category = Object
        .keys(MAIN_SUB_CATEGORY_STRUCTURE)
        .map((key) => key as MainCategory)
        .find((mainCategory) => MAIN_SUB_CATEGORY_STRUCTURE[mainCategory].includes(subCategory));

    if (!category) {
        throw new Error(`The sub-category ${subCategory} cannot be linked to a main category.`);
    }

    return category;
}