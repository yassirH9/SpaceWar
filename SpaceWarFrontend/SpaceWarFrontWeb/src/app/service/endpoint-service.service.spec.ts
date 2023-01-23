import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EndpointServiceService } from './endpoint-service.service';

describe('EndpointServiceService', () => {
    let service: EndpointServiceService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [EndpointServiceService]
        });
        service = TestBed.inject(EndpointServiceService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    /*
        >ng test
        Para forzar el fallo se usan los req.flush que simulan respuestas del servidor
        pro ejemplo abajo comentados hay dos ejemplos uno para simular una respuesta de error
        interno de servidor y otro para simular un error de autorizacion del servidor
    */
    let endpointURL = "/api/ranking";
    it("Prueba peticion GetAllRanking", () => {
        service.getAllRanking().subscribe(data => {
            console.log(data);
            
        });
        const req = httpMock.expectOne(endpointURL);
        expect(req.request.method).toBe('GET');
        req.flush({ data: 'test data' });
        //simulaciones de respuesta
        // req.flush('Internal Server Error', {
        //     status: 500,
        //     statusText: 'Internal Server Error'
        // });
        // req.flush('Auth Error', {
        //     status: 401,
        //     statusText: 'Auth Error'
        // });
        // req.flush('Not Found', { 
        //     status: 404, 
        //     statusText: 'Not Found' 
        // });
    })
    afterEach(() => {
        httpMock.verify();
    });

});
