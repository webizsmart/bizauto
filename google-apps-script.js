/**
 * Google Apps Script for handling contact form submissions.
 * 
 * Instructions:
 * 1. Create a Google Sheet.
 * 2. In the first row, add the headers: Timestamp, Name, Email, Company, Service, Message
 * 3. Go to "Extensions" > "Apps Script".
 * 4. Paste this code into the editor (replace any existing code in Code.gs).
 * 5. Click "Save".
 * 6. Click "Deploy" > "New deployment".
 * 7. Click the gear icon (Select type) and choose "Web app".
 * 8. Set the configuration:
 *    - Description: BizAuto Contact Form API
 *    - Execute as: Me (your-email@gmail.com)
 *    - Who has access: Anyone (This is crucial, otherwise the fetch will fail)
 * 9. Click "Deploy". You might need to click "Authorize access" and grant permissions.
 * 10. Copy the "Web app URL" (it ends with /exec).
 * 11. Open script.js in your project and replace 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' with this URL.
 */

function doPost(e) {
  try {
    // Open the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse parameters from the request
    var parameter = e.parameter;
    
    var timestamp = new Date();
    var name = parameter.name || '';
    var email = parameter.email || '';
    var company = parameter.company || '';
    var service = parameter.service || '';
    var message = parameter.message || '';
    
    // Append the data as a new row
    sheet.appendRow([timestamp, name, email, company, service, message]);
    
    // Return a success response
    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    // Return an error response
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
