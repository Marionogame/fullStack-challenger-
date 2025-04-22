import { Test, TestingModule } from '@nestjs/testing';
import { ReeService } from './ree.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReeSchemas } from './schemas/ree.schema';
import { HttpModule } from '@nestjs/axios';
import { CreateReeInputDTO } from './dto/ree.input.dto';
import { mockModel } from './mocks/ree.mock';

describe('ReeService', () => {
  let service: ReeService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create and return a new Ree', async () => {
 
    const datavalue = {
      type: 'test',
      id: '123',
      attributes: {
        title: 'Mock Title',
        'last-update': new Date('2025-01-01'),
        description: 'Mock Description',
      },
    };
    mockModel.create.mockResolvedValue({
      data: datavalue,
      included: [],
    });

    const newRee = await mockModel.create({
      data: datavalue,
      included: [],
    });

    expect(newRee.data.attributes.title).toBe('Mock Title');
    expect(mockModel.create).toHaveBeenCalledWith({
      data: datavalue,
      included: [],
    });
  });

  it('should throw an error when getRee fails', async () => {
    const errorMessage = 'Database error';

    jest.spyOn(service, 'getRee').mockRejectedValue(new Error(errorMessage));

    try {
      await service.getRee();
    } catch (error) {
      expect(error.message).toBe(`Database error`);
    }
  });
});
