const REQUIRED_FIELDS = ["name", "email", "state", "role", "interest"];

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    return response.status(500).json({
      ok: false,
      error: "Google Sheets is not configured yet.",
    });
  }

  try {
    const body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
    const signup = {
      name: clean(body.name),
      email: clean(body.email),
      state: clean(body.state),
      role: clean(body.role),
      interest: clean(body.interest),
      submittedAt: new Date().toISOString(),
    };

    const missingField = REQUIRED_FIELDS.find((field) => !signup[field]);
    if (missingField) {
      return response.status(400).json({
        ok: false,
        error: `Missing required field: ${missingField}.`,
      });
    }

    if (!isValidEmail(signup.email)) {
      return response.status(400).json({
        ok: false,
        error: "Please enter a valid email address.",
      });
    }

    const sheetsResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signup),
    });

    const responseText = await sheetsResponse.text();
    let result = {};

    try {
      result = JSON.parse(responseText);
    } catch {
      result = {};
    }

    if (!sheetsResponse.ok || result.ok !== true) {
      throw new Error(result.error || responseText || "Google Sheets rejected the submission.");
    }

    return response.status(200).json({
      ok: true,
      submittedAt: signup.submittedAt,
    });
  } catch (error) {
    console.error("Signup save failed:", error);
    return response.status(502).json({
      ok: false,
      error: "Unable to save signup right now. Please try again.",
    });
  }
};
