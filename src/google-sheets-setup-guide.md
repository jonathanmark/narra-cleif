# Google Sheets Integration Setup Guide

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Narra Cliffs - Contact Form Submissions"
4. The script will automatically create headers when the first submission is received

## Step 2: Set Up Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy and paste the code from `/google-apps-script.js` into the editor
4. Save the project (Ctrl+S or Cmd+S)
5. Name your project "Narra Cliffs Form Handler"

## Step 3: Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Type" and select **Web app**
3. Configure the deployment:
   - **Description**: "Narra Cliffs Contact Form Handler"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Grant permissions** when prompted:
   - Review permissions
   - Click "Go to [Your Project Name] (unsafe)" if warned
   - Click "Allow"
6. **Copy the Web App URL** - this is your `GOOGLE_SCRIPT_URL`

## Step 4: Update Your React Component

1. In `/components/sections/ContactSection.tsx`, find line 29:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```

2. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your actual Web App URL from Step 3

3. Example:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```

## Step 5: Test the Integration

1. Fill out your contact form on the website
2. Submit the form
3. Check your Google Sheet - you should see a new row with the submission data
4. Verify that all fields are being captured correctly

## Data Captured

The following information will be saved to your Google Sheet:
- **Timestamp**: When the form was submitted
- **Full Name**: User's full name
- **Email**: User's email address
- **Phone**: User's phone number
- **Country**: Selected country (defaults to Philippines)
- **Province**: Selected province
- **City**: Selected city
- **Lot of Interest**: Selected view type preference
- **Consent Given**: Whether privacy consent was given (Yes/No)
- **IP Address**: User's IP address (for analytics)
- **User Agent**: Browser/device information

## Security Features

- ✅ **CORS enabled** for cross-origin requests
- ✅ **Data validation** before saving
- ✅ **Error handling** with detailed responses
- ✅ **Automatic formatting** with headers and styling
- ✅ **No API keys required** in frontend code

## Troubleshooting

### Common Issues:

1. **"Script function not found"**
   - Make sure you've deployed the script as a Web App
   - Ensure the function name is `doPost` (case-sensitive)

2. **CORS errors**
   - The script includes CORS headers, but ensure you're using the correct Web App URL
   - Make sure the deployment is set to "Anyone" access

3. **Permission denied**
   - Re-run the deployment process
   - Make sure you granted all permissions during setup

4. **Data not appearing in sheet**
   - Check the Apps Script execution logs (View → Executions)
   - Ensure the sheet is the active sheet in your Google Sheets document

### Testing the Script Directly:

You can test your Google Apps Script independently:

1. In the Apps Script editor, go to **View** → **Executions**
2. You should see logs of form submissions
3. Any errors will be displayed here with details

## Optional Enhancements

### Add Email Notifications:
You can modify the Google Apps Script to send email notifications when new submissions arrive:

```javascript
// Add this inside the try block after sheet.appendRow(rowData):
GmailApp.sendEmail(
  'your-email@example.com',
  'New Narra Cliffs Inquiry',
  `New inquiry from ${data.name} (${data.email})`
);
```

### Data Export:
Your Google Sheet data can be easily exported to:
- Excel (.xlsx)
- CSV format
- PDF reports
- Connected to other Google Workspace tools

## Support

If you encounter issues:
1. Check the Apps Script execution logs
2. Verify the Web App URL is correct
3. Test with a simple form submission
4. Ensure all permissions are granted

The integration is now complete! 🎉