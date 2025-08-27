import {auth, googleProvider} from '../firebase'; // Adjust the path to your Firebase config file
import {signInWithPopup} from 'firebase/auth';
import {CurrentUser} from "../model/auth/current-user.ts";

export class AuthenticationService {

    get currentUser(): CurrentUser | null {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            return null;
        }

        return CurrentUser.fromDto(currentUser);
    }

    get currentUserOrFail(): CurrentUser {
        const user = this.currentUser;

        if (!user) {
            throw new Error('There is no authenticated user.');
        }

        return user;
    }

    async login() {
        await signInWithPopup(auth, googleProvider);
    }

    async logout() {
        await auth.signOut();
    }
}

export const AUTHENTICATION_SERVICE = new AuthenticationService();