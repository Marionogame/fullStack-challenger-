import { Module } from '@nestjs/common';
import { ReeController } from './ree.controller';
import { ReeService } from './ree.service';
import { ReeResolver } from './ree.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ReeSchemas } from './schemas/ree.schema';
import { HttpModule } from '@nestjs/axios';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    MongooseModule.forFeature([{ name: 'Ree', schema: ReeSchemas }]),
    HttpModule,
  ],
  controllers: [ReeController],
  providers: [ReeService, ReeResolver],
})
export class ReeModule {}
