import Link from "next/link";
import DocDisplay from "../../../components/DocDisplay";
import styles from '../../../styles/Doc.module.css';
import Error404 from "../../404";

export default function Doc(props){

    const {data} = props;

    // console.log(data);

    if(data){
        return(
            <div>
                <DocDisplay data={data}/>
            </div>
        )
    }else{
        return (
            <Error404>
                Want to create this page? Click <Link href="https://github.com/kshanasmedia/database"><a>here</a></Link> to contribute
            </Error404>
        )
    }
}

export async function getServerSideProps(context) {

    let site_prefix = 'http://localhost:3000';
    if(process.env.SITE_PREFIX){
        site_prefix = process.env.SITE_PREFIX;
        // console.log(site_prefix)
    }

    const result = await fetch(`${site_prefix}/api/doc/${context.params.doc}`)
                            .then(res=>res.json()).catch((err)=>{
                                return null;
                            });
    console.log(result);
    
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