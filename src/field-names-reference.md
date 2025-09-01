# 📋 **Narra Cliffs Contact Form - Exact Field Names Reference**

## 🎯 **Primary Form Fields (User Input)**

| **Field Name** | **Data Type** | **Required** | **Description** | **Example Value** |
|----------------|---------------|--------------|-----------------|-------------------|
| `name` | `string` | ✅ **Yes** | Full name of the inquirer | `"Juan Dela Cruz"` |
| `email` | `string` | ✅ **Yes** | Email address | `"juan@example.com"` |
| `phone` | `string` | ✅ **Yes** | Phone number | `"+63 917 123 4567"` |
| `country` | `string` | ❌ No | Country selection | `"Philippines"` |
| `province` | `string` | ❌ No | Province/state selection | `"Metro Manila"` |
| `city` | `string` | ❌ No | City selection | `"Makati"` |
| `lotInterest` | `string` | ❌ No | Type of lot interest | `"cliffside-view"` |
| `consent` | `boolean` | ✅ **Yes** | Privacy policy agreement | `true` |

## 🔧 **System-Generated Fields (Auto-Added)**

| **Field Name** | **Data Type** | **Description** | **Example Value** |
|----------------|---------------|-----------------|-------------------|
| `ipAddress` | `string` | User's IP address (from API) | `"203.177.71.123"` |
| `userAgent` | `string` | Browser information | `"Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."` |
| `timestamp` | `string` | ISO timestamp of submission | `"2025-01-21T10:30:45.123Z"` |
| `website` | `string` | Origin website URL | `"https://narracliffs.com"` |

## 📝 **Complete JSON Payload Example**

```json
{
  // USER INPUT FIELDS
  "name": "Juan Dela Cruz",
  "email": "juan.delacruz@gmail.com", 
  "phone": "+63 917 123 4567",
  "country": "Philippines",
  "province": "Rizal",
  "city": "Antipolo",
  "lotInterest": "cliffside-view",
  "consent": true,
  
  // SYSTEM GENERATED FIELDS
  "ipAddress": "203.177.71.123",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "timestamp": "2025-01-21T10:30:45.123Z",
  "website": "https://narracliffs.com"
}
```

## 🎨 **Lot Interest Options**

The `lotInterest` field can have these specific values:

| **Value** | **Display Text** |
|-----------|------------------|
| `"cliffside-view"` | "Cliffside View" |
| `"fairway-view"` | "Fairway View" |
| `"lake-view"` | "Lake View" |
| `""` (empty) | User didn't select |

## 🇵🇭 **Location Field Details**

### **Country Field:**
- **Fixed Value**: `"Philippines"` (only option)

### **Province Field:**
- **Data Source**: `philippinesProvinces` array from `/components/constants/location-data.ts`
- **Sample Values**: `"Metro Manila"`, `"Rizal"`, `"Cavite"`, etc.

### **City Field:**
- **Data Source**: `philippinesCities` array from `/components/constants/location-data.ts`
- **Sample Values**: `"Makati"`, `"Antipolo"`, `"Tagaytay"`, etc.

## ⚠️ **Important Validation Rules**

### **Required Field Validation:**
```javascript
// These fields MUST have values:
- name: minimum 2 characters, trimmed
- email: valid email format
- phone: valid phone format (allows +, numbers, spaces, dashes, parentheses)
- consent: must be true
```

### **Optional Field Behavior:**
```javascript
// These fields can be empty strings:
- country: defaults to "Philippines"
- province: can be ""
- city: can be ""  
- lotInterest: can be ""
```

## 🐛 **For Your GoogleScriptDebugger Component**

### **Sample Test Data:**
```javascript
const testSubmissionData = {
  // Required fields
  name: "Test User",
  email: "test@example.com",
  phone: "+63 917 123 4567", 
  consent: true,
  
  // Optional fields
  country: "Philippines",
  province: "Rizal",
  city: "Antipolo", 
  lotInterest: "cliffside-view",
  
  // System fields
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/5.0 Test Browser",
  timestamp: "2025-01-21T10:30:45.123Z",
  website: "https://localhost:3000"
};
```

### **Field Type Checking:**
```javascript
// Validation helper for your debugger
const validateFieldTypes = (data) => {
  const errors = [];
  
  // String fields
  const stringFields = ['name', 'email', 'phone', 'country', 'province', 'city', 'lotInterest', 'ipAddress', 'userAgent', 'timestamp', 'website'];
  stringFields.forEach(field => {
    if (data[field] !== undefined && typeof data[field] !== 'string') {
      errors.push(`${field} must be a string, got ${typeof data[field]}`);
    }
  });
  
  // Boolean field
  if (data.consent !== undefined && typeof data.consent !== 'boolean') {
    errors.push(`consent must be a boolean, got ${typeof data.consent}`);
  }
  
  return errors;
};
```

## 📊 **Google Sheets Column Headers**

For your Google Apps Script, use these column headers in order:

```javascript
const headers = [
  'Timestamp',     // Auto-generated timestamp
  'Name',          // formData.name
  'Email',         // formData.email  
  'Phone',         // formData.phone
  'Country',       // formData.country
  'Province',      // formData.province
  'City',          // formData.city
  'Lot Interest',  // formData.lotInterest
  'Consent',       // formData.consent (Yes/No)
  'IP Address',    // formData.ipAddress
  'User Agent',    // formData.userAgent (truncated to 100 chars)
  'Website'        // formData.website
];
```

## 🔍 **Testing Checklist**

✅ **Required Fields Test:**
- Submit with missing `name` → Should fail
- Submit with invalid `email` → Should fail  
- Submit with missing `phone` → Should fail
- Submit with `consent: false` → Should fail

✅ **Optional Fields Test:**
- Submit with empty `province` → Should succeed
- Submit with empty `city` → Should succeed
- Submit with empty `lotInterest` → Should succeed

✅ **Data Type Test:**  
- All string fields receive strings
- `consent` field receives boolean
- System fields are properly generated

This should give you everything you need to properly configure your GoogleScriptDebugger component! 🎉