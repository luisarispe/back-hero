const HeroService= require('../../../src/components/hero/hero.service');
const axios = require("axios");
const model = require("../../../src/components/hero/hero.model");

jest.mock("axios");

describe("set de pruebas listado de heroes", ()=>{

    it("Debe retornar un listado de heroes", async ()=>{

        const respService={test:true};
        

        jest.spyOn(axios, "get").mockResolvedValue(respService);
        const response = await HeroService.getAll();
        expect(response).toEqual({test:true})
    });

    it("Debe retornar un listado de heroes con filtro", async ()=>{

        const respService={test:true};
        

        jest.spyOn(axios, "get").mockResolvedValue(respService);
        const response = await HeroService.getAll(0, 'batman');
        expect(response).toEqual({test:true});
    });

    it("Debe retornar un error", async ()=>{
        const errorHeros={
            status:500
        }

        jest.spyOn(axios, "get").mockRejectedValue(errorHeros);

        try {
            await HeroService.getAll();
        } catch (error) {
            expect(error).toEqual({status:500});
        }
    });
});

describe("set de pruebas de traer un heroe",()=>{
    it("Debe retornar un objecto con el heroe",async ()=>{
        const respService={
            "id": 1011334,
            "name": "3-D Man",
            "description": "",
            "modified": "2014-04-29T14:18:17-0400",
            "thumbnail": {
                "path": "localhost",
                "extension": "jpg"
            },
            "resourceURI": "localhost",
            "teamColor": null
        };
        

        jest.spyOn(axios, "get").mockResolvedValue(respService);
        const response = await HeroService.getOne(1011334);
        expect(response).toEqual(respService);
    });
});

describe("set de pruebas de guardar un heroe", ()=>{

    const heroeRequest={
        "id_hero": "10113344444",
        "color": "azul",
        "color_code": "#1f8ff7",
    }
    it("Debe retornar un objecto del heroe que se guardo", async ()=>{
       

        const heroeResponse={
            "id_hero": "10113344444",
            "color": "azul",
            "color_code": "#1f8ff7",
            "_id": "63d3fb19c8c68a9c8d1d964d",
            "__v": 0
        }
        

        jest.spyOn(model, "create").mockResolvedValue(heroeResponse);
        const response = await HeroService.save(heroeRequest);
        expect(response).toEqual(heroeResponse);

    });

    it("Debe retornar un error", async ()=>{

        const heroeResponse={
            error:500
        }

        jest.spyOn(model, "create").mockRejectedValue(heroeResponse);

        try {
            await HeroService.save(heroeRequest);
        } catch (error) {
            expect(error).toEqual({error:500});
        }
    });
});

describe("set de traer el grupo de un heroe", ()=>{
    it("Debe retornar un objeto con el grupo del heroe", async ()=>{

        const heroeResponse={
            _id: "63d41ce2478aa507ac03d9ab",
            id_hero: '1011334',
            color: 'azul',
            color_code: '#1f8ff7',
            __v: 0 
        }

        jest.spyOn(model, "findOne").mockResolvedValue(heroeResponse);
         const response=await HeroService.getOneGroup(1011334);
        expect(response).toEqual(heroeResponse);
    });

    it("Debe retornar un error al traer el grupo del heroe", async ()=>{

        const heroeResponse={
            error:500
        }

        jest.spyOn(model, "findOne").mockRejectedValue(heroeResponse);

        try {
         await HeroService.getOneGroup(1011334);
        } catch (error) {
            expect(error).toEqual(heroeResponse);    
        }
        
    });
});

describe("set de pruebas de actualizar un heroe", ()=>{

    const heroeRequest={
        "id_hero": "10113344444",
        "color": "azul",
        "color_code": "#1f8ff7",
    };

    it("Debe retornar un objecto del que se actualizo", async ()=>{
       

        const heroeResponse={
            "id_hero": "10113344444",
            "color": "azul",
            "color_code": "#1f8ff7",
            "_id": "63d3fb19c8c68a9c8d1d964d",
            "__v": 0
        }
        

        jest.spyOn(model, "findByIdAndUpdate").mockResolvedValue();
        jest.spyOn(model, "findById").mockResolvedValue(heroeResponse);
        const response= await HeroService.update('63d3fb19c8c68a9c8d1d964d', heroeRequest);

        expect(response).toEqual(heroeResponse);

    });

    it("Debe retornar un error al actualizar el heroe", async ()=>{

        const heroeResponse={
            error:500
        }

        jest.spyOn(model, "findByIdAndUpdate").mockRejectedValue(heroeResponse);

        try {
            await HeroService.update(heroeRequest);
        } catch (error) {
            expect(error).toEqual({error:500});
        }
    });
});

describe("set de pruebas de eliminar un heroe", ()=>{
    it("Debe retornar un string indicando que el heroe fue eliminado", async ()=>{
        
        const heroeResponse='El grupo fue eliminado';

        jest.spyOn(model, "deleteOne").mockResolvedValue(heroeResponse);
        const response= await HeroService.deleteOne('63d3fb19c8c68a9c8d1d964d');

        expect(response).toEqual(heroeResponse);

    });

    it("Debe retornar un error al eliminar el heroe", async ()=>{

        const heroeResponse={
            error:500
        }

        jest.spyOn(model, "deleteOne").mockRejectedValue(heroeResponse);

        try {
            await HeroService.deleteOne('63d3fb19c8c68a9c8d1d964d');
        } catch (error) {
            expect(error).toEqual({error:500});
        }
    });
});