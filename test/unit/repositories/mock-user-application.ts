import { ok } from 'neverthrow';

import UserApplication from '../../../src/modules/user/application/user.application';
import User from '../../../src/modules/user/domain/user';
import { EmailVO } from '../../../src/modules/user/domain/value-objects/email.vo';
import UserInfrastructure from '../../../src/modules/user/infrastructure/user.infrastructure';
import Controller from '../../../src/modules/user/interfaces/http/controller';
import mockListUsersResponse from '../mocks/list-users-response.json';
import mockUser from '../mocks/users.json';

export class MockUserApplication {
  constructor() {
    const emailResult = EmailVO.create("sergio@correo.com");
    if (emailResult.isErr()) {
      throw new Error(emailResult.error.message);
    }

    (UserApplication as jest.Mock) = jest.fn().mockReturnValue({
      list: jest
        .fn()
        .mockResolvedValue(
          mockUser.map((mock) => ({ ...mock, properties: () => mock }))
        ),
      listOne: jest.fn().mockResolvedValue({
        ...mockUser[0],
        isErr: () => false,
        isOk: () => true,
        value: {
          properties: () => mockUser[0],
        },
      }),
    });

    (UserInfrastructure as jest.Mock) = jest.fn().mockReturnValue({
      list: jest.fn(),
      listOne: jest.fn().mockResolvedValue(
        ok(
          new User({
            guid: mockUser[0].guid,
            name: mockUser[0].name,
            lastname: mockUser[0].lastname,
            email: emailResult.value,
            password: mockUser[0].password,
            refreshToken: mockUser[0].refreshToken,
            active: mockUser[0].active,
            roles: [],
          })
        )
      ),
    });
  }

  getController() {
    const userInfrastructure = new UserInfrastructure();
    const userApplication = new UserApplication(userInfrastructure);

    return new Controller(userApplication);
  }

  assertListUsers(res: any) {
    const result = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(result).toEqual(mockListUsersResponse);
  }

  assertListOne(res: any) {
    const result = res._getJSONData();
    console.log(result);
    expect(res.statusCode).toBe(200);
    expect(result).toHaveProperty("guid");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("lastname");
  }
}
