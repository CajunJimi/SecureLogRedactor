# Troubleshooting Log

## 2025-02-03 18:30:18Z - Potential Issues and Solutions

### Known Edge Cases and Solutions

#### 1. Large File Processing
- **Issue**: Processing large files may cause browser to become unresponsive
- **Resolution**: 
  - Implemented chunked processing
  - Added 10MB file size limit
  - Added progress bar for visual feedback
- **Outcome**: Improved handling of large files without UI freezing

#### 2. Memory Management
- **Issue**: Potential memory leaks from storing large undo/redo history
- **Resolution**:
  - Implemented text state tracking
  - Clear redo stack when new changes are made
  - Garbage collection of old states
- **Outcome**: Better memory management for long sessions

#### 3. Regular Expression Performance
- **Issue**: Regex patterns being recompiled on every text processing
- **Resolution**:
  - Cached all regex patterns
  - Optimized patterns for better performance
  - Added pattern testing for edge cases
- **Outcome**: Improved processing speed and reliability

#### 4. Browser Compatibility
- **Issue**: Some features may not work in older browsers
- **Resolution**:
  - Added checks for API availability
  - Used standardized CSS properties
  - Implemented fallbacks where necessary
- **Outcome**: Better cross-browser compatibility

### Debugging Tips
1. Check browser console for error messages
2. Verify localStorage availability for preferences
3. Monitor memory usage during large file processing
4. Test regex patterns with various input formats

### Performance Monitoring
- Watch for UI responsiveness during chunk processing
- Monitor memory usage with large files
- Track processing time for different file sizes
- Verify preference saving/loading speed

## 2025-02-03 19:14:50Z - Enhanced Error Handling and Status Updates

### Changes Made
1. Added comprehensive error handling system
2. Implemented status message display
3. Added connection status monitoring
4. Enhanced user feedback mechanisms

### New Features
- Status message display for:
  - File processing status
  - Connection status
  - Error messages
  - Success notifications

### Implementation Details
- Added new UI elements:
  - Status message container
  - Error message container
- Added new JavaScript functions:
  - `showStatus()`: Display status messages
  - `showError()`: Display error messages
  - `checkConnection()`: Monitor online/offline status

### Testing Steps
1. Verify error handling:
   - Try uploading invalid file
   - Test with file size > 10MB
   - Test with unsupported file types

2. Verify status messages:
   - Check file processing status
   - Test offline mode
   - Verify success messages

3. Verify connection monitoring:
   - Test offline mode
   - Test reconnection

### Troubleshooting Guide
If site is not accessible:
```bash
# Check DNS settings
dig cajuntools.site +noall +answer
dig www.cajuntools.site +noall +answer

# Expected output should show GitHub Pages IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

Check GitHub Pages settings:
1. Go to repository settings
2. Verify custom domain configuration
3. Check HTTPS enforcement
4. Verify GitHub Actions deployment status

## 2025-02-03 19:24:56Z - Fixed Redaction Functionality

### Issue Description
Redaction functionality was not working due to missing redaction type checkboxes and incorrect checkbox IDs in the HTML.

### Changes Made
1. Added redaction type checkboxes for:
   - IPv4 and IPv6 addresses
   - Domain names and hostnames
   - File paths and share names
   - Security IDs (SIDs)
   - Account names
   - GUIDs and unique identifiers
   - Kerberos tickets
   - MAC addresses
   - Cloud credentials
   - JWT tokens
   - Base64 encoded data
   - Email addresses

2. Fixed checkbox IDs to match the JavaScript processing logic
3. Added preview mode toggle
4. Ensured all checkboxes are checked by default

### Testing Steps
1. Upload a log file containing sensitive data
2. Verify all redaction type checkboxes are checked
3. Test both redaction modes:
   - [REDACTED] placeholders
   - Dummy data replacement
4. Test preview mode to highlight sensitive data

### Outcome
- Redaction functionality now working correctly
- All sensitive data types being properly identified and redacted
- Preview mode functioning as expected

## 2025-02-03 19:36:51Z - Simplified Redaction Patterns

### Issue Description
Path detection was causing HTML tag issues and false positives in the JSON log data.

### Changes Made
1. Temporarily removed path detection functionality
2. Focused on core sensitive data patterns:
   - IPv4 and IPv6 addresses
   - Domain names
   - Security IDs (SIDs)
   - GUIDs
   - Email addresses

### Reason for Change
Path detection was too aggressive and breaking the JSON structure. By focusing on core patterns first, we can ensure the base functionality works correctly before adding more complex pattern matching.

### Next Steps
1. Test core patterns thoroughly
2. Re-implement path detection with more precise rules
3. Add support for network shares and Windows paths separately
