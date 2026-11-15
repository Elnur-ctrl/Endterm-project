# Final project verification

Checked on 15 November 2026.

## Source checks
- JavaScript syntax check passed.
- Local HTML, CSS, jQuery, fonts and image resources are included.
- Final feature source files were compared with the main branch after publication.

## Functional checks
DOM tests covered persistent theme and demo sign-in across five pages, invalid sign-in, sign-out, six FAQ panels, API results/search/cache, API empty/error states, original job filtering, CRUD and gallery navigation. Dialog open/close state was simulated in these tests.

## Deployed browser checks
Verified on https://elnur-ctrl.github.io/Endterm-project/ in a fresh browser:
- Dark theme remains active after refresh and navigation.
- Demo sign-in changes the header and remains active on another page.
- Sign-out remains effective after refresh.
- FAQ answers expand and collapse, with +/− indicators.
- The Remotive API loaded 7 IT jobs during this check; searching REACT reduced the result to 1. Counts change with the source data.
- All gallery images loaded.

At a 375 px viewport, all five pages had a document width of 375 px with no horizontal page overflow. The temporary viewport override was reset after the check.

## Limitations
Sign-in is a local browser demo, not server authentication. Table edits reset on refresh. The API requires internet access and results are cached for six hours. External API availability can change.
