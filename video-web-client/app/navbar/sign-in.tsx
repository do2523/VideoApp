import { Fragment } from 'react';
import { signInWithGoogle, signOut } from '../firebase/firebase';
import styles from './sign-in.module.css';


export default function SignIn() {
    return (
        <Fragment>
        <button className={styles.signin} onClick={signOut}>
            Sign Out
        </button>
        <button className={styles.signin} onClick={signInWithGoogle}>
            Sign In
        </button>
        </Fragment>
    )
}