import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar(){
    return(
        <div className="sidebar">
            
            <div className="general-sidebar">
                <Link href="/"><a>Kshanas</a></Link>
                <Link href="/vision"><a>Vision</a></Link>
                <Link href="/about"><a>About</a></Link>
                <Link href="/contribute"><a>Contribute</a></Link>
            </div>
            <div className="custom-sidebar">
                {/* <Link href="/404"><a>Motivation</a></Link>
                <Link href="/404"><a>Our Team</a></Link> */}
            </div>
        </div>
    )
}