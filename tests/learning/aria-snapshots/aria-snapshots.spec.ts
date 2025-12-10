import { test, expect } from "@playwright/test";

const webtrainAriaSnapshot = `- main:
  - heading "ARIA Accessibility Examples" [level=2]
  - form "Correct ARIA Form":
    - heading "Correct ARIA Form" [level=3]
    - text: "Name:"
    - textbox "Name:"
    - text: "Email:"
    - textbox "Email:"
    - button "Submit contact form": Submit
  - text: No new notifications.
  - table "Sample Data Table":
    - rowgroup:
      - row "Name Role":
        - columnheader "Name"
        - columnheader "Role"
    - rowgroup:
      - row "Alice Admin":
        - cell "Alice"
        - cell "Admin"
      - row "Bob User":
        - cell "Bob"
        - cell "User"
  - list "Task List":
    - listitem: Task 1
    - listitem: Task 2
  - button "Toggle"
  - dialog "Info Dialog":
    - heading "Info Dialog" [level=3]
    - paragraph: This dialog provides additional information for accessibility testing.
    - button "Close dialog": Close
  - heading "Incorrect ARIA Usage" [level=2]
  - heading "Missing Labels" [level=3]
  - text: "Name:"
  - textbox
  - text: "Email:"
  - textbox
  - button "Submit"
  - heading "Wrong Roles" [level=3]
  - button "Pretend Button"
  - checkbox "Pretend Checkbox"
  - heading "Non-semantic Interactive" [level=3]
  - text: Click me (no role, no keyboard support)
  - heading "Duplicate IDs" [level=3]
  - text: Field 1
  - textbox "Field 1 Field 2"
  - text: Field 2
  - textbox
  - heading "Poor Contrast" [level=3]
  - paragraph: This text has poor contrast.
  - heading "Image labels and alternative texts" [level=2]
  - paragraph: Images should have descriptive alt text to convey their meaning. If image have already text label, avoid redundant labeling.
  - heading "Alt examples" [level=3]
  - paragraph: "Good image:"
  - img "Woman sitting at front of computer"
  - paragraph: "Bad image (missing alt):"
  - img
  - heading "Decorative Images" [level=3]
  - paragraph: Decorative images should have empty alt attributes (alt="") so they are ignored by assistive technologies. If you fill the alt attribute for example for icons which have labels, screen reader will read the information twice.
  - paragraph: Correct use of empty alt attribute
  - paragraph: Home
  - paragraph: Search
  - paragraph: "Incorrect: alt attribute is filled for decorative icons"
  - paragraph:
    - img "Home"
    - text: Home
  - paragraph:
    - img "Search"
    - text: Search`;

test("Aria Snapshot Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/aria-testing.html");
  await expect(page.locator("main.actions-container")).toMatchAriaSnapshot(
    webtrainAriaSnapshot
  );
});
