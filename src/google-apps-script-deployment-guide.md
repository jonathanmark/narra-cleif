# 🚀 **Google Apps Script Deployment Guide**

## ⚠️ **Important: Development vs Production URLs**

### **Your Current URL:**
```
https://script.google.com/macros/s/AKfycbyFJkulGls3oihhNwOs1pK8xE5fG9TE9Smro2JWikE/dev
```

**This is a DEVELOPMENT URL** (ends with `/dev`)

### **URL Types Explained:**

#### **🔧 Development URL** (`/dev`)
- ✅ **For Testing** - Perfect for development and testing
- ✅ **Latest Code** - Always runs the most recent version of your script
- ✅ **Immediate Updates** - Changes take effect immediately
- ❌ **Not for Production** - Can be unstable, may change

#### **🚀 Production URL** (`/exec`)
- ✅ **For Live Sites** - Stable, production-ready
- ✅ **Version Locked** - Runs a specific deployed version
- ✅ **Reliable** - Won't change unless you deploy a new version
- ❌ **Manual Updates** - Requires redeployment for changes

---

## 🔄 **How to Deploy to Production**

### **Step 1: Test Development Version**
1. **Fill out your contact form** on the website
2. **Check browser console** for logs:
   ```
   🚀 Attempting submission to Google Apps Script: https://...
   📝 Submission data: {...}
   📊 Response status: 200
   ✅ Parsed result: {...}
   ```
3. **Verify data appears** in your Google Sheet

### **Step 2: Deploy to Production**
1. Go to https://script.google.com
2. Open your **"Narra Cliffs Form Handler"** project
3. Click **"Deploy"** → **"New deployment"**
4. **Type**: Web app
5. **Execute as**: Me (your email)
6. **Who has access**: Anyone
7. **Click "Deploy"**
8. **Copy the new URL** (will end with `/exec`)

### **Step 3: Update Production URL**
Replace the URL in `/components/sections/ContactSection.tsx`:
```typescript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_NEW_PRODUCTION_ID/exec';
```

---

## 🧪 **Testing Your Current Setup**

### **Test 1: Manual URL Test**
Open this URL in your browser:
```
https://script.google.com/macros/s/AKfycbyFJkulGls3oihhNwOs1pK8xE5fG9TE9Smro2JWikE/dev
```

**Expected Result:** Should show JSON response or error message

### **Test 2: Form Submission Test**
1. **Fill out the contact form** on your website
2. **Submit the form**
3. **Check browser console** (F12 → Console tab)
4. **Look for success/error messages**

### **Test 3: Google Sheets Verification**
1. **Open your Google Sheet**
2. **Check if new row was added** with form data
3. **Verify all fields are populated correctly**

---

## 🔧 **Troubleshooting Common Issues**

### **❌ CORS Error**
```
Access to fetch at '...' has been blocked by CORS policy
```
**Solution:**
1. Redeploy the Google Apps Script
2. Ensure "Who has access" is set to "Anyone"
3. Make sure your script includes proper CORS headers

### **❌ 404 Not Found**
```
HTTP 404: Not Found
```
**Solution:**
1. Verify the script URL is correct
2. Ensure the script is deployed as a web app
3. Check that the script project exists

### **❌ Script Error**
```
Script function not found
```
**Solution:**
1. Ensure your script has `doPost` function
2. Check script permissions in Google Apps Script
3. Verify the script is saved and deployed

---

## 📊 **Google Apps Script Code**

Make sure your Google Apps Script contains this code:

```javascript
function doPost(e) {
  try {
    console.log('📝 Received form submission');
    
    // Get the active spreadsheet (replace with your sheet ID if needed)
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse form data
    const data = JSON.parse(e.postData.contents || '{}');
    console.log('📥 Received data:', data);
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      throw new Error('Missing required fields: name, email, or phone');
    }
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp', 'Name', 'Email', 'Phone', 'Country', 
        'Province', 'City', 'Lot Interest', 'Consent', 
        'IP Address', 'User Agent', 'Website'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Style headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold')
               .setBackground('#4A573B')
               .setFontColor('white');
    }
    
    // Prepare data row
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
      data.userAgent ? data.userAgent.substring(0, 100) : 'Unknown',
      data.website || 'Unknown'
    ];
    
    // Add data to sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, sheet.getLastColumn());
    
    // Send success response
    const response = {
      success: true,
      message: 'Inquiry submitted successfully',
      timestamp: timestamp.toISOString(),
      rowNumber: sheet.getLastRow()
    };
    
    console.log('✅ Success:', response);
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type')
      .setHeader('Access-Control-Max-Age', '86400');
      
  } catch (error) {
    console.error('❌ Error:', error);
    
    const errorResponse = {
      success: false,
      message: error.toString(),
      timestamp: new Date().toISOString()
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

// Handle CORS preflight requests
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '86400');
}
```

---

## ✅ **Current Status**

Your form is now configured to:

1. **✅ Submit to Google Apps Script** (development URL)
2. **✅ Automatically fallback to email** if script fails
3. **✅ Provide WhatsApp and phone alternatives**
4. **✅ Show clear success/error messages**

### **📋 Next Steps:**
1. **Test the current development setup**
2. **Verify data appears in Google Sheets**
3. **Deploy to production when ready**
4. **Update to production URL for live site**

### **🆘 Fallback Options:**
Even if the script fails, users can still contact you via:
- ✅ **Pre-filled Email** - Professional email template
- ✅ **WhatsApp** - Formatted message with inquiry details
- ✅ **Direct Phone Call** - Click-to-call functionality
- ✅ **Direct Email** - sales@narracliffs.com

**Your contact form is robust and ready for testing! 🎉**