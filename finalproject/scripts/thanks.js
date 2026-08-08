// thanks.js — reads the "Come ride with us" form fields from the URL
// and displays them back to the person, using URLSearchParams.

function displaySubmission() {
    const params = new URLSearchParams(window.location.search);

    const name = params.get("name");
    const email = params.get("email");
    const discipline = params.get("discipline");
    const experience = params.get("experience");
    const message = params.get("message");

    const nameEl = document.querySelector("#thanks-name");
    if (nameEl && name) {
        nameEl.textContent = name;
    }

    const summaryEl = document.querySelector("#thanks-summary");
    if (!summaryEl) return;

    const rows = [
        { label: "Name", value: name },
        { label: "Email", value: email },
        { label: "Riding interest", value: discipline },
        { label: "Experience level", value: experience },
        { label: "Message", value: message },
    ];

    const hasAnyData = rows.some((row) => row.value);

    if (!hasAnyData) {
        summaryEl.innerHTML = "<p>Looks like you got here directly &mdash; head back to the form to send us your info.</p>";
        return;
    }

    summaryEl.innerHTML = rows
        .filter((row) => row.value)
        .map(
            (row) => `
        <div class="summary-row">
          <span class="summary-label">${row.label}</span>
          <span class="summary-value">${row.value}</span>
        </div>
      `
        )
        .join("");
}

document.addEventListener("DOMContentLoaded", displaySubmission);