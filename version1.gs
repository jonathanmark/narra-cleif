/* === CONFIG VIA SCRIPT PROPERTIES ===
   SHEET_NAME     = "Inquiries"
   VIBER_BOT_TOKEN= "<your-bot-token or blank>"
   VIBER_OWNER_ID = "<auto-filled after owner messages the bot>"
   WEBHOOK_URL    = "<your web app URL>"
*/

function getProp_(key, def) {
  const props = PropertiesService.getScriptProperties();
  return props.getProperty(key) || def || '';
}

function setProp_(key, val) {
  PropertiesService.getScriptProperties().setProperty(key, val);
}

function doGet() {
  // Handy for opening the Web App URL in a browser—it should show "OK"
  return ContentService.createTextOutput('OK');
}

function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var payload = JSON.parse(raw);

    // If this is a Viber webhook event (safe to leave as-is)
    if (payload && payload.event) {
      var viberResp = handleViberWebhook_(payload);
      return ContentService
        .createTextOutput(JSON.stringify(viberResp))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ===== Save to Google Sheet =====
    var sheetName = 'Inquiries'; // write to the "Inquiries" tab
    var ss = SpreadsheetApp.openById('1wpf0CaTycIYseaNUaiyN3dYd-6T-qLe1iMThFuAfn1E'); // <-- your Sheet ID
    var sh = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

    var now = new Date();
    var row = [
      now,
      payload.name || '',
      payload.email || '',
      payload.phone || '',
      payload.country || '',
      payload.province || '',
      payload.city || '',
      payload.lotInterest || '',
      String(payload.consent || false),
      payload.ipAddress || '',
      payload.userAgent || '',
      payload.website || ''
    ];
    sh.appendRow(row);

    try { sendViberAlert_(payload); } catch (vErr) { console.log('Viber notify failed: ' + vErr); }

    var result = { success: true, message: 'Saved to Google Sheets' };
    return ContentService.createTextOutput(JSON.stringify(result))
                         .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    var errorResult = { success: false, message: String(err) };
    return ContentService.createTextOutput(JSON.stringify(errorResult))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

/* === Viber Bot helpers === */

function sendViberAlert_(data) {
  var token = getProp_('VIBER_BOT_TOKEN', '');
  var ownerId = getProp_('VIBER_OWNER_ID', '');
  if (!token || !ownerId) return; // not configured

  var text =
    'New Inquiry:\n' +
    'Name: ' + (data.name || '') + '\n' +
    'Email: ' + (data.email || '') + '\n' +
    'Phone: ' + (data.phone || '') + '\n' +
    'Location: ' + [data.city, data.province, data.country].filter(Boolean).join(', ') + '\n' +
    (data.lotInterest ? ('Lot: ' + data.lotInterest + '\n') : '') +
    'Website: ' + (data.website || '') + '\n' +
    'Time: ' + new Date().toLocaleString();

  var url = 'https://chatapi.viber.com/pa/send_message';
  var payload = { receiver: ownerId, type: 'text', text: text };
  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    headers: { 'X-Viber-Auth-Token': token },
    muteHttpExceptions: true
  };
  var res = UrlFetchApp.fetch(url, options);
  console.log('Viber send_message status: ' + res.getResponseCode() + ' ' + res.getContentText());
}

function handleViberWebhook_(payload) {
  try {
    var event = payload.event;

    if (event === 'message' && payload.sender && payload.sender.id) {
      var senderId = payload.sender.id;
      if (!getProp_('VIBER_OWNER_ID', '')) setProp_('VIBER_OWNER_ID', senderId);
      viberReply_(senderId, 'Thanks! You will now receive new inquiry alerts here.');
    }

    if (event === 'conversation_started' && payload.user && payload.user.id) {
      var uid = payload.user.id;
      if (!getProp_('VIBER_OWNER_ID', '')) setProp_('VIBER_OWNER_ID', uid);
      viberReply_(uid, 'Welcome! You will receive Narra Cliffs inquiry alerts here.');
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

function viberReply_(receiverId, text) {
  var token = getProp_('VIBER_BOT_TOKEN', '');
  if (!token) return;
  var url = 'https://chatapi.viber.com/pa/send_message';
  var payload = { receiver: receiverId, type: 'text', text: text };
  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    headers: { 'X-Viber-Auth-Token': token },
    muteHttpExceptions: true
  };
  UrlFetchApp.fetch(url, options);
}

/* === One-time: set webhook to this script URL === */
function setViberWebhook() {
  var token = getProp_('VIBER_BOT_TOKEN', '');
  var webhookUrl = getProp_('WEBHOOK_URL', '');
  if (!token || !webhookUrl) {
    console.log('Missing VIBER_BOT_TOKEN or WEBHOOK_URL; cannot set webhook.');
    return;
  }
  var url = 'https://chatapi.viber.com/pa/set_webhook';
  var payload = {
    url: webhookUrl,
    event_types: ['message', 'conversation_started', 'subscribed']
  };
  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    headers: { 'X-Viber-Auth-Token': token },
    muteHttpExceptions: true
  };
  var res = UrlFetchApp.fetch(url, options);
  console.log('set_webhook: ' + res.getResponseCode() + ' ' + res.getContentText());
}
