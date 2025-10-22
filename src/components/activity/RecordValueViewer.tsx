import {MeasureUnit} from "../../model/exercise/measure-unit.ts";
import {formatValue} from "../../utils/value-utils.ts";

type Props = {
    value: number,
    unit: MeasureUnit,
};

export function RecordValueViewer({value, unit}: Props) {
    return formatValue(value, unit);
}