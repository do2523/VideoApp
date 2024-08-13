'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css"
import SignIn from "./sign-in";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth"

function Navbar() {
    // Init user state
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
        setUser(user);
    })
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
    }, []);

    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image width={350} height={100} 
                    src="/VideoWebAppLogo.png" alt="Video Web App Logo"/>
            </Link>
            <SignIn user={user} />
        </nav>
    );
}

export default Navbar;