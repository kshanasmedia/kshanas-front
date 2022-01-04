import Link from 'next/link';
import Sidebar from '../../../components/Sidebar';
import styles from '../../../styles/Doc.module.css';

export default function Doc(){
    return(
        <div className={styles['doc--container']}>
            <Sidebar>
                <Link href="/help">
                    <a>Menu</a>
                </Link>
            </Sidebar>
            <div className={styles['doc--core']}>
                This is document page.
            </div>
        </div>
    )
}