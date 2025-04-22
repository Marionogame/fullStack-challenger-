import { Resolver, Query } from '@nestjs/graphql';
import { ReeService } from './ree.service';
import { CreateReeOutputDTO } from './dto/ree.output.dto';

@Resolver()
export class ReeResolver {
  constructor(private readonly reeService: ReeService) {}
  @Query(() => [CreateReeOutputDTO])
  getData() {
    return this.reeService.getRee();
  }
}
