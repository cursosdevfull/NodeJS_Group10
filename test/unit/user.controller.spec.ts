import * as httpMock from 'node-mocks-http';

import { MockUserApplication } from './repositories/mock-user-application';

let req: any;
let res: any;
let mockUserApplication: any;
let userController: any;

describe("user.controller", () => {
  beforeAll(() => {
    // Arrange
    mockUserApplication = new MockUserApplication();
    userController = mockUserApplication.getController();
  });

  beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
  });

  it("List users", async () => {
    // Act
    await userController.list(req, res);

    // Assert
    mockUserApplication.assertListUsers(res);
  });

  it("List One", async () => {
    // Act
    req.params.guid = "efaff3b2-85c0-4b39-bb1d-0bbf25390d3d";
    await userController.listOne(req, res);

    // Assert
    mockUserApplication.assertListOne(res);
  });
});
