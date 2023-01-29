const heroModule= require("../../../src/components/hero/hero.module");
const {getAll, save, getOneGroup, update, getOne, deleteOne} = require("../../../src/components/hero/hero.service");
const { createRequest, createResponse } = require("node-mocks-http");

jest.mock("../../../src/components/hero/hero.service");

describe("set de pruebas de listado de heroes", ()=>{
    let req=createRequest();
    let res=createResponse();

    const heroes=[
        {
            id: 1011334,
            name: '3-D Man',
            description: '',
            modified: '2014-04-29T14:18:17-0400',
            thumbnail: {
              path: 'localhost',
              extension: 'jpg'
            },
            resourceURI: 'localhost',
            teamColor: undefined
          },
    ];
    const data={
        data:{
            data: { offset: 0, limit: 20, total: 1562, count: 20,results: heroes }
        }
    }

    const resp={ heroes,offset: 0, limit: 20, total: 1562, count: 20 };
    it("Debe retornar un listado de heroes", async ()=>{
        getAll.mockResolvedValue(data);
        const response =await heroModule.getAll(req,res);
        expect(response).toEqual(resp);
    });

    it("Debe retornar un error con status 500", async()=>{
        getAll.mockRejectedValue({error:500});

        try {
            await heroModule.getAll(req,res);    
        } catch (error) {
            expect(error.error).toBe(500);    
        }
    });
});

describe("set de pruebas de traer un heroe", ()=>{

    const req=createRequest();
    const res=createResponse();
    const heroes=[
        {
            id: 1011334,
            name: '3-D Man',
            description: '',
            modified: '2014-04-29T14:18:17-0400',
            thumbnail: {
              path: 'localhost',
              extension: 'jpg'
            },
            resourceURI: 'localhost',
            teamColor: undefined
          },
    ];

    const data={
        data:{
            data: { offset: 0, limit: 20, total: 1562, count: 20,results: heroes }
        }
    }

    it("Dene retornar un status 200", async ()=>{
        req.query.id=2;
        getOne.mockResolvedValue(data);
        const response =await heroModule.getOne(req,res);
        expect(response.statusCode).toEqual(200);
    });

    it("Debe retornar un error con status 400", async ()=>{
        req.query.id=undefined;
        getOne.mockResolvedValue(data);
        const response =await heroModule.getOne(req,res);
        expect(response.statusCode).toEqual(400);
    });

    it("Debe retornar un error con status 400", async ()=>{
        req.query.id=1;
        const data={
            response:{
                status:400
            }
        }
        getOne.mockRejectedValue(data);
        const response =await heroModule.getOne(req,res);
        expect(response.statusCode).toEqual(400);
    });

    it("Debe retornar un error con status 500", async ()=>{
        getOne.mockRejectedValue({error:500});

        try {
            await heroModule.getOne(req,res);
        } catch (error) {
            expect(error).toEqual({error:500});
        }
        
    });
});

describe("set de pruebas al guardar un heroe", ()=>{
    const req=createRequest();
    const res=createResponse();
    const heroeReq={
        "id_hero": 23123,
        "color": "azul",
        "color_code": "#23232"
    };

    const heroeResponse={
        "_id": "63d41ce2478aa507ac03d9ab",
        "id_hero": "1011334",
        "color": "azul",
        "color_code": "#1f8ff7",
        "__v": 0
    }


    it("Debe retornar el heroe guardado", async ()=>{

        req.body=heroeReq;
        save.mockResolvedValue(heroeResponse);
        const response =await heroModule.save(req,res);        
        expect(response).toEqual(heroeResponse);

    });

    it("Debe retornar el heroe actualizado", async ()=>{

        req.body=heroeReq;

        getOneGroup.mockResolvedValue(heroeResponse);
        update.mockResolvedValue(heroeResponse);
        const response =await heroModule.save(req,res);        
        expect(response).toEqual(heroeResponse);

    });

    it("Debe retornar el heroe actualizado", async ()=>{

        req.body=heroeReq;

        getOneGroup.mockResolvedValue(heroeResponse);
        update.mockResolvedValue(heroeResponse);
        const response =await heroModule.save(req,res);        
        expect(response).toEqual(heroeResponse);

    });

    it("Debe retornar un error con status 500", async ()=>{
        getOneGroup.mockRejectedValue({error:500});
        try {
            await heroModule.save(req,res);
        } catch (error) {
            expect(error).toEqual({error:500});
        }
    });

});

describe("set de pruebas de actualizar un heroe", ()=>{

    const req=createRequest();
    const res=createResponse();

    const heroeReq={
        "id_hero": 23123,
        "color": "azul",
        "color_code": "#23232"
    };

    const heroeResponse={
        "_id": "63d41ce2478aa507ac03d9ab",
        "id_hero": "1011334",
        "color": "azul",
        "color_code": "#1f8ff7",
        "__v": 0
    }

    req.body=heroeReq;
    
    it("Debe retornar el heroe actualizado con un status 200", async ()=>{
        req.query.id=11;

        getOneGroup.mockResolvedValue(heroeResponse);

        update.mockResolvedValue(heroeResponse);
        const response =await heroModule.update(req,res);        
        expect(response.statusCode).toEqual(200);
    });

    it("Debe retornar un error con status 400 no se envia el id de heroe", async ()=>{
        req.query.id=undefined;

        const response =await heroModule.update(req,res);        
        expect(response.statusCode).toEqual(400);
    });

    it("Debe retornar  un error con status 400, no existe el heroe", async ()=>{
        req.query.id=11;

        getOneGroup.mockResolvedValue();

        const response =await heroModule.update(req,res);        
        expect(response.statusCode).toEqual(400);
    });

    it("Debe retornar un error con status 500", async ()=>{
        req.query.id=11;

        getOneGroup.mockRejectedValue({error:500});

        try {
            await heroModule.update(req,res);    
        } catch (error) {
            expect(error).toEqual({error:500});
        }
    });

});

describe("set de pruebas al eliminar un grupo de un heroe", ()=>{
    
    const req=createRequest();
    const res=createResponse();
    
    it("Debe retornar un status 200", async ()=>{

        req.query.id=1;
        deleteOne.mockResolvedValue(res.status(200).send('El heroe fue eliminado'));
        const response=await heroModule.deleteOne(req,res); 
        expect(response.statusCode).toEqual(200);

    });

    it("Debe retornar un status 400, no traer el id del heroe", async ()=>{

        req.query.id=undefined;
        deleteOne.mockResolvedValue();
        const response=await heroModule.deleteOne(req,res); 
        expect(response.statusCode).toEqual(400);

    });

    it("Debe retornar un error con status 500", async ()=>{

        req.query.id=1;
        deleteOne.mockRejectedValue({error:500});
        
        try {
            await heroModule.deleteOne(req,res);     
        } catch (error) {
            expect(error).toEqual({error:500});
        }
    
    });

})