import {doc, getDoc, UpdateData, updateDoc} from "firebase/firestore";
import {db} from "../firebase.ts";
import {UserExerciseRecordsDto} from "../model/dto/record/user-exercise-records.dto.ts";
import {UserExerciseRecords} from "../model/record/user-exercise-records.tsx";
import {AUTHENTICATION_SERVICE} from "./authentication-service.ts";
import {UserRecord} from "../model/record/user-record.tsx";
import {UserExerciseGroupRecords} from "../model/record/user-exercise-group-records.tsx";
import {ExerciseDto} from "../model/dto/exercise/exercise.dto.ts";

const RECORDS_COLLECTION = "records";

export class UserRecordsService {

    async findForCurrentUserAndExercise(exerciseId: string): Promise<UserExerciseRecords> {
        const userRecords = await getDoc(this._getRef(exerciseId));

        return UserExerciseRecords.fromDto(userRecords.data() as UserExerciseRecordsDto);
    }

    async addUserRecord(exerciseId: string, group: UserExerciseGroupRecords, newRecord: UserRecord): Promise<void> {
        const userRecords: UserExerciseRecords = await this.findForCurrentUserAndExercise(exerciseId);

        userRecords.group(group.id).addRecord(newRecord);

        await this._updateRecords(exerciseId, userRecords);
    }

    async deleteUserRecord(exerciseId: string, group: UserExerciseGroupRecords, record: UserRecord): Promise<void> {
        const userRecords: UserExerciseRecords = await this.findForCurrentUserAndExercise(exerciseId);

        userRecords.group(group.id).deleteRecord(record);

        await this._updateRecords(exerciseId, userRecords);
    }

    private _getRef(exerciseId: string) {
        return doc(db, RECORDS_COLLECTION, AUTHENTICATION_SERVICE.currentUserOrFail.email, 'exercises', exerciseId);
    }

    private async _updateRecords(exerciseId: string, userRecords: UserExerciseRecords) {
        await updateDoc(
            this._getRef(exerciseId),
            UserExerciseRecords.toDto(userRecords) as UpdateData<ExerciseDto>
        );
    }
}

export const USER_RECORDS_SERVICE = new UserRecordsService();