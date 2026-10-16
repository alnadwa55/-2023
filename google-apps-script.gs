/**
 * يحفظ طلبات التسجيل في Google Sheet.
 * الخطوات في docs/SETUP-AR.md
 */
const SHEET_NAME = 'Registrations';

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(['التاريخ', 'الاسم', 'الهاتف', 'البريد', 'التخصص', 'ملاحظات', 'الحالة']);
      sh.setFrozenRows(1);
    }
    const clean = v => String(v == null ? '' : v).slice(0, 500).replace(/^[=+\-@]/, "'$&"); // منع حقن الصيغ
    sh.appendRow([clean(d.timestamp), clean(d.name), clean(d.phone), clean(d.email), clean(d.specialization), clean(d.message), 'جديد']);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  }
}
