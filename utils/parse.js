require('dotenv').config();
const {Octokit, App} = require('octokit');
const {encode, decode} = require('js-base64');

const octokit = new Octokit({auth: process.env.API_TOKEN});

const pattern = /(\\.*?{.*?})/i
const subpattern = /\\(.*?){(.*?)}/g
const mediaPattern = /\|/i

const text_type = ["ref", "section", "subsection", "media"]

function extractMediaDetails(raw_text){

    const elm = raw_text.split(mediaPattern);

    if(elm && elm.length){
        if(elm.length==1){
            return {
                'img': elm[0],
                'desc':null,
                'ref':null
            }
        }else if(elm.length==2){
            return {
                'img': elm[0],
                'desc': elm[1],
                'ref':null
            }
        }else{
            return {
                'img': elm[0],
                'desc': elm[1],
                'ref':elm[2]
            }
        }
    }else{
        return null;
    }
}

function Parser(file){
    const arr = file.split(pattern);


    let ref_id = -1
    let sec_id = -1
    let subsec_id = -1

    let return_object = {
        'intro':[],
        'sections':[],
        'media':[],
        'tableOfContents':[],
        'references':[]
    };

    for(let i=0;i<arr.length;i++){
        const md = arr[i];
        const mr = [...md.matchAll(subpattern)];
        if(mr.length && mr[0].length && text_type.includes(mr[0][1])){
            // console.log(mr[0]);
            const tt = mr[0][1];
            const td = mr[0][2];

            switch(tt){
                case "ref":
                    ref_id = ref_id + 1;
                    return_object['references'].push({'title':td});
                    const text_obj = {'ref':ref_id, 'data':null};
                    if(sec_id==-1){
                        return_object['intro'].push(text_obj);
                    }else if(subsec_id==-1){
                        return_object['sections'][sec_id]['text'].push(text_obj);
                    }else{
                        return_object['sections'][sec_id]['subsections'][subsec_id]['text'].push(text_obj);
                    }
                    break;
                case "section":
                    subsec_id = -1;
                    sec_id = sec_id + 1;
                    const sobj = {'name':td, 'text':[], 'subsections':[], 'media':[]};
                    return_object['sections'].push(sobj);
                    return_object['tableOfContents'].push({'name':td, 'subsections':[]});
                    break;
                case "subsection":
                    subsec_id = subsec_id + 1;
                    const ssobj = {
                        'name': td,
                        'text':[]
                    }
                    return_object['sections'][sec_id]['subsections'].push(ssobj);
                    return_object['tableOfContents'][sec_id]['subsections'].push({'name':td});
                    break;
                case "media":
                    const mobj = extractMediaDetails(td);
                    if(mobj && mobj?.ref){
                        const ref_obj = {
                            'title':mobj['ref']
                        }
                        ref_id = ref_id + 1;
                        return_object['references'].push(ref_obj)
                        mobj['ref'] = ref_id;
                    }
                    if(sec_id==-1){
                        return_object['media'].push(mobj);
                    }else{
                        return_object['sections'][sec_id]['media'].push(mobj);
                    }
                    break;
                default:
                    break;
            }
        }else{
            const text_obj = {'ref':null, 'data':md}
            if(sec_id==-1){
                return_object['intro'].push(text_obj);
            }else if(subsec_id==-1){
                return_object['sections'][sec_id]['text'].push(text_obj);
            }else{
                return_object['sections'][sec_id]['subsections'][subsec_id]['text'].push(text_obj);
            }
        }
    }

    return return_object;
}

export async function ParseFile(fileID){
    const log = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}/',{
        owner: 'kshanasmedia',
        repo: 'database',
        path: `en/${fileID}.md`
    });

    const file = decode(log?.data.content);

    return Parser(file)
}

export async function ParsePreviewFile(params){
    // console.log(params);
    const {owner, repo, branch, fileId} = params;
    const path = `en/${fileId}.md`;
    const branchRef = ((branch)?`?ref=${branch}`:'');
    const log = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}${branchRef}`)
                      .then(doc=>doc.json())
    // console.log(log)
    const file = decode(log?.content);

    return Parser(file)
}