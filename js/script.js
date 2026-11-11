$(function () {
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
        if (!password.trim()) return "Enter a password.";
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