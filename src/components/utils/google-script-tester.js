// Google Apps Script Connection Tester
// Use this in browser console to test your Google Apps Script

export const testGoogleScript = async (scriptUrl) => {
  console.log('🔍 Testing Google Apps Script Connection...');
  console.log('📍 Script URL:', scriptUrl);

  // Test 1: Basic connectivity
  try {
    console.log('\n1️⃣ Testing basic connectivity...');
    const response = await fetch(scriptUrl, {
      method: 'GET',
      mode: 'cors'
    });
    console.log('✅ GET request successful:', response.status);
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));
  } catch (error) {
    console.error('❌ GET request failed:', error);
  }

  // Test 2: OPTIONS request (CORS preflight)
  try {
    console.log('\n2️⃣ Testing CORS preflight (OPTIONS)...');
    const optionsResponse = await fetch(scriptUrl, {
      method: 'OPTIONS',
      mode: 'cors'
    });
    console.log('✅ OPTIONS request successful:', optionsResponse.status);
    console.log('📊 CORS headers:', {
      'Access-Control-Allow-Origin': optionsResponse.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': optionsResponse.headers.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': optionsResponse.headers.get('Access-Control-Allow-Headers')
    });
  } catch (error) {
    console.error('❌ OPTIONS request failed:', error);
  }

  // Test 3: POST request with test data
  try {
    console.log('\n3️⃣ Testing POST request with sample data...');
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+639123456789',
      country: 'Philippines',
      province: 'Metro Manila',
      city: 'Manila',
      lotInterest: 'lake-view',
      consent: true,
      ipAddress: 'Test IP',
      userAgent: 'Test Browser',
      timestamp: new Date().toISOString()
    };

    const postResponse = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(testData),
      mode: 'cors'
    });

    console.log('✅ POST request status:', postResponse.status);
    console.log('📊 Response headers:', Object.fromEntries(postResponse.headers.entries()));

    const responseText = await postResponse.text();
    console.log('📄 Raw response:', responseText);

    try {
      const responseJson = JSON.parse(responseText);
      console.log('🎯 Parsed JSON response:', responseJson);
    } catch {
      console.log('⚠️ Response is not valid JSON');
    }

  } catch (error) {
    console.error('❌ POST request failed:', error);
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.log('\n🔧 Troubleshooting: Failed to fetch error');
      console.log('This usually indicates:');
      console.log('- CORS is not properly configured');
      console.log('- Google Apps Script is not deployed as Web App');
      console.log('- Script permissions are not set to "Anyone"');
      console.log('- Network connectivity issues');
    }
  }

  console.log('\n🏁 Test completed!');
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.testGoogleScript = testGoogleScript;
}

export const diagnoseScriptIssues = () => {
  console.log('🩺 Google Apps Script Diagnostic Checklist:');
  console.log('\n✅ Verify your script deployment:');
  console.log('1. Go to script.google.com');
  console.log('2. Open your script project');
  console.log('3. Click "Deploy" → "Manage deployments"');
  console.log('4. Check that "Type" is set to "Web app"');
  console.log('5. Check that "Execute as" is "Me"');
  console.log('6. Check that "Who has access" is "Anyone"');
  
  console.log('\n✅ Check your script code:');
  console.log('1. Ensure you have doPost() function');
  console.log('2. Ensure you have doOptions() function for CORS');
  console.log('3. Verify CORS headers are set correctly');
  
  console.log('\n✅ Test the URL:');
  console.log('1. Copy your Web App URL');
  console.log('2. Run: testGoogleScript("YOUR_URL_HERE")');
  
  console.log('\n✅ Common solutions:');
  console.log('- Redeploy the script as a new version');
  console.log('- Clear browser cache and cookies');
  console.log('- Try in incognito/private browsing mode');
  console.log('- Check Google Cloud Console for any restrictions');
};

// Make diagnostic function available globally
if (typeof window !== 'undefined') {
  window.diagnoseScriptIssues = diagnoseScriptIssues;
}