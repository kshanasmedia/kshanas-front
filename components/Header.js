import Image from "next/image";
import Link from "next/link";
import logo from '../public/kshanas.svg'

export default function Header(){
    return(
        <header>
            <nav>
                <Image  src={logo} height={49.5} width={72} />
            </nav>
            <nav style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <div>
                    
                    <Link href="/docs">
                        <a>Docs</a>
                    </Link>
                    <Link href="https://github.com/kshanasmedia">
                        <a>Github</a>
                    </Link>
                    <Link href="/signup">
                        <a>Sign up</a>
                    </Link>
                    <Link href="/signin">
                        <a>Sign in</a>
                    </Link>

                </div>
                <div>
                </div>
            </nav>
        </header>
    )
}