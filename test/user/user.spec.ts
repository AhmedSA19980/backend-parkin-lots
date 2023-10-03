import user from "../../back-end/user/user"; // path to your user function

describe("user", () => {
  let app:any;
  let prisma:any;
  let req:any;
  let res:any;

  beforeEach(() => {
    app = { post: jest.fn() };
    prisma = { user: { create: jest.fn(), findMany: jest.fn() } };
    req = {
      body: {
        name: "John2 Doe",
        email: "john2.doe@gmail.com",
        password: "password",
      },
    };
    res = { json: jest.fn() };
    user(app, prisma);
  });

  it("should create a new user and return it in the response", async () => {
    const newUser = {
      id: 1,
      name: "John2 Doe",
      email: "john2.doe@gmail.com",
      password: "password",
    };
    prisma.user.create.mockResolvedValue(newUser);

    const postCallback = app.post.mock.calls[0][1];
    await postCallback(req, res);

    expect(prisma.user.create).toHaveBeenCalledTimes(1);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: "John2 Doe",
        email: "john2.doe@gmail.com",
        password: "password",
      },
    });
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(newUser);
  });
});
