import {collection, doc, DocumentSnapshot, getDoc, getDocs} from "firebase/firestore";
import {db} from "../firebase";
import {Exercise} from "../model/exercise/exercise.ts";
import {ExerciseDto} from "../model/dto/exercise/exercise.dto.ts";

const EXERCISES_COLLECTION = "exercises";

export class ExerciseService {

    constructor() {
    }

    async findAll(): Promise<Exercise[]> {
        const exercises = await getDocs(collection(db, EXERCISES_COLLECTION));

        if (exercises.empty) {
            return [];
        }

        return exercises.docs
            .map(dto => this._mapFromDto(dto as DocumentSnapshot<ExerciseDto>))
            .filter(exercise => exercise !== null);
    }

    async findById(id: string): Promise<Exercise | null> {
        const snapshot = await getDoc(doc(db, EXERCISES_COLLECTION, id));

        if (!snapshot.exists()) {
            return null;
        }

        return this._mapFromDto(snapshot as DocumentSnapshot<ExerciseDto>);
    };

    private _mapFromDto(snapshot: DocumentSnapshot<ExerciseDto>): Exercise | null {
        const data = snapshot.data();
        if (!data) {
            return null;
        }

        return new Exercise(
            snapshot.id,
            data.name,
            data.tags || [],
            data.comment
        );
    }
}

export const EXERCISES_SERVICE = new ExerciseService();