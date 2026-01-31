import {ActivityContext, ActivityDisplay} from "./activity-display.tsx";
import {Sequence} from "../../../model/wod/activity/sequence.ts";
import style from "./Activity.module.scss";
import {ActivityBox} from "./activity-box.tsx";

type Props = {
    sequence: Sequence,
    parentContext: ActivityContext,
};

export function SequenceDisplay({sequence, parentContext}: Props) {
    const currentContext: ActivityContext = {
        editing: parentContext.editing,
        activity: sequence,
    };

    return (
        <ActivityBox delimiterTitle={sequence.name}
                     parentContext={parentContext}
                     context={currentContext}
                     onAction={() => console.log("edit")}>
            <div className={style.sequenceActivity}>
                {sequence.activities.map(activity => {
                    return <div key={activity.id}>
                        <ActivityDisplay activity={activity} parentContext={currentContext}/>
                    </div>;
                })}
            </div>
        </ActivityBox>
    );
}