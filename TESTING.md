# Browser testing report

## Scope and environment

- Date: 2026-11-11.
- Tested revision: `02a8b33`.
- Browser: Chrome 157 on macOS.
- Method: browser interactions driven with Playwright against a local copy of the website.
- Local address: `http://127.0.0.1:8768/`.
- Responsive checks: desktop viewport at 1366 × 900 and narrow viewport at 390 × 844. The narrow viewport is a desktop browser resize, not a physical phone test.
- jQuery loaded successfully from its CDN during the checks.

This contribution documents testing only. It does not change the website's HTML, CSS, JavaScript, images or fonts.

## How to repeat the checks

From the project directory, run:

```sh
python3 -m http.server 8768 --bind 127.0.0.1
```

Open `http://127.0.0.1:8768/index.html`. Keep an internet connection available for jQuery. Use the steps below; reload Jobs before testing the table to restore the four original rows. All form values below are fictional test data.

## Navigation and gallery

| Check / steps | Expected result | Observed result | Status |
| --- | --- | --- | --- |
| Follow Jobs, Companies, About, Contact and Home in the navigation. | Each link opens the corresponding page. | All five pages opened with the expected page titles. | Pass |
| Load Home and inspect its gallery images. | All three thumbnails load. | `work.png`, `office.jpg` and `computer-lab.jpg` loaded. | Pass |
| Click the first thumbnail. | A modal displays the selected image. | The gallery dialog opened with `work.png`. | Pass |
| Click Next from the first image. | The second image appears. | `office.jpg` appeared. | Pass |
| Return to the first image, then click Previous again. | Navigation wraps to the last image. | `computer-lab.jpg` appeared. | Pass |
| Close the gallery with its close button. | The dialog closes. | The dialog closed. | Pass |
| Reopen the gallery and press Escape. | The dialog closes. | The dialog closed. | Pass |

## Job search and categories

| Check / steps | Expected result | Observed result | Status |
| --- | --- | --- | --- |
| Open Jobs without a search or category filter. | Four vacancy cards are visible. | Four cards were visible. | Pass |
| Search for `jAvAsCrIpT`. | Search ignores case and matches skills. | Only Junior Software Engineer remained visible. | Pass |
| Keep that query and select Cybersecurity. | Both search and category apply; no cards match. | No cards were visible and `No matching jobs.` appeared. | Pass |
| Clear the query while Cybersecurity remains selected. | Only the cybersecurity card is visible. | Only Cybersecurity Analyst appeared. | Pass |
| Select Teaching with an empty query. | Only the teaching card is visible. | Only Computer Science Lecturer appeared. | Pass |
| Select Development with an empty query. | Both developer cards are visible. | Two developer cards appeared. | Pass |
| Select All with an empty query. | All four cards are restored. | Four cards were visible. | Pass |

## Comparison table

| Check / steps | Expected result | Observed result | Status |
| --- | --- | --- | --- |
| Open Add position and submit an empty form. | Required fields prevent adding a row. | The dialog stayed open; the table retained four rows. | Pass |
| Enter `QA Test Position`, `0–1 year` and salary `0`; submit. | The salary must be at least 1. | Browser validation rejected zero; no row was added. | Pass |
| Change the salary to `720000` and submit. | A fifth row is added with formatted salary. | The new row displayed `720,000 ₸`. | Pass |
| Edit the new row. | The form contains the existing values. | Title was `QA Test Position`; salary input was `720000`. | Pass |
| Change the title to `QA Updated Position` and salary to `750000`; save. | The same row updates without adding another. | The table retained five rows and displayed the updated title and `750,000 ₸`. | Pass |
| Edit that row, enter `Unsaved change`, then click Cancel. | The saved row is preserved. | The row still displayed `QA Updated Position`. | Pass |
| Reload after adding or editing test data. | The original example table returns, as described in README. | Four original rows returned and the temporary row disappeared. | Pass |
| Click Delete on an original row and dismiss the confirmation. | The row remains. | The table retained four rows. | Pass |
| Click Delete again and accept the confirmation. | The selected row is removed. | The table contained three rows. Reload restored the examples. | Pass |

## Registration and contact forms

| Check / steps | Expected result | Observed result | Status |
| --- | --- | --- | --- |
| Submit an empty registration form. | Submission is rejected with feedback. | `Enter your name.` appeared. | Pass |
| Enter name `QA Tester`, email `invalid-email`, and matching passwords; submit. | Invalid email is rejected. | `Enter a valid email address.` appeared. | Pass |
| Use email `qa@example.com` and different passwords; submit. | Nonmatching passwords are rejected. | `Passwords must match.` appeared. | Pass |
| Enter password `abc`. | The strength indicator says Weak. | `Password strength: Weak` appeared. | Pass |
| Enter password `abcdefgh`. | The strength indicator says Medium. | `Password strength: Medium` appeared. | Pass |
| Enter password `QaTestPass12345`. | The strength indicator says Strong. | `Password strength: Strong` appeared. | Pass |
| Submit name `QA Tester`, email `qa@example.com` and matching `QaTestPass12345` passwords. | Demo validation succeeds and the form resets. | `Registration form passed validation.` appeared and the name field cleared. | Pass |
| Submit the contact form with name `QA Tester`, email `qa@example.com` and message `Demo check`. | The demo reloads Contact using GET parameters. | The URL contained the submitted name, email and message; no message-delivery result was shown. | Pass |

## Responsive checks

| Check / steps | Expected result | Observed result | Status |
| --- | --- | --- | --- |
| Load all five pages at 390 × 844. | No document-level horizontal overflow. | Document width did not exceed viewport width on any page. | Pass |
| Inspect navigation bounds on all five pages at 390 × 844. | All five navigation links fit within the viewport. | Each link's horizontal bounds were within the viewport. | Pass |
| Load all five pages at 1366 × 900. | No document-level horizontal overflow. | Document width did not exceed viewport width on any page. | Pass |

## Observations and limits

- A one-character password (`a`) with matching confirmation passes registration validation. The strength indicator is informational; it does not enforce a minimum password length.
- Registration is a validation demo. A success message does not mean an account has been created.
- Table changes reset on reload. Adding a table row does not create a vacancy card or expand the search results; the table and cards are separate in the current code.
- The contact form places submitted values in the URL query string. Use fictional values when repeating the demo.
- The browser requested `/favicon.ico`, which returned 404 because the project has no favicon. No JavaScript errors were recorded in the browser console during these checks.
- Footer contact details are placeholders. The Home page uses `mailto:AITU-Progect.com`, which lacks an `@` address; other pages use `hello@example.com`. This was noted from the source, without sending email.
- Responsive checks above cover document width and navigation bounds. They do not establish full visual quality, accessibility compliance or physical-device compatibility.
- This report does not cover other browsers, offline/CDN failure, production hosting, real account creation or message delivery.
