import { ParseFile } from "../../../utils/parse";


export default async function docHandler(req, res){
    const {query: {id}, method} = req;

    const updated_body = await ParseFile(id);

    switch(method){
        case 'GET':
            res.status(200).json({ id, data: updated_body})
            break;
        // case 'POST':
        //     res.status(200).json({ id, name: `User ${id}` })
        //     break;
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}