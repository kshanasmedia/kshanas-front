import Link from "next/link";
import DocDisplay from "../../../components/DocDisplay";
import styles from '../../../styles/Doc.module.css';
import Error404 from "../../404";

export default function Doc(props){

    const {data} = props;

    // console.log(data);

    if(data){
    return(
        <div className={styles['doc--container']}>
            <DocDisplay data={data}/>
        </div>
    )
    }else{
        return <Error404>
            Want to create this page? Click <Link href="https://github.com/kshanasmedia/database"><a>here</a></Link> to contribute
        </Error404>
    }
}

export async function getServerSideProps(context) {

    const site_prefix = 'localhost:3000';
    if(process.env.SITE_PREFIX){
        site_prefix = process.env.SITE_PREFIX;
    }

    const result = await fetch(`http://${site_prefix}/api/${context.params.doc}`)
                            .then(res=>res.json()).catch((err)=>{
                                return {'data':null}
                            });
    
    if(result?.data){
        return {
          props: {
              data: result?.data
          }, // will be passed to the page component as props
        }
    }else{
        return {
            props: {
                data: null
            }
        }
    }                    
}