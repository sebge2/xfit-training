import {Amrap} from "../../../../model/wod/activity/amrap.ts";
import {ForTime} from "../../../../model/wod/activity/for-time.ts";
import {FormField} from "../../../../model/core/form/form-field.ts";
import {FormState} from "../../../../model/core/form/form-state.ts";
import {useActionState, useRef} from "react";
import {getTextValue, validateRequiredFields} from "../../../../utils/form-utils.ts";
import {Duration} from "../../../../model/wod/activity/duration.ts";
import {FormDialog} from "../../../core/interaction/FormDialog.tsx";
import {FormStack} from "../../../core/form/FormStack.tsx";
import {InputText} from "../../../core/form/InputText.tsx";

type Props = {
    forTime: ForTime,
    editing: boolean,
    onUpdate: (activity: Amrap) => void,
    onCancel: () => void,
}

export function ForTimeDataEditor({forTime, editing, onUpdate, onCancel}: Props) {
    const durationField = new FormField<string>('duration', 'Duration', forTime.duration.hours + '', true);
    const commentField = new FormField<string | undefined>('comment', 'Comment', forTime.comment, false);

    const originalFormState = FormState.create([durationField, commentField]);
    const [state, formAction] = useActionState<FormState, FormData>(onSelected, originalFormState);
    const formRef = useRef<HTMLFormElement>(null);

    function onConfirmed() {
        formRef.current?.requestSubmit();
    }

    async function onSelected(prev: FormState, formData: FormData): Promise<FormState> {
        const newState = prev.reset();

        validateRequiredFields(newState, formData);

        if (newState.isSuccessful) {
            onUpdate(forTime.updateData({
                duration: new Duration(0, 1, 2),
                comment: getTextValue(commentField, formData),
            }));
        }

        return newState;
    }

    return <FormDialog text="Edit" open={editing} onOk={onConfirmed} onCancel={onCancel}>
        <form ref={formRef} action={formAction}>
            <FormStack>
                {/*TODO duration editor*/}
                <InputText formField={state.fieldById[durationField.id] as FormField<string | undefined>}/>

                <InputText formField={state.fieldById[commentField.id] as FormField<string | undefined>}/>
            </FormStack>
        </form>
    </FormDialog>;
}