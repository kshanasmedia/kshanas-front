import DocDisplay from "../../../components/DocDisplay";
import Sidebar from "../../../components/Sidebar";
import data from '../../../utils/data.json';
import styles from '../../../styles/Doc.module.css';
import Link from "next/link";

export default function Doc(){



    return(
        <div className={styles['doc--container']}>
            <DocDisplay data={data}/>
        </div>
    )
}