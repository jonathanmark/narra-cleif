# 🔧 **Narra Cliffs - Proper Google Sheets Integration Guide**

## ⚠️ **Important: URL Type Clarification**

The URL you provided:
```
https://docs.google.com/spreadsheets/d/e/2PACX-1vQMOkddlkbu2gsk7NuPIqv3R3kD_f-udQKfziuTYqnJbNy0x5ERfdqljN86bRd1kJgoiv2Nznyf5cKE/pubhtml
```

This is a **Google Sheets Published HTML URL**, not a **Google Apps Script Web App URL**. This type of URL is for viewing sheets as web pages, not for receiving form data via POST requests.

---

## 🚀 **3 Recommended Solutions (Easiest to Advanced)**

### **📋 Option 1: Google Forms (EASIEST - 5 minutes)**

#### **Step 1: Create Google Form**
1. Go to https://forms.google.com
2. Click **"+ Blank"** to create new form
3. Title: "Narra Cliffs Site Visit Inquiry"

#### **Step 2: Add Form Fields**
Add these questions (in order):
1. **Short Answer**: "Full Name" (Required)
2. **Short Answer**: "Email Address" (Required)  
3. **Short Answer**: "Phone Number" (Required)
4. **Dropdown**: "Country" → Add option "Philippines"
5. **Dropdown**: "Province" → Add your target provinces
6. **Dropdown**: "City" → Add your target cities  
7. **Multiple Choice**: "Lot Interest" → Options: "Cliffside View", "Fairway View", "Lake View"
8. **Checkboxes**: "Consent" → "I agree to privacy policy..." (Required)

#### **Step 3: Get Form URL**
1. Click **"Send"** button
2. Copy the form link (looks like: `https://forms.gle/aBc123xyz`)
3. Replace `GOOGLE_FORM_URL` in the ContactSection code

#### **Step 4: Connect to Sheets**
1. In form editor, click **"Responses"** tab
2. Click **"Create Spreadsheet"** button
3. Responses will automatically populate your sheet

**✅ Pros:** Super easy, automatic data collection, mobile-friendly  
**❌ Cons:** Takes users away from your site

---

### **📧 Option 2: Enhanced Email Integration (CURRENT - 0 setup)**

**✅ Already implemented in the updated ContactSection!**

#### **Features:**
- **Pre-filled Professional Email** with all form data
- **WhatsApp Integration** with formatted message
- **Direct Phone Calls** with click-to-call
- **Fallback Email Links** for direct contact

#### **Benefits:**
- ✅ **Works Immediately** - No additional setup required
- ✅ **Professional Formatting** - Organized, branded emails
- ✅ **Multiple Contact Options** - Email, WhatsApp, Phone
- ✅ **Mobile Optimized** - Works perfectly on all devices
- ✅ **No Technical Issues** - No CORS, server, or API problems

---

### **🔧 Option 3: Proper Google Apps Script (ADVANCED - 20 minutes)**

#### **Step 1: Create New Google Apps Script**
1. Go to https://script.google.com
2. Click **"New Project"**
3. Delete default code and paste this:

```javascript
// Enhanced Google Apps Script for Narra Cliffs Form
function doPost(e) {
  try {
    console.log('📝 Received form submission');
    
    // Get or create the spreadsheet
    let sheet;
    try {
      // Replace with your actual Google Sheets ID from the URL
      const SHEET_ID = 'YOUR_SHEET_ID_HERE'; // Extract from your sheet URL
      sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    } catch (err) {
      // If sheet doesn't exist, create a new one
      const newSheet = SpreadsheetApp.create('Narra Cliffs Inquiries');
      sheet = newSheet.getActiveSheet();
      console.log('📊 Created new sheet:', newSheet.getUrl());
    }
    
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
        'IP Address', 'User Agent', 'Status'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Style headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold')
               .setBackground('#4A573B')
               .setFontColor('white')
               .setBorder(true, true, true, true, true, true);
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
      'New'
    ];
    
    // Add data to sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, sheet.getLastColumn());
    
    // Add data validation and formatting
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setNumberFormat('dd/mm/yyyy hh:mm:ss');
    
    // Send success response
    const response = {
      success: true,
      message: 'Inquiry submitted successfully',
      timestamp: timestamp.toISOString(),
      rowNumber: lastRow
    };
    
    console.log('✅ Success:', response);
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept')
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
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  }
}

// Handle CORS preflight requests
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept')
    .setHeader('Access-Control-Max-Age', '86400');
}

// Test function (optional)
function testFunction() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com', 
        phone: '+63 917 123 4567',
        country: 'Philippines',
        consent: true
      })
    }
  };
  
  const result = doPost(testData);
  console.log('Test result:', result.getContent());
}
```

#### **Step 2: Deploy the Script**
1. Click **"Deploy"** → **"New deployment"**
2. **Type**: Web app
3. **Execute as**: Me (your email)
4. **Who has access**: Anyone
5. **Click "Deploy"**
6. **Copy the Web app URL** (ends with `/exec`)

#### **Step 3: Update ContactSection**
Replace this line in `/components/sections/ContactSection.tsx`:
```typescript
const GOOGLE_SCRIPT_URL = 'YOUR_NEW_WEB_APP_URL_HERE';
```

#### **Step 4: Test the Integration**
1. Fill out your contact form
2. Check browser console for logs
3. Verify data appears in Google Sheets

---

## 📊 **Getting Your Google Sheets ID**

From your sheet URL:
```
https://docs.google.com/spreadsheets/d/1234567890abcdef/edit#gid=0
```

The **Sheet ID** is: `1234567890abcdef` (the part between `/d/` and `/edit`)

---

## 🎯 **Recommended Approach**

### **For Immediate Launch: Option 2 (Enhanced Email)**
- ✅ **Already implemented and working**
- ✅ **Professional email formatting**  
- ✅ **Multiple contact methods**
- ✅ **No setup required**

### **For Advanced Tracking: Option 3 (Apps Script)**
- 📊 **Automatic spreadsheet population**
- 📈 **Easy data analysis and reporting**  
- 🔄 **Can integrate with other tools later**

### **For Simplicity: Option 1 (Google Forms)**
- 🚀 **5-minute setup**
- 📱 **Mobile optimized**
- 🔗 **Direct Google integration**

---

## 🆘 **Quick Fix for Immediate Use**

**The contact form is already working with enhanced email integration!** 

Users can:
- ✅ **Send professional emails** with all their details
- ✅ **Contact via WhatsApp** with formatted messages  
- ✅ **Call directly** from the form
- ✅ **Email directly** to your sales address

**No additional setup required** - your form is ready to capture leads right now! 🎉

---

## 📞 **Support**

Need help with any of these options? The current email-based solution is robust and professional - perfect for launching immediately while you decide on the best long-term approach.