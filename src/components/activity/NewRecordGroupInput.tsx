import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";

type Props = {
    toto?: string,
};

export function NewRecordGroupInput({toto}: Props) {
    console.log(toto);
    const [editing, setEditing] = useState<boolean>(false);
    const [label, setLabel] = useState('');


    if (editing) {
        return <span>
                <input
                    value={label}
                    type="number"
                    autoFocus
                    placeholder={label}
                    onChange={(e) => setLabel(e.target.value)}
                    onClick={async (e) => {
                        e.stopPropagation();

                        setEditing(false);
                        //await onEditFinished();
                    }}
                    onMouseDown={async (e) => {
                        e.stopPropagation();

                        setEditing(false);
                        //await onEditFinished();
                    }}
                    onKeyDown={async (e) => {
                        if (e.key === 'Enter') {
                             (e.target as HTMLInputElement).blur();
                             e.preventDefault();
                             e.stopPropagation();

                             setEditing(false);
                            // await onEditFinished();
                        }
                    }}
                    style={{
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        font: 'inherit',
                        width: '3rem',
                        marginRight: '0.5rem',
                        textAlign: 'left'
                    }}
                />
                REPS
            </span>;
    } else {
        return <>
            <AddIcon onClick={() => setEditing(true)}/>
        </>;
    }
}