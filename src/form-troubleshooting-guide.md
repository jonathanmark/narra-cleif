# 🚀 Narra Cliffs Form Submission Troubleshooting Guide

## 📋 **Quick Checklist**

1. **✅ Google Apps Script Deployed Correctly**
2. **✅ Script URL is correct and accessible**
3. **✅ CORS headers are properly configured**
4. **✅ Google Sheets is connected**
5. **✅ All permissions are granted**

---

## 🔧 **Step-by-Step Troubleshooting**

### **1. Verify Google Apps Script Deployment**

#### Check Script URL:
- Your current script URL: `https://script.google.com/macros/s/AKfycbzB9--sScUWT_XilpGIfPpiseJRqiUO3rl1_jHSUe8JHwYRtYYL7Nx6OBwEYkrz1KrA/exec`
- Test this URL directly in your browser
- Should return JSON response (even if empty)

#### Deployment Steps:
1. Open Google Apps Script: https://script.google.com
2. Find your "Narra Cliffs Form Handler" project
3. Click **Deploy** → **Manage Deployments**
4. Ensure **Execute as**: "Me (your email)"
5. Ensure **Who has access**: "Anyone"
6. **Copy the new deployment URL** if it changed

### **2. Test the Google Apps Script**

#### Manual Test:
```bash
# Test with curl (replace URL with your actual URL)
curl -X POST \
  'https://script.google.com/macros/s/AKfycbzB9--sScUWT_XilpGIfPpiseJRqiUO3rl1_jHSUe8JHwYRtYYL7Nx6OBwEYkrz1KrA/exec' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+63 9XX XXX XXXX",
    "country": "Philippines",
    "consent": true
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Data saved successfully",
  "timestamp": "2025-01-XX..."
}
```

### **3. Browser Console Debugging**

#### Enable Detailed Logging:
1. Open your website
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Fill out and submit the form
5. Look for these log messages:

```javascript
🚀 Attempting submission to: https://script.google.com/...
📝 Submission data: {...}
📊 Response status: 200
📋 Response headers: {...}
✅ Parsed result: {...}
```

#### Common Error Messages:

**❌ CORS Error:**
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```
**Solution:** Redeploy the Google Apps Script with "Anyone" access

**❌ Network Error:**
```
TypeError: Failed to fetch
```
**Solution:** Check internet connection or script URL

**❌ 404 Not Found:**
```
HTTP 404: Not Found
```
**Solution:** Script URL is incorrect or script is not deployed

### **4. Update Google Apps Script (if needed)**

If you need to update the script, use this enhanced version:

```javascript
function doPost(e) {
  try {
    // Add more detailed logging
    console.log('Received request:', e.postData.contents);
    
    // Get the active spreadsheet (or create a new one)
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the form data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      throw new Error('Missing required fields');
    }
    
    // Check if this is the first entry (add headers)
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp', 'Full Name', 'Email', 'Phone', 'Country', 
        'Province', 'City', 'Lot of Interest', 'Consent Given', 
        'IP Address', 'User Agent', 'Website Origin'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setBackground('#4A573B')
        .setFontColor('white');
    }
    
    // Prepare the row data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.country || '',
      data.province || '',
      data.city || '',
      data.lotInterest || '',
      data.consent ? 'Yes' : 'No',
      data.ipAddress || 'Unknown',
      data.userAgent || 'Unknown',
      data.website || 'Unknown'
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, sheet.getLastColumn());
    
    // Send success response with enhanced headers
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully',
        timestamp: timestamp.toISOString(),
        rowNumber: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')
      .setHeader('Access-Control-Max-Age', '86400');
      
  } catch (error) {
    console.error('Script error:', error);
    
    // Send detailed error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error saving data: ' + error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')
      .setHeader('Access-Control-Max-Age', '86400');
  }
}

// Enhanced OPTIONS handler for CORS preflight
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')
    .setHeader('Access-Control-Max-Age', '86400');
}
```

### **5. Alternative Solutions**

If the Google Apps Script continues to fail, the enhanced ContactSection now provides:

#### **📧 Email Fallback**
- Click "Email Instead" button
- Opens pre-filled email to sales@narracliffs.com
- Works even if form submission fails

#### **📞 Direct Phone Call**
- Click "Call Now" button  
- Directly calls +63 917 123 4567
- Immediate contact option

#### **📋 Copy Contact Info**
- Click "Copy Info" button
- Copies form data and contact info to clipboard
- Can be pasted anywhere

### **6. Testing on Different Environments**

#### **Local Development:**
- Should work fine with detailed console logging

#### **Deployed Website:**
- May have CORS restrictions
- Check if your hosting platform allows external API calls

#### **HTTPS Requirement:**
- Ensure your website is served over HTTPS
- Google Apps Script requires HTTPS for CORS requests

---

## 🔄 **Quick Fixes**

### **Fix 1: Redeploy Google Apps Script**
1. Go to https://script.google.com
2. Find your script
3. Click **Deploy** → **New Deployment**
4. Set **Execute as**: "Me"
5. Set **Who has access**: "Anyone"
6. Copy new URL and update `GOOGLE_SCRIPT_URL` in ContactSection.tsx

### **Fix 2: Check Google Sheets Permissions**
1. Open your Google Sheet
2. Click **Share**
3. Ensure the script's email has "Editor" access
4. Or make sheet accessible to "Anyone with link"

### **Fix 3: Test Script Permissions**
1. In Google Apps Script, go to **Triggers**
2. Delete any old triggers
3. Create new trigger: **On form submit** → **From spreadsheet**

---

## 📞 **Emergency Contact Setup**

If technical issues persist, users can still contact you via:

- **📧 Email**: sales@narracliffs.com
- **📱 Phone**: +63 917 123 4567  
- **🌐 Website**: Your contact form has fallback options

The enhanced form now provides multiple contact methods, ensuring leads are never lost due to technical issues.

---

## 🔍 **Next Steps**

1. **Check the Browser Console** for detailed error messages
2. **Test the Google Apps Script URL** directly in your browser
3. **Verify deployment settings** in Google Apps Script
4. **Update script code** if needed with the enhanced version above
5. **Test alternative contact methods** (Email, Phone buttons)

Need more help? The form now includes debug information in development mode and better error messages for users.