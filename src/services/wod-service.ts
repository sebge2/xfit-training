import {collection, doc, DocumentSnapshot, getDoc, getDocs} from "firebase/firestore";
import {db} from "../firebase";
import {Wod} from "../model/activity/wod.ts";
import {WodDto} from "../model/dto/wod/wod.dto.ts";
import {Activity} from "../model/activity/activity.ts";

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
            .map(dto => this._mapFromDto(dto as DocumentSnapshot<WodDto>))
            .filter(exercise => exercise !== null);
    }

    async findById(id: string): Promise<Wod | null> {
        const snapshot = await getDoc(doc(db, WODS_COLLECTION, id));

        if (!snapshot.exists()) {
            return null;
        }

        return this._mapFromDto(snapshot as DocumentSnapshot<WodDto>);
    };

    private _mapFromDto(snapshot: DocumentSnapshot<WodDto>): Wod | null {
        const data = snapshot.data();
        if (!data) {
            return null;
        }

        return new Wod(
            snapshot.id,
            null as Activity,
            data.name,
            data.tags || [],
            data.comment
        );
    }
}

export const WOD_SERVICE = new WodService();