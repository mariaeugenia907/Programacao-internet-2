import * as admin from 'firebase-admin'
import express, {Request, Response} from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

// Inicializando o firebase
var serviceAccount = require("./api-salao-firebase-adminsdk-wqb40-2598a7ff36.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

// obter todos
app.get('/servicos', async (request: Request, response: Response) => {
    const servicosRef = db.collection('servicos')
    const servicosDoc = await servicosRef.get()
    const servicos: any[] = []
    servicosDoc.docs.forEach(doc => servicos.push({id: doc.id, ...doc.data()}))

    return response.status(200).json(servicos)
})

// criar
app.post('/servicos', async (request: Request, response: Response) => {
    const {titulo, descricao, data, valor, situacao, comentarios} = request.body

    const servico = {
        titulo, descricao, data, valor: Number(valor), situacao, comentarios
    }

    const resultado = await db.collection('servicos').add(servico)
    
    return response.status(201).json({id: resultado.id, ...servico})
})

// editar
app.put('/servicos/:id', async (request: Request, response: Response) => {
    const idServico = request.params.id
    const data = request.body
    const servico = await db.collection('servicos').doc(idServico)
    
    await servico.update(data)

    return response.status(201).json({...data})
})


// PORTA
app.listen(3000, () => {
    console.log('App running...')
})