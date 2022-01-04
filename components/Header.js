import Image from "next/image";
import Link from "next/link";

export default function Header(){
    return(
        <header>
            <nav>
                <Link href="/docs">
                    <a>Docs</a>
                </Link>
                <Link href="/docs">
                    <a>Github</a>
                </Link>
                <Link href="/signup">
                    <a>Sign up</a>
                </Link>
                <Link href="/login">
                    <a>Sign in</a>
                </Link>
            </nav>
        </header>
    )
}