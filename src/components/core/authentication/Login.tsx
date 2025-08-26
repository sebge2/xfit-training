import { auth, googleProvider } from '../../../firebase';  // Adjust the path to your Firebase config file
import { signInWithPopup } from 'firebase/auth';

export function Login(){

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            alert('Signed in successfully with Google'); // TODO
        } catch (error) {
            console.error('Error signing in with Google', error); // TODO
        }
    };


    return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}