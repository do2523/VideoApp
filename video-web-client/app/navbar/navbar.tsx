import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css"

export default function Navbar() {
    return (
        <div>
            <Link href="/">
                <Image width={350} height={100} 
                    src="/VideoWebAppLogo.png" alt="Video Web App Logo"/>
            </Link>
        </div>
    );
}