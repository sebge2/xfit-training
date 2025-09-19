import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentSnapshot,
    getDoc,
    getDocs,
    UpdateData,
    updateDoc
} from "firebase/firestore";
import {db} from "../firebase";
import {Wod} from "../model/wod/wod.ts";
import {WodDto} from "../model/dto/wod/wod.dto.ts";

const WODS_COLLECTION = "wods";

export class WodService {

    constructor() {
    }

    async findAll(): Promise<Wod[]> {
        const wods = await getDocs(collection(db, WODS_COLLECTION));

        if (wods.empty) {
            return [];
        }

        return wods.docs
            .map(dto => this._mapWodFromDto(dto as DocumentSnapshot<WodDto>))
            .filter(exercise => exercise !== null);
    }

    async findById(id: string): Promise<Wod | null> {
        const snapshot = await getDoc(doc(db, WODS_COLLECTION, id));

        if (!snapshot.exists()) {
            return null;
        }

        return this._mapWodFromDto(snapshot as DocumentSnapshot<WodDto>);
    }

    async create(wod: Wod): Promise<Wod | null> {
        const docRef = await addDoc(collection(db, WODS_COLLECTION), Wod.toDto(wod));

        wod.id = docRef.id;

        return wod;
    }

    async update(wod: Wod): Promise<Wod | null> {
        await updateDoc(
            this._getWodReference(wod),
            Wod.toDto(wod) as UpdateData<WodDto>
        );

        return wod;
    }

    async delete(id: string): Promise<void> {
        return await deleteDoc(doc(db, WODS_COLLECTION, id));
    }

    private _getWodReference(wod: Wod) {
        return doc(db, WODS_COLLECTION, wod.id as string);
    }

    private _mapWodFromDto(snapshot: DocumentSnapshot<WodDto>): Wod | null {
        const data = snapshot.data();
        if (!data) {
            return null;
        }

        return Wod.fromDto(snapshot.id, data);
    }
}

export const WOD_SERVICE = new WodService();