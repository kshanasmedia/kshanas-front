import Link from "next/link";
import { useState } from "react";
import DocDisplay from "../../components/DocDisplay";
import styles from '../../styles/Preview.module.css';


export default function Preview(props){

    const [username, setUsername] = useState('');
    const [repo, setRepo] = useState('');
    const [filename, setFilename] = useState('');
    const [branch, setBranch] = useState('');
    const [data, setData] = useState(null);

    // console.log(data);
    const submitHandler = async (event)=>{
        event.preventDefault();
        let params = {fileId:filename, owner: username, repo: repo};
        if(branch && branch!='') params = {...params, branch: branch}
        let site_prefix = 'http://localhost:3000';
        if(process.env.SITE_PREFIX){
            site_prefix = process.env.SITE_PREFIX;
            // console.log(site_prefix)
        }

        let url = new URL(`${site_prefix}/api/preview`);
        url.search = new URLSearchParams(params).toString();
    
        const result = await fetch(url)
                                .then(res=>res.json()).catch((err)=>{
                                    return null;
                                });
        console.log(result);
        if(result?.data) setData(result?.data);
        // console.log('here')
    }

    return(
        <>
        <div className={styles['container']}>
            <form onSubmit={submitHandler}>
                <div className="field-group">
                    <label>Github Username</label>
                    <input onChange={(e)=>{setUsername(e.target.value)}} placeholder="kshanasmedia" id="github-account" type="text" autoComplete="github-account" required/>
                </div>
                <div className="field-group">
                    <label>Repository Name</label>
                    <input onChange={(e)=>{setRepo(e.target.value)}} placeholder="database" id="repo" type="repo" autoComplete="repo" required/>
                </div>
                <div className="field-group">
                    <label>File Name (exclude `{".md"}`, extension)</label>
                    <input onChange={(e)=>{setFilename(e.target.value)}} placeholder="demo" id="fileID" type="text" autoComplete="fileID" required/>
                </div>
                <div className="field-group">
                    <label>Branch (if different from main or master)</label>
                    <input onChange={(e)=>{setBranch(e.target.value)}} id="branch" type="text" autoComplete="branch"/>
                </div>
                <div className="field-group">
                    <button disabled={filename=='' || repo=='' || username==''} onClick={submitHandler} className={styles['button-65']}>Submit+Refresh</button>
                </div>
            </form>
            <div className={styles["meta"]}>
                {data && <span>
                    Click 
                    <Link href={`https://github.com/${username}/${repo}/blob/${branch!=''? branch:'main'}/en/${filename}.md`}><a> here </a></Link>
                    to edit the document.
                    </span>
                }
            </div>
        </div>
        {data && <div>
            <div className={styles['watermark']}>PREVIEW</div>
            <DocDisplay data={data}/>
        </div>
        }
        </>
    )
    
}