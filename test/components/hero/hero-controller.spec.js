const heroController = require("../../../src/components/hero/hero.controller");
const {getAll, save, getOne, update,deleteOne} = require("../../../src/components/hero/hero.module");
const { createRequest, createResponse } = require("node-mocks-http");

jest.mock("../../../src/components/hero/hero.module");


describe("set de pruebas de listado de heroes",()=>{
    let req=createRequest();
    let res=createResponse();

    const heroes={
        "heroes": [
            {
                "id": "1011334",
                "name": "3-D Man",
                "description": "",
                "modified": "2014-04-29T14:18:17-0400",
                "thumbnail": {
                    "path": "localhost",
                    "extension": "jpg"
                },
                "resourceURI": "localhost",
                "teamColor": {
                    "_id": "63d41ce2478aa507ac03d9ab",
                    "id_hero": "1011334",
                    "color": "azul",
                    "color_code": "#1f8ff7",
                    "__v": 0
                }
            },
        ]
    };

    it("Debe retornar un status 200", async ()=>{
        getAll.mockResolvedValue(heroes);
        const response=await heroController.getAll(req,res);
        expect(response.statusCode).toBe(200);
    });

    it("Debe retornar un error con status 500", async()=>{
        getAll.mockRejectedValue(heroes);
        const response= await heroController.getAll(req,res);
        expect(response.statusCode).toBe(500);
    });
});

describe("set de pruebas de traer un heroe", ()=>{
    let req=createRequest();
    let res=createResponse();
    
    const heroe={
        "id": 1011334,
        "name": "3-D Man",
        "description": "",
        "modified": "2014-04-29T14:18:17-0400",
        "thumbnail": {
            "path": "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
            "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1011334",
        "teamColor": {
            "_id": "63d41ce2478aa507ac03d9ab",
            "id_hero": "1011334",
            "color": "azul",
            "color_code": "#1f8ff7",
            "__v": 0
        }
    }

    it("Debe retornar un status 200", async ()=>{
        getOne.mockResolvedValue(res.status(200).send(heroe));
        const response=await heroController.getOne(req,res);
        expect(response.statusCode).toBe(200);
    });

    it("Debe retornar un error con status 500", async ()=>{
        getOne.mockRejectedValue(heroe);
        const response=await heroController.getOne(req,res);
        expect(response.statusCode).toBe(500);
    });
});

describe("set de pruebas al guardar un heroe", ()=>{

    let req=createRequest();
    let res=createResponse();

    const heroe={
        "id_hero": "23212",
        "color_code": "#1f8ff7",
        "color": "azul"
    };

    it("Debe retornar un status 201", async ()=>{
        save.mockResolvedValue(heroe);
        const response=await heroController.save(req,res);
        expect(response.statusCode).toBe(201);
    });

    it("Debe retornar un error con status 500", async ()=>{
        save.mockRejectedValue(heroe);
        const response=await heroController.save(req,res);
        expect(response.statusCode).toBe(500);
    });

});

describe("set de pruebas de actualizar un heroe", ()=>{
    let req=createRequest();
    let res=createResponse();

    const heroe={
        "id_hero": "23212",
        "color_code": "#1f8ff7",
        "color": "azul"
    };

    it("Debe retornar un status 200", async ()=>{
        update.mockResolvedValue(res.status(200).send(heroe));
        const response=await heroController.update(req,res);
        expect(response.statusCode).toBe(200);
    });

    it("Debe retornar un error con status 500", async ()=>{
        update.mockRejectedValue(heroe);
        const response=await heroController.update(req,res);
        expect(response.statusCode).toBe(500);
    });
});

describe("set de pruebas de eliminar un grupo de heroe", ()=>{

    let req=createRequest();
    let res=createResponse();

    it("Debe retornar un status 200", async ()=>{
        deleteOne.mockResolvedValue(res.status(200).send('El heroe fue eliminado'));
        const response=await heroController.deleteOne(req,res);
        expect(response.statusCode).toBe(200);
    });

    it("Debe retornar un error con status 500", async ()=>{
        deleteOne.mockRejectedValue();
        const response=await heroController.deleteOne(req,res);
        expect(response.statusCode).toBe(500);
    });
})