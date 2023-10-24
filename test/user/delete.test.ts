import request from "supertest";
import express from "express";
import delete_user from "../../back-end/user/delete";
import { PrismaClient } from "@prisma/client";

// Mock the Prisma client
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  })),
}));

const app = express();
app.use(express.json());
delete_user(app);

const prisma = new PrismaClient();

describe("delete/user", () => {
  it("should delete existing user", async () => {
    const mockUser = {
      email: "test@example.com",
    };

    // Mock the findUnique method to return a user
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    // Mock the update method to return the deleted user
    (prisma.user.update as jest.Mock).mockResolvedValue({
      ...mockUser,
      isuserdeleted: true,
    });

    const res = await request(app).post("/delete_user").send(mockUser);

    expect(res.status).toEqual(200);
    expect(res.body.isuserdeleted).toEqual(res.body.isuserdeleted);
  });

  it("should return 404 if user not found", async () => {
    const mockUser = {
      email: "notfound@example.com",
    };

    // Mock the findUnique method to return null
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const res = await request(app).post("/delete_user").send(mockUser);

    expect(res.status).toEqual(200);
  });
});
