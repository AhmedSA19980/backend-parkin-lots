import delete_user from "../../back-end/user/delete"; // path to your delete_user function

describe("delete_user", () => {
  let app:any;
  let prisma:any;
  let req:any;
  let res:any;

  beforeEach(() => {
    app = { post: jest.fn() };
    prisma = { user: { update: jest.fn() } };
    req = { body: { userId: 5}} //email: "alice@gamil.com" } };
    res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    delete_user(app, prisma);
  });

  it("should update the isuserdeleted property to true", async () => {
    const deletedUser = {
      id: 5,
     // email: "alice@gmail.com",
      isuserdeleted: true,
    };
    prisma.user.update.mockResolvedValue(deletedUser);

    const postCallback = app.post.mock.calls[0][1];
    await postCallback(req, res);

    expect(prisma.user.update).toHaveBeenCalledTimes(1);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 5 }, //, email: "test@example.com"
      data: { isuserdeleted: true },
    });
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ isUserDeleted: deletedUser });
  });
});
