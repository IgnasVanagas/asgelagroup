import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getSiteOrigin } from "../src/lib/deployment";

const routes = [
  "/projektai",
  "/paslaugos",
  "/apie-mus",
  "/kontaktai",
  "/projektai/traku-salos-pilis",
  "/projektai/lietuvos-nacionalinis-muziejus",
];

for (const path of routes) {
  test(`${path} loads directly, fits screens and passes WCAG AA checks`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${getSiteOrigin()}${path}`,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      `${getSiteOrigin()}${path}`,
    );
    for (const width of [360, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `overflow at ${width}`,
      ).toBe(true);
    }
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}

test("project enquiry carries context into the form and the submission", async ({
  page,
}) => {
  await page.goto("/projektai");
  await page
    .locator('.portfolio-image[href="/projektai/traku-salos-pilis"]')
    .click();
  await expect(page.locator('.desktop-nav a[aria-current="page"]')).toHaveText(
    "Projektai",
  );
  await page.getByRole("link", { name: "Planuojate panašius darbus?" }).click();
  await expect(page).toHaveURL(/\/kontaktai\?.*projektas=traku-salos-pilis/);
  await expect(page.locator("#service")).toHaveValue("Paveldo objektų darbai");
  await expect(page.locator(".inquiry-context")).toContainText(
    "Trakų salos pilis",
  );
  await expect(page.locator("#name")).toBeInViewport();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${getSiteOrigin()}/kontaktai`,
  );
  await page.locator("#name").fill("Test Client");
  await page.locator("#email").fill("test@example.com");
  await page
    .locator("#message")
    .fill("A test inquiry about a heritage roof project.");
  await page.locator("input[name=consent]").check();
  let submitted: Record<string, string> = {};
  await page.route("**/api/contact", async (route) => {
    submitted = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
  await page.getByRole("button", { name: "Siųsti užklausą" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Jūsų užklausa išsiųsta",
  );
  expect(submitted).toMatchObject({
    service: "Paveldo objektų darbai",
    project: "traku-salos-pilis",
    source: "/projektai/traku-salos-pilis",
  });
});

test("service enquiries preselect the relevant work and visitors can change it", async ({
  page,
}) => {
  await page.goto("/paslaugos");
  await page
    .locator("#renovacija-ir-remontas")
    .getByRole("link", { name: "Aptarkime šiuos darbus" })
    .click();
  await expect(page.locator("#service")).toHaveValue("Renovacija ir remontas");
  await expect(page.locator('input[name="source"]')).toHaveValue("/paslaugos");
  await page.locator("#service").selectOption("Stogų įrengimas");
  await expect(page.locator("#service")).toHaveValue("Stogų įrengimas");
  await page.goto("/apie-mus#kvalifikacija");
  await page.getByRole("link", { name: "Pasiteirauti dėl atestatų" }).click();
  await expect(page.locator("#service")).toHaveValue(
    "Kvalifikacijos dokumentai",
  );
});

test("project reference is removable and unrecognised query values are ignored", async ({
  page,
}) => {
  await page.goto("/kontaktai?projektas=traku-salos-pilis");
  await page
    .getByRole("button", { name: "Pašalinti projekto nuorodą" })
    .click();
  await expect(page.locator(".inquiry-context")).toHaveCount(0);
  await expect(page.locator('input[name="project"]')).toHaveValue("");
  await page.goto(
    "/kontaktai?paslauga=unknown&projektas=unknown&is=https://example.com",
  );
  await expect(page.locator("#service")).toHaveValue("");
  await expect(page.locator('input[name="project"]')).toHaveValue("");
  await expect(page.locator('input[name="source"]')).toHaveValue("/kontaktai");
});

test("mobile contact bar appears while browsing and clears the form", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const bar = page.getByRole("navigation", { name: "Greitas susisiekimas" });
  await expect(bar).toBeHidden();
  await page.evaluate(() => window.scrollTo(0, 900));
  await expect(bar).toBeVisible();
  await expect(bar.getByRole("link", { name: "Skambinti" })).toHaveAttribute(
    "href",
    "tel:+37064593982",
  );
  await page.locator("#kontaktai").scrollIntoViewIfNeeded();
  await expect(bar).toBeHidden();
  await page.goto("/projektai");
  await page.evaluate(() => window.scrollTo(0, 900));
  await bar.getByRole("link", { name: "Aptarkime projektą" }).click();
  await expect(page).toHaveURL(/\/kontaktai\?is=%2Fprojektai#uzklausa$/);
  await expect(bar).toBeHidden();
  await expect(page.locator("#name")).toBeInViewport();
});

test("FAQ works from the keyboard and the portfolio's lazy photos load", async ({
  page,
}) => {
  await page.goto("/paslaugos");
  const question = page.locator(".faq-list summary").first();
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".faq-list details").first()).toHaveAttribute(
    "open",
    "",
  );
  await page.keyboard.press("Enter");
  await expect(page.locator(".faq-list details").first()).not.toHaveAttribute(
    "open",
  );
  await page.goto("/projektai");
  for (const photo of await page.locator(".portfolio-image img").all()) {
    await photo.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        photo.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
});

test("new routes are in sitemap and museum has its own sharing image", async ({
  page,
  request,
}) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const path of routes)
    expect(xml).toContain(`<loc>${getSiteOrigin()}${path}</loc>`);
  await page.goto("/projektai/lietuvos-nacionalinis-muziejus");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    `${getSiteOrigin()}/images/museum.jpg`,
  );
  const breadcrumb = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts
        .map((s) => JSON.parse(s.textContent || "{}"))
        .find((d) => d["@type"] === "BreadcrumbList"),
    );
  expect(
    breadcrumb.itemListElement.map((item: { item: string }) => item.item),
  ).toEqual([
    `${getSiteOrigin()}/`,
    `${getSiteOrigin()}/projektai`,
    `${getSiteOrigin()}/projektai/lietuvos-nacionalinis-muziejus`,
  ]);
});

test("API rejects unrecognised project and source without attempting delivery", async ({
  request,
}) => {
  const data = {
    name: "Test Client",
    email: "test@example.com",
    message: "A test inquiry about a roof project.",
    consent: "on",
    service: "",
    website: "",
  };
  for (const invalid of [
    { source: "https://example.com" },
    { project: "made-up-project" },
  ]) {
    expect(
      (
        await request.post("/api/contact", { data: { ...data, ...invalid } })
      ).status(),
    ).toBe(400);
  }
});
