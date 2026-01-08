async function handleForm(e) {
  e.preventDefault();
  const form = e.target;
  const statusEl = form.querySelector("[data-status]");
  if (!statusEl) return;

  statusEl.textContent = "";
  statusEl.className = "notice";

  try {
    const resp = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    });

    if (resp.ok) {
      form.reset();
      statusEl.textContent = "Submitted. We’ll follow up with next steps.";
      statusEl.classList.add("ok");
    } else {
      statusEl.textContent = "Submission failed. Try again later.";
      statusEl.classList.add("err");
    }
  } catch {
    statusEl.textContent = "Network error. Check your connection and try again.";
    statusEl.classList.add("err");
  }
}

document.addEventListener("submit", (e) => {
  if (e.target.matches("form[data-ajax]")) handleForm(e);
});