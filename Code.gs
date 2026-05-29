const SHEET_NAME = "Signups";
const HEADERS = [
  "Submission Date/Time",
  "Name",
  "Email",
  "State/Territory",
  "Role",
  "Interest",
];

function doPost(event) {
  try {
    const data = JSON.parse(event.postData.contents || "{}");
    const sheet = getSignupSheet_();

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.state || "",
      data.role || "",
      data.interest || "",
    ]);

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  }
}

function getSignupSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  return sheet;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
