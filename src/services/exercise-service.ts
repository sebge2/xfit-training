import {
    addDoc,
    collection,
    doc,
    DocumentSnapshot,
    getDoc,
    getDocs,
    serverTimestamp,
    UpdateData,
    updateDoc
} from "firebase/firestore";
import {db} from "../firebase";
import {Exercise} from "../model/exercise/exercise.ts";
import {ExerciseDto} from "../model/dto/exercise/exercise.dto.ts";
import {AllCategoriesExercises} from "../model/exercise/all-categories-exercises.ts";

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

    async findAllGrouped(): Promise<AllCategoriesExercises> {
        const allCategories = AllCategoriesExercises.empty();

        const exercises = await this.findAll();

        exercises
            .forEach(exercise => allCategories
                .getCategory(exercise.category)
                .getSubCategory(exercise.subCategory)
                .addExercise(exercise)
            );

        return allCategories;
    }

    async findById(id: string): Promise<Exercise | null> {
        const snapshot = await getDoc(this._getExerciseRef(id));

        if (!snapshot.exists()) {
            return null;
        }

        return this._mapFromDto(snapshot as DocumentSnapshot<ExerciseDto>);
    }

    async create(exercise: Exercise): Promise<Exercise | null> {
        const docRef = await addDoc(collection(db, EXERCISES_COLLECTION), Exercise.toDto(exercise));

        exercise.id = docRef.id;

        return exercise;
    }

    async update(exercise: Exercise): Promise<Exercise> {
        await updateDoc(
            this._getExerciseRef(exercise.id as string),
            {
                ...Exercise.toDto(exercise),
                updatedAt: serverTimestamp()
            } as UpdateData<ExerciseDto>
        );

        return exercise;
    }

    private _mapFromDto(snapshot: DocumentSnapshot<ExerciseDto>): Exercise | null {
        const data = snapshot.data();
        if (!data) {
            return null;
        }

        return Exercise.fromDto(snapshot.id, data);
    }

    private _getExerciseRef(id: string) {
        return doc(db, EXERCISES_COLLECTION, id);
    }
}

export const EXERCISE_SERVICE = new ExerciseService();