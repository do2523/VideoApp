'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css"
import SignIn from "./sign-in";

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image width={350} height={100} 
                    src="/VideoWebAppLogo.png" alt="Video Web App Logo"/>
            </Link>
            <SignIn />
        </nav>
    );
}