# Job Finding

A Front End final project about IT careers in Astana and remote software jobs. It extends the same Midterm and Endterm website.

## Group members
- Azamat Merzemkhan
- Yerbol Berdalin
- Yelnur Bizhan

## Pages
- Home: introduction and workplace gallery.
- Jobs: example Astana jobs, search/filter, comparison table and live remote jobs.
- Companies: workplaces and official links.
- About: goals, FAQ and team information.
- Contact: contact/registration forms and demo sign-in.

## Features
- Responsive HTML5, external CSS, Flexbox/Grid and Bootstrap.
- Light/Dark theme saved in localStorage across all pages and refreshes.
- Demo sign-in with validated name/email, persistent user interface and sign-out. Only name/email are stored; no password or server account.
- Six FAQ questions using jQuery slideToggle() and +/− indicators.
- Remotive public API using fetch(), JSON processing, search and job-type filters, loading/empty/error states and retry. Results are cached for six hours to reduce API requests.
- Endterm features retained: email/password validation, job search and categories, CRUD comparison table and lightbox gallery.

## Technologies and running
HTML5, CSS3, Bootstrap 5.3.3, JavaScript and jQuery 3.7.1. Bootstrap, jQuery, fonts and images are included locally. Open index.html or serve the folder with a local web server. An internet connection is required for live API data.

Local Astana listings are examples. Real remote listings come from [Remotive](https://remotive.com/); applications are made on the original listing. Demo table edits reset on refresh.

## Team responsibilities
The following responsibilities organise the final project review and defence:
- Azamat Merzemkhan: Jobs page, CRUD and remote API integration.
- Yerbol Berdalin: Companies/About content, FAQ and search/filter review.
- Yelnur Bizhan: Contact forms, demo sign-in and shared theme/gallery review.

Each member must review the final code and confirm their actual contribution before submission.

## AI Usage Acknowledgement

OpenAI ChatGPT was used as a supporting tool for code suggestions,
debugging, explanations and checking compliance with the assignment
requirements. Some AI-assisted code was incorporated into the project.

## Resources

API documentation: https://github.com/remotive-com/remote-jobs-api

Website: https://elnur-ctrl.github.io/Endterm-project/

Repository: https://github.com/Elnur-ctrl/Endterm-project
