Job Finding
Project description
Our topic is job finding in the IT field. We created a website where users can read about software engineering, cybersecurity and teaching roles in Astana. Each job card shows the position, experience, skills, location and monthly salary.
The website has junior and senior positions, so users can compare different requirements. The listings and salaries are examples for this project, not confirmed vacancies.
Group members
- Azamat Merzemkhan
- Yerbol Berdalin
- Yelnur Bizhan
Pages
- Home: introduces the website and explains the steps for choosing a job.
- Jobs: shows four IT-related positions and a table for comparing experience and salaries.
- Companies: gives information about Astana Hub, Astana IT University and the fictional company Qala Security.
- About: explains the purpose of the website and gives advice before applying.
- Contact: contains a form with name, email and message fields.
All five pages have the same navigation menu and footer. Users can move between pages using the menu and open the official websites linked on the Companies page.
Features and technologies
We used HTML for the page structure, CSS for styling and Bootstrap 5.3.3 for the job card layout and utility classes. The HTML structure includes header, nav, main and footer. Our styles are in css/style.css.
Flexbox aligns the logo and navigation menu. CSS Grid arranges the steps and company cards. The Jobs page uses Bootstrap columns to show three cards per row on large screens, two on medium screens and one on small screens.
Media queries at 992px and 576px adjust the layout, headings and spacing. We also used three CSS color variables, relative positioning, hover and focus styles, and nth-child for alternating table rows. The project includes a local font and an image with lazy loading.
The contact form uses required fields and an email input. It checks the entered values in the browser but does not send messages. The Endterm version uses JavaScript and jQuery. It adds a registration form with live validation and a password strength indicator, a case-insensitive job search with category filters, an editable comparison table, and a photo gallery with a lightbox and fade effects.

Registration is a browser-only demo. Changes to the comparison table last until the page is reloaded.
Individual contributions
Azamat Merzemkhan
Azamat worked on the Home and Jobs pages. He added the introduction, job cards and comparison table. His part included arranging the job cards with Bootstrap columns and adding the position details, skills and salaries.
Yerbol Berdalin
Yerbol worked on the Companies and About pages. He added company descriptions, locations and official website links. He also prepared the project description, goals and the list of steps to follow before applying.
Yelnur Bizhan
Yelnur worked on the Contact page and shared CSS. He added the form fields and validation attributes. His part also included the navigation layout, common colors, footer styles and media queries for smaller screens.
This is our planned division of work. Before submission, we will check that it matches each member's actual contribution. Each member should understand all pages for the defence.
How to run
Download the project folder and open index.html in a browser. Keep the css, fonts and images folders in the same project folder. Bootstrap and the font are included locally.
Website link
GitHub Pages https://elnur-ctrl.github.io/Midterm-project/
