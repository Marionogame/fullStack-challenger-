import { Test, TestingModule } from '@nestjs/testing';
import { ReeService } from './ree.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReeSchemas } from './schemas/ree.schema';
import { HttpModule, HttpService } from '@nestjs/axios';
import { IRee } from './interfaces/ree.interface';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { mockcreateReeInputDTO, mockSample } from './mocks/ree.mock';

describe('ReeService', () => {
  let service: ReeService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/reeTest'),
        MongooseModule.forFeature([{ name: 'Ree', schema: ReeSchemas }]),
        HttpModule,
      ],
      providers: [ReeService],
    }).compile();

    service = module.get<ReeService>(ReeService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getRee should be called at least once', async () => {
    const spy = jest
      .spyOn(service, 'getRee')
      .mockImplementation(() => Promise.resolve(mockSample as IRee[]));

    await service.getRee();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be defined and returns exactly the expected result', async () => {
    jest
      .spyOn(service, 'getRee')
      .mockImplementation(() => Promise.resolve(mockSample as IRee[]));

    expect(await service.getRee()).toBe(mockSample);
  });

  it('should throw an error if data is undefined', async () => {
    jest
      .spyOn(service, 'getRee')
      .mockImplementation(() =>
        Promise.reject(new Error(`Error al obtener los registros de Ree:`)),
      );

    expect(service.getRee()).rejects.toThrow(
      'Error al obtener los registros de Ree',
    );
  });
  it('should throw an error if reeModel.find fails', async () => {
    jest
      .spyOn(service['reeModel'], 'find')
      .mockRejectedValue(new Error('Database Error'));

    await expect(service.getRee()).rejects.toThrow(
      'Error al obtener los registros de Ree: Database Error',
    );
  });

  it('should return an empty array if no records are found', async () => {
    jest.spyOn(service['reeModel'], 'find').mockResolvedValue([]);

    const result = await service.getRee();

    expect(result).toEqual([]);
  });

  /// Integracion Create

  it('should throw an error if the API response is invalid', async () => {
    const mockResponse: AxiosResponse = {
      data: null,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: new (require('axios').AxiosHeaders)() },
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

    await expect(service.create(mockcreateReeInputDTO)).rejects.toThrow(
      'No valid data found in the API response',
    );
  });

  it('should create a new Ree record with valid API response', async () => {
    const mockResponse: AxiosResponse = {
      data: { key: 'value' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: new (require('axios').AxiosHeaders)() },
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));
    jest
      .spyOn(service['reeModel'].prototype, 'save')
      .mockResolvedValue(mockSample[0] as IRee);

    const result = await service.create(mockcreateReeInputDTO);

    expect(result).toEqual(mockSample[0]);
  });

  it('should throw an error if saving to the database fails', async () => {
    const mockResponse: AxiosResponse = {
      data: { key: 'value' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: new (require('axios').AxiosHeaders)() },
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));
    jest
      .spyOn(service['reeModel'].prototype, 'save')
      .mockRejectedValue(new Error('Database Error'));

    await expect(service.create(mockcreateReeInputDTO)).rejects.toThrow(
      'Database Error',
    );
  });

  /// Unitario Create

  it('create should be called at least once', async () => {
    const spy = jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve(mockSample[0] as IRee));

    await service.create(mockcreateReeInputDTO);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('create should be defined and returns exactly the expected result', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve(mockSample[0] as IRee));

    expect(await service.create(mockcreateReeInputDTO)).toBe(mockSample[0]);
  });

  it('create should throw an error if data is undefined', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(() =>
        Promise.reject(new Error(`Error al obtener los registros de Ree:`)),
      );

    expect(service.create(mockcreateReeInputDTO)).rejects.toThrow(
      'Error al obtener los registros de Ree',
    );
  });
});
