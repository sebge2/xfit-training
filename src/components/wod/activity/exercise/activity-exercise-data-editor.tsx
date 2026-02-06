import {ActivityExercise} from "../../../../model/wod/activity/activity-exercise.ts";
import {useActionState, useRef} from "react";
import {FormStack} from "../../../core/form/FormStack.tsx";
import {FormField} from "../../../../model/core/form/form-field.ts";
import {FormDialog} from "../../../core/interaction/FormDialog.tsx";
import {FormState} from "../../../../model/core/form/form-state.ts";
import {getTextValue, validateRequiredFields} from "../../../../utils/form-utils.ts";
import {InputText} from "../../../core/form/InputText.tsx";

type Props = {
    exercise: ActivityExercise,
    editing: boolean,
    onUpdate: (activity: ActivityExercise) => void,
    onCancel: () => void,
}

export function ActivityExerciseDataEditor({exercise, editing, onUpdate, onCancel}: Props) {
    const repetitionField = new FormField<string>('repetitions', 'Repetitions', exercise.repetitions, true);
    const exerciseField = new FormField<string>('exercise', 'Exercise', exercise.exercise, true);
    const commentField = new FormField<string | undefined>('comment', 'comment', exercise.comment, false);

    const originalFormState = FormState.create([repetitionField, exerciseField, commentField]);
    const [state, formAction] = useActionState<FormState, FormData>(onSelected, originalFormState);
    const formRef = useRef<HTMLFormElement>(null);

    function onConfirmed() {
        formRef.current?.requestSubmit();
    }

    async function onSelected(prev: FormState, formData: FormData): Promise<FormState> {
        const newState = prev.reset();

        validateRequiredFields(newState, formData);

        if (newState.isSuccessful) {
            onUpdate(exercise.updateData({
                repetitions: getTextValue(repetitionField, formData) as string,
                exercise: getTextValue(exerciseField, formData) as string,
                comment: getTextValue(commentField, formData),
            }));
        }

        return newState;
    }

    return <FormDialog text="Edit" open={editing} onOk={onConfirmed} onCancel={onCancel}>
        <form ref={formRef} action={formAction}>
            <FormStack>
                <InputText formField={state.fieldById[repetitionField.id] as FormField<string | undefined>}/>

                {/*TODO auto complete exercises*/}
                <InputText formField={state.fieldById[exerciseField.id] as FormField<string | undefined>}/>

                <InputText formField={state.fieldById[commentField.id] as FormField<string | undefined>}/>
            </FormStack>
        </form>
    </FormDialog>;
}