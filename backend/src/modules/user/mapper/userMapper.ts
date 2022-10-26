import { UserEntity } from '../entity/User';
import crypto from 'crypto';
export class UserMapper {
  public static toDomain(raw: any): UserEntity {
    const userOrFail = UserEntity.createUser({
      id: raw.id ? raw.id : crypto.randomInt(0, 20),
      username: raw.username,
      password: raw.password,
      email: raw.email,
    });

    userOrFail.failure ? console.log(userOrFail.error) : '';

    return userOrFail.success ? userOrFail.getValue() : null;
  }
}
