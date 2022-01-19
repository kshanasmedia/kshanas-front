import Link from "next/link";
import styles from "../../styles/Page.module.css";
import { Octokit } from "octokit";
const octokit = new Octokit({auth: process.env.API_TOKEN});

export default function Page(props){
    const {data} = props;

    console.log(data);

    return(
        <div className={styles['container']}>
            <div className={styles['core']}>
                <h2>Files</h2>
                <div>
                    {data?.map((_elm, _index)=>{
                        return(
                            <li key={_elm.fileId}>
                                <Link href={`page/${_elm.fileId}`}><a>{_elm.name}</a></Link> [<span><a href={_elm.html_url}>Source File</a>]</span>
                            </li>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps() {

    const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}',{
        owner:'kshanasmedia',
        path: 'en',
        repo: 'database'
    })
    const pattern0 = /\./g;
    const pattern = /_/g;

    const modifyName = (nam)=>{
        const md = nam.split(pattern0);
        let td = md[0].split(pattern);
        let newName = '';
        for(let k=0;k<td.length;k++){
            newName += td[k]+" ";
        }

        return {
            name: newName.trim(),
            fileId: md[0]
        }
    }

    const data = res?.data.map(d=>{
        // console.log(d)
        return {
            ...modifyName(d.name),
            html_url:d.html_url,
            url:d.url
        }
    })

    return {
        props: {
            data
        }
    }
                     
}