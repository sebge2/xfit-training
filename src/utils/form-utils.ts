import {FormState} from "../model/core/form/form-state.ts";
import {InputTextFormField} from "../components/core/form/InputText.tsx";
import {InputNumberFormField} from "../components/core/form/InputNumber.tsx";
import {InputDateFormField} from "../components/core/form/DatePicker.tsx";
import {MeasureUnitField} from "../components/activity/MeasureUnitSelector.tsx";
import {SubCategory} from "../model/exercise/sub-category.ts";
import {CategoryFormField, fromCategorySelector} from "../components/activity/CategorySelector.tsx";
import {MeasureUnit} from "../model/exercise/measure-unit.ts";
import {ExerciseTagFormField} from "../components/activity/ExerciseTagSelector.tsx";
import {ExerciseTag} from "../model/exercise/exercise-tag.ts";
import {WodTag} from "../model/wod/wod-tag.ts";
import {WodTagFormField} from "../components/activity/WodTagSelector.tsx";
import {MainCategory} from "../model/exercise/main-category.ts";
import React from "react";

export function validateRequiredFields(state: FormState, formData: FormData) {
    state.fields
        .filter(field => field.required)
        .forEach(field => {
            const fieldValue = formData.get(field.id);

            if (_isEmpty(fieldValue)) {
                field.addError('Please enter a value.');
            }
        })
}

export function getTextValue(formField: InputTextFormField, formData: FormData): string | undefined {
    return formData.get(formField.id) as string | undefined;
}

export function getNumberValue(formField: InputNumberFormField, formData: FormData): number | undefined {
    const fieldValue = formData.get(formField.id) as string | undefined;

    if (_isEmpty(fieldValue)) {
        return undefined;
    }

    return Number(fieldValue);
}

export function getDateValue(formField: InputDateFormField, formData: FormData): Date | undefined {
    const fieldValue = formData.get(formField.id) as string | undefined;

    if (_isEmpty(fieldValue)) {
        return undefined;
    }

    return new Date(fieldValue as string);
}

export function getMeasureUnitValue(formField: MeasureUnitField, formData: FormData): MeasureUnit {
    return formData.get(formField.id) as MeasureUnit;
}

export function getSubCategoryValue(formField: CategoryFormField, formData: FormData): {
    mainCategory: MainCategory,
    subCategory: SubCategory
} {
    return fromCategorySelector(formData.get(formField.id) as string);
}

export function getExerciseTagsValue(formField: ExerciseTagFormField, formData: FormData): ExerciseTag[] {
    return ((formData.get(formField.id) || '') as string).split(',') as ExerciseTag[];
}

export function getWodTagsValue(formField: WodTagFormField, formData: FormData): WodTag[] {
    return ((formData.get(formField.id) || '') as string).split(',') as WodTag[];
}

export function sendFormOnEnter(e: React.KeyboardEvent<HTMLElement>): boolean {
    if (e.key !== "Enter") {
        return false;
    }

    const form = (e.currentTarget as HTMLElement).closest("form") as HTMLFormElement | null;
    form?.requestSubmit();

    return true;
}

function _isEmpty(fieldValue: File | string | null | undefined) {
    return !fieldValue || fieldValue.toString().trim() === '';
}
