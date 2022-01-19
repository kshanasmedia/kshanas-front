import { ParsePreviewFile } from "../../utils/parse";



export default async function docHandler(req, res){
    const {query, method} = req;
    // console.log(query)

    const updated_body = await ParsePreviewFile(query);

    switch(method){
        case 'GET':
            res.status(200).json({ id:query?.fileId, data: updated_body})
            break;
        // case 'POST':
        //     res.status(200).json({ id, name: `User ${id}` })
        //     break;
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}