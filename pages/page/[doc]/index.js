import DocDisplay from "../../../components/DocDisplay";
import styles from '../../../styles/Doc.module.css';
import Error404 from "../../404";

export default function Doc(props){

    const {data} = props;

    if(data){
    return(
        <div className={styles['doc--container']}>
            <DocDisplay data={data}/>
        </div>
    )
    }else{
        return <Error404/>
    }
}

export async function getServerSideProps(context) {

    const result = await fetch(`http://localhost:4000/api/document/${context.params.doc}`)
                            .then(res=>res.json()).catch((err)=>{
                                return {'data':null}
                            });
    // console.log(result);

    return {
      props: {
          data: result?.data
      }, // will be passed to the page component as props
    }
}