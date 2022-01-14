export default function docHandler(req, res){
    const {query: {id}, method} = req;

    switch(method){
        case 'GET':
            res.status(200).json({ id, name: `User ${id}` })
            break;
        // case 'POST':
        //     res.status(200).json({ id, name: `User ${id}` })
        //     break;
        default:
            es.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}