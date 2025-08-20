import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase.ts";
import {UserExerciseRecordsDto} from "../model/dto/record/user-exercise-records.dto.ts";
import {UserExerciseRecords} from "../model/record/user-exercise-records.tsx";

const RECORDS_COLLECTION = "records";

export class UserRecordsService {

    async findForCurrentUserAndExercise(exerciseId: string): Promise<UserExerciseRecords> {
        const userRecords = await getDoc(doc(db, RECORDS_COLLECTION, 'sebge3@gmail.com', 'exercises', exerciseId)); // TODO get current user

        return UserExerciseRecords.fromDto(userRecords.data() as UserExerciseRecordsDto);
    }
}

export const USER_RECORDS_SERVICE = new UserRecordsService();