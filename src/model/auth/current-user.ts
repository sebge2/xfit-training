import {User} from "@firebase/auth";
import {Permission} from "./permission.ts";

export class CurrentUser {

    static fromDto(dto: User): CurrentUser {
        return new CurrentUser(
            dto.displayName || '',
            dto.email || '',
            dto.photoURL || '',
        );
    }

    constructor(
        public readonly displayName: string,
        public readonly email: string,
        public readonly avatarUrl: string,
    ) {
    }

    hasPermission(_: Permission): boolean {
        return true; // TODO
    }
}