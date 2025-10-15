import request from "supertest";
import app from "../app.js";
import { describe, it, expect, beforeAll } from "@jest/globals";
import { dbInit } from "../lib/index.js";
import { env } from "../config/env.config.js";
import { testData, errorLogger } from "./loggers.js";

let token = "";
beforeAll(async () => {
  const database = `${env.APP_NAME}-test`;
  await dbInit();
});

describe("Authentication", () => {
  it("POST /api/register, Should Register", async () => {
    try {
      const res = await request(app).post("/api/register").send({
        name: "Jacob",
        age: 25,
        email: "jacobs@gmail.com",
        password: "123456",
        confirm_password: "123456",
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user.email).toBe("jacobs@gmail.com");
      testData("register", res);
    } catch (error) {
      errorLogger("register", error);
    }
  });

  it("POST /api/login, Should Login", async () => {
    try {
      const res = await request(app).post("/api/login").send({
        email: "jacobs@gmail.com",
        password: "123456",
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user.email).toBe("jacobs@gmail.com");
      expect(res.body.token).toBeTruthy();
      testData("login", res);
      token = res.body.token;
    } catch (error) {
      errorLogger("login", error);
    }
  });

  it("GET /api/dashboard, Should Get Dashboard", async () => {
    try {
      const res = await request(app)
        .get("/api/dashboard")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user.email).toBe("jacobs@gmail.com");
      testData("dashboard", res);
    } catch (error) {
      errorLogger("dashboard", error);
    }
  });
});
