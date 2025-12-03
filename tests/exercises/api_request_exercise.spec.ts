import { test } from "@playwright/test";

test("Exercise: Sending Simple Request", async ({ request }) => {
  await request.get("https://www.tredgate.cloud/courses");
});
