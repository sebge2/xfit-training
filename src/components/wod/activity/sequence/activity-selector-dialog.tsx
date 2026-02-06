import {useActionState, useRef} from "react";
import {FormState} from "../../../../model/core/form/form-state.ts";
import {FormStack} from "../../../core/form/FormStack.tsx";
import {FormDialog} from "../../../core/interaction/FormDialog.tsx";
import {ACTIVITY_TYPE_LABELS, ActivityType} from "../../../../model/wod/activity/activity-type.ts";
import {FormField} from "../../../../model/core/form/form-field.ts";
import {getTextValue, validateRequiredFields} from "../../../../utils/form-utils.ts";
import {Selector, SelectorItem} from "../../../core/form/Selector.tsx";

export type Props = {
    open: boolean,

    onSelected: (activity: ActivityType) => void,
    onCancel: () => void,
}

// TODO handle autofocus
export function ActivitySelectorDialog({open, onSelected: onSelectedDelegate, onCancel}: Props) {
    const activityField = new FormField<ActivityType>('activity', 'Activity', ActivityType.EXERCISE, true);
    const originalFormState = FormState.create([activityField]);
    const [state, formAction] = useActionState<FormState, FormData>(onSelected, originalFormState);
    const items: SelectorItem<ActivityType>[] = Object.values(ActivityType).map(type => ({value: type, label: ACTIVITY_TYPE_LABELS[type]}));
    const formRef = useRef<HTMLFormElement>(null);

    function onConfirmed() {
        formRef.current?.requestSubmit();
    }

    async function onSelected(prev: FormState, formData: FormData): Promise<FormState> {
        const newState = prev.reset();

        validateRequiredFields(newState, formData);

        if (newState.isSuccessful) {
            onSelectedDelegate(getTextValue(activityField, formData) as ActivityType);
        }

        return newState;
    }

    return <FormDialog text="Add activity to sequence" open={open} onOk={onConfirmed} onCancel={onCancel}>
        <form ref={formRef} action={formAction}>
            <FormStack>
                <Selector formField={state.fieldById[activityField.id] as FormField<string | undefined>} items={items} />
            </FormStack>
        </form>
    </FormDialog>;
}