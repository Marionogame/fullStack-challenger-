import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReeModule } from './ree/ree.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ReeModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/reeTest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
