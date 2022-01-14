import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/kshanas.png'

export default function Sidebar({children}){
    return(
        <div className="sidebar">
            
            <div className="general-sidebar">
                <Link href="/h"><a>Kshanas</a></Link>
                <Link href="/h"><a>Vision</a></Link>
                <Link href="/h"><a>About</a></Link>
                <Link href="/h"><a>Contribute</a></Link>
            </div>
            <div className="custom-sidebar">
                Custom
                {children}
            </div>
        </div>
    )
}