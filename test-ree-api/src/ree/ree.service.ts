import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRee } from './interfaces/ree.interface';
import { CreateReeInputDTO } from './dto/ree.input.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReeService {
  constructor(
    @InjectModel('Ree') private readonly reeModel: Model<IRee>,
    private readonly httpService: HttpService,
  ) {}

  async create(createReeInputDTO: CreateReeInputDTO): Promise<IRee> {
    try {
      const today = new Date();
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      const startDate = new Date(lastMonth.setDate(1));
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth() + 1,
        0,
      );
      endDate.setHours(23, 59, 59, 999);
      const formattedStartDate = startDate.toISOString().slice(0, 16);
      const formattedEndDate = endDate.toISOString().slice(0, 16);
      const response = await firstValueFrom(
        this.httpService.get(
          `https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date=${formattedStartDate}&end_date=${formattedEndDate}&time_trunc=day`,
        ),
      );
      if (!response.data || Object.keys(response.data).length === 0) {
        throw new Error('No valid data found in the API response');
      }

      const mergedData = {
        ...createReeInputDTO,
        ...response.data,
      };
      const newRee = new this.reeModel(mergedData);

      return await newRee.save();
    } catch (error) {
      console.error('Error creating Ree:', error);
      throw error;
    }
  }

  async getRee(): Promise<IRee[]> {
    try {
      const ree = await this.reeModel.find();
      return ree;
    } catch (error: any) {
      throw new Error(
        `Error al obtener los registros de Ree: ${error.message}`,
      );
    }
  }
}
