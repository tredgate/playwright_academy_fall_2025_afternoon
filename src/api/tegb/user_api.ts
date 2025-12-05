// src/api/tegb/
// user_api.ts

import { APIRequestContext, expect } from "@playwright/test";

export class UserApi {
  readonly request: APIRequestContext;
  readonly apiUrl = "http://localhost:3000"; // ? V reálném testování by všechna url měla být v test datech/konfiguraci spravovatelné z jednoho místa

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // ! Do této metody nepatří asserty! Pokud bychom chtěli asserty, potom je potřeba pojmenovat jinak, například registerUserAndAssertResponse
  async registerUser(username: string, password: string, email: string) {
    const response = await this.request.post(this.apiUrl + "/user/register", {
      data: {
        username,
        password,
        email,
      },
    });
    return response;
  }

  async registerUserAndAssertResponse(
    username: string,
    password: string,
    email: string
  ) {
    const response = await this.registerUser(username, password, email);
    expect(response.status(), "Register Response Status is 201").toBe(201);
    return response;
  }

  async loginUser(username: string, password: string) {
    const response = await this.request.post(this.apiUrl + "/auth/login", {
      data: {
        username,
        password,
      },
    });
    return response;
  }
}
