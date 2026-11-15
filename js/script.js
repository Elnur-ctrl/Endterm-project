$(function () {
    setupTheme();
    setupSignIn();
    setupFAQ();
    setupRemoteJobs();
    setupRegistration();
    setupJobSearch();
    setupJobTable();
    setupGallery();
});

function setupRegistration() {
    const form = $("#register-form");
    const feedback = $("#register-feedback");
    const emailInput = $("#register-email");
    const strength = $("#password-strength");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validate() {
        const name = $("#register-name").val().trim();
        const email = emailInput.val().trim();
        const password = $("#register-password").val();
        const confirmation = $("#register-confirm").val();

        let passwordLevel = "";
        if (password) {
            passwordLevel = "Weak";
            if (password.length >= 8) passwordLevel = "Medium";
            if (password.length >= 12 && /[a-z]/.test(password) &&
                /[A-Z]/.test(password) && /\d/.test(password)) {
                passwordLevel = "Strong";
            }
        }
        strength.text(passwordLevel ? `Password strength: ${passwordLevel}` : "");

        if (!name) return "Enter your name.";
        if (!emailPattern.test(email) || emailInput[0].validity.typeMismatch) {
            return "Enter a valid email address.";
        }
        if (password.length < 8 || !password.trim()) return "Use at least 8 characters for your password.";
        if (password !== confirmation) return "Passwords must match.";
        return "";
    }

    function showFeedback(message, isError) {
        feedback.text(message)
            .toggleClass("text-danger", isError)
            .toggleClass("text-success", !isError);
    }

    form.on("input", function () {
        const error = validate();
        showFeedback(error || "All fields look good.", Boolean(error));
    });

    form.on("submit", function (event) {
        event.preventDefault();

        const error = validate();
        if (error) {
            showFeedback(error, true);
            return;
        }

        this.reset();
        strength.empty();
        showFeedback("Registration form passed validation.", false);
    });
}

function setupJobSearch() {
    const search = $("#job-search");
    const filters = $("#job-filters button");
    const cards = $("#job-cards > div");
    const categories = {
        junior: "development",
        senior: "development",
        security: "security",
        lecturer: "teaching"
    };
    let category = "all";

    function filterJobs() {
        const query = search.val().trim().toLowerCase();
        let count = 0;

        cards.each(function () {
            const card = $(this);
            const jobId = card.find(".box").attr("id");
            const matchesCategory = category === "all" || categories[jobId] === category;
            const visible = matchesCategory && card.text().toLowerCase().includes(query);

            card.toggle(visible);
            if (visible) count++;
        });

        $("#job-search-empty").prop("hidden", count > 0);
    }

    search.on("input", filterJobs);

    filters.on("click", function () {
        category = this.dataset.category;

        filters.each(function () {
            const selected = this.dataset.category === category;
            $(this).attr("aria-pressed", String(selected))
                .toggleClass("btn-primary", selected)
                .toggleClass("btn-outline-secondary", !selected);
        });

        filterJobs();
    });
}

function setupJobTable() {
    const dialog = document.getElementById("job-dialog");
    if (!dialog) return;

    const form = $("#job-form");
    const tableBody = $("#job-table tbody");
    const title = $("#job-title");
    const experience = $("#job-experience");
    const salary = $("#job-salary");
    const feedback = $("#job-feedback");
    const formError = $("#job-form-error");
    let editingRow = null;

    function addButtons(cell) {
        cell.append(
            $('<button type="button" class="btn btn-sm btn-outline-secondary me-1 edit-job">Edit</button>'),
            $('<button type="button" class="btn btn-sm btn-outline-danger delete-job">Delete</button>')
        );
    }

    function openForm(row = null) {
        editingRow = row;
        form[0].reset();
        formError.empty();
        feedback.empty();

        if (row) {
            const cells = row.children();
            title.val(cells.eq(0).text());
            experience.val(cells.eq(1).text());
            salary.val(cells.eq(2).text().replace(/\D/g, ""));
        }

        $("#job-dialog-title").text(row ? "Edit position" : "Add position");
        $("#job-save").text(row ? "Save changes" : "Add position");
        dialog.showModal();
    }

    tableBody.find("tr").each(function () {
        addButtons($(this).children().last());
    });

    $("#job-add").on("click", function () {
        openForm();
    });

    $("#job-cancel").on("click", function () {
        dialog.close();
    });

    tableBody.on("click", ".edit-job", function () {
        openForm($(this).closest("tr"));
    });

    form.on("submit", function (event) {
        event.preventDefault();

        const position = title.val().trim();
        const years = experience.val().trim();

        if (!position || !years) {
            formError.text("Enter a position and experience.");
            return;
        }

        const salaryValue = Number(salary.val());
        if (!Number.isFinite(salaryValue) || salaryValue < 1 || salaryValue % 1 !== 0) {
            formError.text("Enter a positive whole-number salary.");
            return;
        }

        const row = editingRow || $("<tr>").append("<td></td><td></td><td></td><td></td>");
        const cells = row.children();

        cells.eq(0).text(position);
        cells.eq(1).text(years);
        cells.eq(2).text(Number(salary.val()).toLocaleString("en-US") + " ₸");

        if (!editingRow) {
            addButtons(cells.eq(3));
            tableBody.append(row);
        }

        feedback.text(editingRow ? "Position updated." : "Position added.");
        dialog.close();
    });

    tableBody.on("click", ".delete-job", function () {
        if (!window.confirm("Delete this position?")) return;

        $(this).closest("tr").remove();
        feedback.text("Position deleted.");
    });
}

function setupGallery() {
    const dialog = document.getElementById("gallery-dialog");
    if (!dialog) return;

    const thumbnails = $(".gallery-thumb img");
    const photo = $("#gallery-photo");
    let current = 0;

    function showPhoto() {
        const image = thumbnails.eq(current);
        photo.stop(true, true).hide()
            .attr({ src: image.attr("src"), alt: image.attr("alt") })
            .fadeIn(180);
    }

    function move(direction) {
        current = (current + direction + thumbnails.length) % thumbnails.length;
        showPhoto();
    }

    function closeGallery(event) {
        event.preventDefault();

        $(dialog).stop(true).animate({ opacity: 0 }, 150, function () {
            dialog.close();
            $(dialog).css("opacity", "");
        });
    }

    $(".gallery-thumb").on("click", function () {
        current = $(".gallery-thumb").index(this);
        dialog.showModal();
        showPhoto();
    });

    $("#gallery-prev").on("click", function () { move(-1); });
    $("#gallery-next").on("click", function () { move(1); });
    $("#gallery-close").on("click", closeGallery);
    $(dialog).on("cancel", closeGallery);
}

// Final project features
function readStorage(key) {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        return null;
    }
}

function saveStorage(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        return false;
    }
}

function setupTheme() {
    let theme = readStorage("job-theme") === "dark" ? "dark" : "light";
    function applyTheme() {
        document.documentElement.setAttribute("data-bs-theme", theme);
        $("#theme-toggle").text(theme === "dark" ? "Light mode" : "Dark mode");
        $("#theme-toggle").attr("aria-pressed", String(theme === "dark"));
    }
    applyTheme();
    $("#theme-toggle").on("click", function () {
        theme = theme === "dark" ? "light" : "dark";
        applyTheme();
        if (!saveStorage("job-theme", theme)) {
            alert("Your browser cannot save the theme. It will reset on refresh.");
        }
    });
}

function setupSignIn() {
    let user = null;
    try {
        const stored = JSON.parse(readStorage("job-user"));
        if (stored && typeof stored.name === "string" && typeof stored.email === "string") {
            user = stored;
        }
    } catch (error) {
        user = null;
    }
    function updateAccount() {
        $("#account-status").text(user ? "Hello, " + user.name : "");
        $("#sign-in-link").prop("hidden", Boolean(user));
        $("#sign-out").prop("hidden", !user);
        $("#sign-in-form").prop("hidden", Boolean(user));
        $("#signed-in-message").prop("hidden", !user).text(user ? "Signed in as " + user.name + ". You can sign out in the header." : "");
    }
    updateAccount();
    $("#sign-in-form").on("submit", function (event) {
        event.preventDefault();
        const name = $("#login-name").val().trim();
        const email = $("#login-email").val().trim();
        const feedback = $("#login-feedback");
        feedback.removeClass("text-success").addClass("text-danger");
        if (!name || name.length > 60) {
            feedback.text("Enter your name, up to 60 characters.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
            feedback.text("Enter a valid email address.");
            return;
        }
        const account = { name: name, email: email };
        if (!saveStorage("job-user", JSON.stringify(account))) {
            feedback.text("Sign-in could not be saved. Allow browser storage and try again.");
            return;
        }
        user = account;
        this.reset();
        updateAccount();
        feedback.removeClass("text-danger").addClass("text-success").text("Demo sign-in saved in this browser.");
    });
    $("#sign-out").on("click", function () {
        try {
            localStorage.removeItem("job-user");
        } catch (error) {
            alert("Sign-out could not be saved. Allow browser storage and try again.");
            return;
        }
        user = null;
        updateAccount();
        $("#login-feedback").removeClass("text-danger").addClass("text-success").text("You are signed out.");
    });
    $("#contact-form").on("submit", function (event) {
        event.preventDefault();
        $("#contact-feedback").text("Form checked. This demo does not send messages.");
    });
}

function setupFAQ() {
    $(".faq-question").on("click", function () {
        const button = $(this);
        const expanded = button.attr("aria-expanded") === "true";
        button.attr("aria-expanded", String(!expanded));
        button.find(".faq-indicator").text(expanded ? "+" : "−");
        $("#" + button.attr("aria-controls")).stop(true, true).slideToggle(200);
    });
}

function setupRemoteJobs() {
    if (!document.getElementById("api-results")) return;
    let jobs = [];
    let loaded = false;
    let sourceMessage = "";
    const cacheKey = "job-remote-cache";
    const cacheAge = 6 * 60 * 60 * 1000;

    function renderJobs() {
        const query = $("#remote-search").val().trim().toLowerCase();
        const type = $("#remote-type").val();
        const results = $("#api-results");
        results.empty();
        let count = 0;
        for (let i = 0; i < jobs.length; i++) {
            const job = jobs[i];
            const text = (job.title + " " + job.company_name + " " + job.candidate_required_location).toLowerCase();
            if (!text.includes(query) || (type !== "all" && job.job_type !== type)) continue;
            count++;
            const column = $("<div class='col-12 col-md-6 col-lg-4 mb-3'></div>");
            const card = $("<article class='box remote-card'></article>");
            card.append($("<h3></h3>").text(job.title));
            card.append($("<p></p>").text(job.company_name));
            card.append($("<p></p>").text("Location: " + (job.candidate_required_location || "Check listing")));
            card.append($("<p></p>").text("Type: " + (job.job_type || "Not specified").replace(/_/g, " ")));
            card.append($("<p></p>").text("Salary: " + (job.salary || "Not specified")));
            // Only link to the source provider, never execute API HTML descriptions.
            if (typeof job.url === "string" && job.url.startsWith("https://remotive.com/")) {
                card.append($("<a class='btn btn-primary' target='_blank' rel='noopener noreferrer'>View on Remotive</a>").attr("href", job.url));
            }
            column.append(card);
            results.append(column);
        }
        $("#api-status").removeClass("text-danger").text(count === 0 ? "No matching jobs. Try another search or job type. " + sourceMessage : "Jobs found: " + count + ". " + sourceMessage);
    }

    $("#remote-search").on("input", function () { if (loaded) renderJobs(); });
    $("#remote-type").on("change", function () { if (loaded) renderJobs(); });
    $("#load-jobs").on("click", async function () {
        const button = $(this);
        const status = $("#api-status");
        button.prop("disabled", true).text("Loading...");
        $("#api-results").empty().attr("aria-busy", "true");
        status.removeClass("text-danger").text("Loading remote jobs from Remotive...");
        loaded = false;
        try {
            let cached = null;
            try { cached = JSON.parse(readStorage(cacheKey)); } catch (error) { cached = null; }
            if (cached && Array.isArray(cached.jobs) && Date.now() - cached.time < cacheAge) {
                jobs = cached.jobs;
                sourceMessage = "Saved results from " + new Date(cached.time).toLocaleString() + ".";
            } else {
                const controller = new AbortController();
                const timer = setTimeout(function () { controller.abort(); }, 15000);
                let data;
                try {
                    const response = await fetch("https://remotive.com/api/remote-jobs?category=software-dev&limit=50", { signal: controller.signal });
                    if (!response.ok) throw new Error("Request failed");
                    data = await response.json();
                } finally {
                    clearTimeout(timer);
                }
                if (!Array.isArray(data.jobs)) throw new Error("Invalid response");
                jobs = data.jobs.map(function (job) {
                    return {
                        title: String(job.title || "Untitled position"),
                        company_name: String(job.company_name || "Company not specified"),
                        candidate_required_location: String(job.candidate_required_location || ""),
                        job_type: String(job.job_type || ""),
                        salary: String(job.salary || ""),
                        category: String(job.category || ""),
                        url: String(job.url || "")
                    };
                });
                jobs = jobs.filter(function (job) {
                    return /software|data|information technology|devops|qa|technical/i.test(job.category);
                });
                const time = Date.now();
                saveStorage(cacheKey, JSON.stringify({ time: time, jobs: jobs }));
                sourceMessage = "Retrieved from Remotive at " + new Date(time).toLocaleString() + ".";
            }
            loaded = true;
            renderJobs();
        } catch (error) {
            jobs = [];
            status.addClass("text-danger").text("Remote jobs could not be loaded. Check your connection and select Load jobs to retry.");
        } finally {
            button.prop("disabled", false).text("Load jobs");
            $("#api-results").attr("aria-busy", "false");
        }
    });
}
