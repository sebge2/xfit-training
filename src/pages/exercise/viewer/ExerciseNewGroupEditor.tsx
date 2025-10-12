import Box from "@mui/material/Box";
import {ActionsContainer} from "../../../components/core/interaction/ActionsContainer.tsx";
import {AddButton} from "../../../components/core/buttton/AddButton.tsx";
import {MeasureUnit} from "../../../model/exercise/measure-unit.ts";
import {useState} from "react";

type Props = {
    unit: MeasureUnit,
    onCreate: (group: number) => Promise<void> | void,
};

export function ExerciseNewGroupEditor({unit, onCreate}: Props) {
    console.log(unit);
    const [groups, setGroups] = useState<number | ''>('');

    function onAdd() {
        onCreate(groups as number);
    }

    return <>
        <Box component="section">
            <h3>Add records for the number of REPS</h3>

            <input type="number" min="1" value={groups} onChange={e => setGroups(parseInt(e.target.value))}/>
        </Box>

        <ActionsContainer>
            <AddButton disabled={!groups || (groups <= 0)} onAdd={onAdd}/>
        </ActionsContainer>
    </>;
}