import { Controller, Get, Body, Res, HttpStatus } from '@nestjs/common';
import { ReeService } from './ree.service';
import { CreateReeInputDTO } from './dto/ree.input.dto';
import { Cron } from '@nestjs/schedule';

@Controller('/ree')
export class ReeController {
  constructor(private readonly reeService: ReeService) {}

  @Cron('0 1 1 * *')
  async create(@Body() createReeInputDTO: CreateReeInputDTO) {
    const ree = await this.reeService.create(createReeInputDTO);
    console.log('Ree created:', ree);
  }

  @Get('/')
  async findAll(@Res() res) {
    const ree = await this.reeService.getRee();
    res.status(HttpStatus.OK).json({
      message: 'success',
      data: ree,
    });
  }
}
