import {useActionState, useRef} from "react";
import {FormState} from "../../../../model/core/form/form-state.ts";
import {FormStack} from "../../../core/form/FormStack.tsx";
import {FormDialog} from "../../../core/interaction/FormDialog.tsx";
import {FormField} from "../../../../model/core/form/form-field.ts";
import {getNumberValue, validateRequiredFields} from "../../../../utils/form-utils.ts";
import {InputNumber} from "../../../core/form/InputNumber.tsx";
import {Activity} from "../../../../model/wod/activity/activity.ts";

export type Props = {
    open: boolean,

    activities: Activity[],
    childIndexToMove: number,

    onSelected: (index: number) => void,
    onCancel: () => void,
}

export function ActivityMoveSelector({
                                         open,
                                         activities,
                                         childIndexToMove,
                                         onSelected: onSelectedDelegate,
                                         onCancel
                                     }: Props) {

    const indexField = new FormField<number>('index', 'Index', childIndexToMove + 1, true);
    const originalFormState = FormState.create([indexField]);
    const [state, formAction] = useActionState<FormState, FormData>(onSelected, originalFormState);
    const formRef = useRef<HTMLFormElement>(null);


    function onConfirmed() {
        formRef.current?.requestSubmit();
    }

    async function onSelected(prev: FormState, formData: FormData): Promise<FormState> {
        const newState = prev.reset();

        validateRequiredFields(newState, formData);

        if (newState.isSuccessful) {
            onSelectedDelegate((getNumberValue(indexField, formData) as number) - 1);
        }

        return newState;
    }

    return <FormDialog text="Move activity at position" open={open} onOk={onConfirmed} onCancel={onCancel}>
        <form ref={formRef} action={formAction}>
            <FormStack>
                <InputNumber formField={state.fieldById[indexField.id] as FormField<number | undefined>}
                             min={1}
                             max={activities.length}/>
            </FormStack>
        </form>
    </FormDialog>;
}