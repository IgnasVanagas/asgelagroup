import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function fillContact(page: Page) {
  await page.locator("#name").fill("Test Client");
  await page.locator("#email").fill("test@example.com");
  await page
    .locator("#message")
    .fill("Test inquiry for a roof renovation in Vilnius.");
  await page.locator("input[name=consent]").check();
}

test("gallery switches project and opens the corresponding page", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(
    "Įrengiame stogus, kurie kalba patys už save.",
  );
  await page
    .getByRole("button", { name: "Kitas projektas", exact: true })
    .click();
  await expect(page.locator(".featured-title")).toHaveText(
    "Lietuvos nacionalinis muziejus",
  );
  await page.locator(".featured-link").click();
  await expect(page).toHaveURL(/\/projektai\/lietuvos-nacionalinis-muziejus/);
  await expect(page.locator("h1")).toHaveText("Lietuvos nacionalinis muziejus");
  await page.locator(".next-project").click();
  await expect(page.locator("h1")).toHaveText("Trakų salos pilis");
  await page.getByRole("link", { name: "Visi projektai" }).click();
  await expect(page).toHaveURL(/\/projektai$/);
});

test("service accordion supports keyboard and keeps one panel open", async ({
  page,
}) => {
  await page.goto("/#paslaugos");
  const second = page.getByRole("button", { name: /Renovacija ir remontas/ });
  await second.focus();
  await page.keyboard.press("Enter");
  await expect(second).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#service-1")).toBeVisible();
  await expect(page.locator("#service-0")).toBeHidden();
  await page.keyboard.press("Enter");
  await expect(page.locator("#service-1")).toBeHidden();
});

test("contact form validates, preserves values on failure and supports retry", async ({
  page,
}) => {
  await page.goto("/#kontaktai");
  await page.getByRole("button", { name: "Siųsti užklausą" }).click();
  await expect(page.locator("#name:invalid")).toBeVisible();
  await fillContact(page);
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Jūsų žinutė neišsiųsta. Susisiekite telefonu.",
      }),
    }),
  );
  await page.getByRole("button", { name: "Siųsti užklausą" }).click();
  await expect(page.locator(".contact-form").getByRole("alert")).toContainText(
    "neišsiųsta",
  );
  await expect(page.locator("#name")).toHaveValue("Test Client");
  await page.unroute("**/api/contact");
  // Simulates a confirmed provider response; no real email is sent by tests.
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    }),
  );
  await page.getByRole("button", { name: "Siųsti užklausą" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Jūsų užklausa išsiųsta",
  );
  await page.getByRole("button", { name: "Pateikti kitą užklausą" }).click();
  await expect(page.locator("#name")).toHaveValue("");
});

test("contact API rejects invalid, cross-origin and oversized requests", async ({
  request,
}) => {
  expect((await request.post("/api/contact", { data: {} })).status()).toBe(400);
  expect(
    (
      await request.post("/api/contact", {
        headers: { origin: "https://example.com" },
        data: {},
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/contact", {
        data: { message: "a".repeat(25000) },
      })
    ).status(),
  ).toBe(413);
  const data = {
    name: "Test Client",
    email: "test@example.com",
    message: "A test inquiry for a roof project.",
    consent: "on",
    service: "",
    website: "",
  };
  expect(
    (
      await request.post("/api/contact", { data: { ...data, consent: "" } })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/contact", { data: { ...data, website: "spam" } })
    ).status(),
  ).toBe(422);
});

test("mobile menu traps focus, closes on Escape and navigates", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Atidaryti meniu" }).click();
  const menu = page.getByRole("navigation", { name: "Mobilioji navigacija" });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link", { name: /Projektai/ })).toBeFocused();
  await menu.getByRole("link", { name: /370/ }).focus();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Uždaryti meniu" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Atidaryti meniu" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Atidaryti meniu" }).click();
  await menu.getByRole("link", { name: /Kontaktai/ }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/\/kontaktai$/);
});

test("layouts fit narrow mobile, tablet and desktop without overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}`,
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});

test("homepage passes automated WCAG AA checks on desktop and mobile", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
});

test("support pages, project images and missing route work", async ({
  page,
}) => {
  for (const path of [
    "/projektai/traku-salos-pilis",
    "/projektai/lietuvos-nacionalinis-muziejus",
    "/privatumas",
    "/nuotraukos",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    for (const image of await page.locator("main img").all()) {
      await expect(image).toBeVisible();
      await expect
        .poll(() =>
          image.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
  }
  const missing = await page.goto("/projektai/neegzistuoja");
  expect(missing?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("neradome");
});
