import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './user.entiity';
import { UserService } from './user.service';

@Crud({
  model: {
    type: User,
  },
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
