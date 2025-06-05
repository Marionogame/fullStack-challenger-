import { Test, TestingModule } from '@nestjs/testing';
import { ReeController } from './ree.controller';
import { ReeService } from './ree.service';
import { mockcreateReeInputDTO, mockSample } from './mocks/ree.mock';
import { IRee } from './interfaces/ree.interface';

describe('ReeController', () => {
  let controller: ReeController;
  let service: ReeService;

  const mockReeService = {
    getRee: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReeController],
      providers: [{ provide: ReeService, useValue: mockReeService }],
    }).compile();

    controller = module.get<ReeController>(ReeController);
    service = module.get<ReeService>(ReeService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Call findAll and return data', async () => {
    const responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockReeData = [];
    jest.spyOn(service, 'getRee').mockResolvedValue(mockReeData);

    await controller.findAll(responseMock);

    expect(service.getRee).toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.json).toHaveBeenCalledWith({
      message: 'success',
      data: mockReeData,
    });
  });

  it('should execute the create method when the cron job is triggered', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(mockSample[0] as IRee);

    await controller.create(mockcreateReeInputDTO);

    expect(service.create).toHaveBeenCalledWith(mockcreateReeInputDTO);
  });
});
