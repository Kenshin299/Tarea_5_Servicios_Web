const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

let agenda = [
    {
        nombre: "Kemyl",
        apellido: "Fernández",
        telefono: "809-915-9663"
    },
    {
        nombre: "Rudy",
        apellido: "Eugenio",
        telefono: "829-999-1111"
    },
    {
        nombre: "Anthony",
        apellido: "Contin",
        telefono: "809-222-3333"
    },
    {
        nombre: "Máximo",
        apellido: "Zorrilla",
        telefono: "829-888-7777"
    }
]


const routes = (router) => {
    const url = "http://www.raydelto.org/agenda.php";

    //Trae los contactos desde la agenda de Raydelto
    router.get('/listaExterna', async (request, response) => {
        response.json(
            await fetch(url).then((response) => {
                return response.json();
            })
        )
    })
    //Trae los contactos desde esta lista 
    router.get('/listaPropia', async (request, response) => {
        response.json(agenda)
    })

    router.post('/listaPropia', (request, response) => {
        const contacto = {
            nombre: request.body.nombre,
            apellido: request.body.apellido,
            telefono: request.body.telefono
        }
        agenda.push(contacto);
        response.send("POST request hacia la lista de contactos");
    })
};
        
routes(app);

app.listen(8080);