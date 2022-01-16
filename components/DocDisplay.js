import Link from 'next/link';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import styles from '../styles/Doc.module.css';

export default function DocDisplay({data}){

    const {asPath} = useRouter();
    // console.log(asPath);
    const re_pattern = /#/i;
    const re_result_temp = asPath.split(re_pattern);
    const re_result = (re_result_temp.length>1? re_result_temp[1]:'');

    let _num = 0;

    const reference_jsx = (ele)=>{
        if(ele==null || ele==undefined){
            return null;
        }else{
            _num = ele+1;
            return(
                <sup id={"refn"+_num.toString()} className={(re_result==="refn"+_num.toString())?styles['active']:null} key={_num}>
                    <Link href={"#ref"+_num.toString()}><a>[{_num}]</a></Link>
                </sup>
            )   
        }
    }

    const displayMedia = (ele)=>{
        return(
            <div className={styles['media']}>
                <span dangerouslySetInnerHTML={{__html: ele?.img}}/>
                <i>{ele?.desc}{reference_jsx(ele?.ref)}</i>
            </div>
        )
    }

    return(
        <div className={styles['doc--container']}>
            <div className={styles['doc--core']}>

                <div className={styles['doc--head']}>
                    <h1>Topic</h1>
                </div>
                
                <div className={styles['doc--intro']}>

                    <div>
                        {data?.intro.map((__intro, __index)=>{
                            return(
                                <span key={__index}>
                                    <span dangerouslySetInnerHTML={{__html:__intro.data}}></span>{reference_jsx(__intro.ref)}
                                </span>
                            )
                        })}
                    </div>

                    <div>
                        {data?.media.map((__media, __index)=>{
                            return (
                                <span key={__index}>
                                    {displayMedia(__media)}
                                </span>
                                )
                            })}
                    </div>

                </div>

                <div className={styles['doc--contents']}>
                    <h3>Table of Contents</h3>
                    <ol>
                        {data?.tableOfContents.map((__section, __index)=>{
                            return(
                                <li key={__index}>
                                    {__index+1}. &nbsp;
                                    <Link href={"#sec"+(__index+1).toString()}><a>{__section.name}</a></Link>
                                    {__section.subsections.length>0?
                                    <ol>
                                        {__section.subsections.map((__subsec, __sindex)=>{
                                            _num = (__index+1).toString()+"."+(__sindex+1).toString();
                                            return(
                                                <li key={_num}>{_num} &nbsp;<Link href={"#sec"+_num}><a>{__subsec.name}</a></Link></li>
                                            )
                                        })}
                                    </ol>
                                    :
                                    null}
                                </li>
                                )
                            })}
                    </ol>
                </div>

                <>
                {data?.sections.map((__section, __index)=>{
                    return(
                    <>
                    <h2>{__section.name}</h2>
                    <div id={"sec"+(__index+1).toString()} className={styles['doc--section']}>
                        <div className={styles['doc--section--text']}>
                        <div>
                            {__section.text.map((__text, __id)=>{
                                return(
                                    <span key={__id}>
                                        <span dangerouslySetInnerHTML={{__html:__text.data}}></span>{reference_jsx(__text.ref)}
                                    </span>
                                )
                            })}
                        </div>
                        <div>{__section.subsections.map((__subsec,__sindex)=>{
                            _num = (__index+1).toString()+"."+(__sindex+1).toString();
                            return(
                                <div id={"sec"+_num} key={__sindex}>
                                    <h3 key={__sindex}>{__subsec.name}</h3>
                                    {__subsec.text.map((__text, __idd)=>{
                                        return(
                                            <span key={__idd}>
                                                <span dangerouslySetInnerHTML={{__html:__text.data}}></span>{reference_jsx(__text.ref)}
                                            </span>
                                        )
                                    })}
                                </div>
                            )
                        })}</div>
                        </div>
                        <div>
                            {__section?.media.map((__media, __index)=>{
                                return (
                                    <span key={__index}>
                                        {displayMedia(__media)}
                                    </span>
                                    )
                                })}
                        </div>
                    </div>
                    </>
                    )
                })}
                </>

                <div className={styles['doc--references']}>
                    <h2>References</h2>
                    <ol className={styles['ref-ol']}>
                        {data?.references.map((__ref,__index)=>{
                            _num = __index+1;
                            return(
                                <li id={"ref"+_num.toString()} className={(re_result==="ref"+_num.toString())?styles['active']:null} key={_num}>
                                    {_num}. <Link href={"#refn"+_num.toString()}><a>^ </a></Link>
                                    {__ref.title} It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using
                                </li>
                            )
                        })}
                    </ol>
                </div>

            </div>
        </div>
    )
}