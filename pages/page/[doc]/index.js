import Link from "next/link";
import DocDisplay from "../../../components/DocDisplay";
import styles from '../../../styles/Doc.module.css';
import { base_url } from "../../../utils/constants";
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

    const result = await fetch(`${base_url}/api/doc/${context.params.doc}`)
                            .then(res=>res.json()).catch((err)=>{
                                return null;
                            });
    // console.log(result);
    
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