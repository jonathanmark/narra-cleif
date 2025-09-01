# 🔧 Google Apps Script Troubleshooting Guide

## Quick Fix Steps

### 1. ⚡ Immediate Actions
Open your browser's **Developer Console** (F12) and run:
```javascript
// Test your script connection
testGoogleScript('https://script.google.com/macros/s/AKfycbzB9--sScUWT_XilpGIfPpiseJRqiUO3rl1_jHSUe8JHwYRtYYL7Nx6OBwEYkrz1KrA/exec');
```

### 2. 🔍 Check Script Deployment
1. **Go to**: https://script.google.com/d/1FXvfosztqOmCWP6dCtJ0vFggTK0n8DqIrvNBG-AzjfAECWD8toI0FvVs/edit
2. **Click "Deploy"** → **"Manage deployments"**
3. **Verify settings**:
   - ✅ Type: **Web app**
   - ✅ Execute as: **Me (your-email@gmail.com)**
   - ✅ Who has access: **Anyone**

### 3. 🔄 Redeploy the Script
If the above settings are wrong:
1. **Click "New deployment"**
2. **Set correct settings** (see above)
3. **Click "Deploy"**
4. **Copy the new Web App URL**
5. **Update ContactSection.tsx** with new URL

### 4. 🧪 Test Script Code
Make sure your Google Apps Script contains this **exact code**:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    if (sheet.getLastRow() === 0) {
      const headers = ['Timestamp', 'Full Name', 'Email', 'Phone', 'Country', 'Province', 'City', 'Lot of Interest', 'Consent Given', 'IP Address', 'User Agent'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4A573B').setFontColor('white');
    }
    
    const timestamp = new Date();
    const rowData = [timestamp, data.name || '', data.email || '', data.phone || '', data.country || '', data.province || '', data.city || '', data.lotInterest || '', data.consent ? 'Yes' : 'No', data.ipAddress || 'Unknown', data.userAgent || 'Unknown'];
    sheet.appendRow(rowData);
    sheet.autoResizeColumns(1, sheet.getLastColumn());
    
    return ContentService.createTextOutput(JSON.stringify({success: true, message: 'Data saved successfully', timestamp: timestamp.toISOString()})).setMimeType(ContentService.MimeType.JSON).setHeader('Access-Control-Allow-Origin', '*').setHeader('Access-Control-Allow-Methods', 'POST').setHeader('Access-Control-Allow-Headers', 'Content-Type');
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, message: 'Error saving data: ' + error.toString()})).setMimeType(ContentService.MimeType.JSON).setHeader('Access-Control-Allow-Origin', '*').setHeader('Access-Control-Allow-Methods', 'POST').setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

function doOptions() {
  return ContentService.createTextOutput('').setHeader('Access-Control-Allow-Origin', '*').setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS').setHeader('Access-Control-Allow-Headers', 'Content-Type').setHeader('Access-Control-Max-Age', '86400');
}
```

## 🔍 Error Diagnosis

### "Failed to fetch" Error
**Causes:**
- ❌ Script not deployed as Web App
- ❌ Wrong permission settings
- ❌ CORS headers missing
- ❌ URL is incorrect

**Solutions:**
1. **Redeploy script** with correct settings
2. **Test URL directly** in browser
3. **Check browser console** for detailed errors

### "Invalid response format" Error
**Causes:**
- ❌ Script returning HTML instead of JSON
- ❌ Google login page being returned

**Solutions:**
1. **Set "Execute as: Me"** in deployment
2. **Grant all permissions** during deployment
3. **Test with simple data** first

### "HTTP 404" Error
**Causes:**
- ❌ Deployment URL is wrong
- ❌ Script was deleted or renamed

**Solutions:**
1. **Check deployment URL** in Apps Script
2. **Verify script exists** and is saved
3. **Create new deployment** if needed

## 🧪 Testing Tools

### Browser Console Commands
Open Developer Tools (F12) and run:

```javascript
// Quick connectivity test
fetch('YOUR_SCRIPT_URL').then(r => console.log('Status:', r.status)).catch(e => console.error('Error:', e));

// Full diagnostic
diagnoseScriptIssues();

// Complete test with sample data
testGoogleScript('YOUR_SCRIPT_URL');
```

### Manual URL Test
1. **Copy your Web App URL**
2. **Open in new browser tab**
3. **Should see**: JSON response or Google permissions page
4. **Should NOT see**: 404 error or Google Apps Script editor

## 🚀 Alternative Solutions

### Option 1: New Deployment
1. **Create completely new deployment**
2. **Use different Google account** if needed
3. **Test with minimal script** first

### Option 2: Different Approach
If Google Apps Script continues to fail:
1. **Use Netlify Forms** (free)
2. **Use Formspree** (free tier available)
3. **Use EmailJS** (free tier available)

### Option 3: Temporary Workaround
For immediate functionality:
1. **mailto: link** as fallback
2. **Phone contact** as primary
3. **Collect data in localStorage** temporarily

## 📞 Need Help?

**Console Output Example:**
```
🔍 Testing Google Apps Script Connection...
📍 Script URL: https://script.google.com/macros/s/.../exec
❌ GET request failed: TypeError: Failed to fetch
```

**If you see this**, the issue is with script deployment or permissions.

**Next Steps:**
1. Run the diagnostic commands above
2. Follow the deployment checklist
3. Share console output if issues persist