# SecureLog Redactor Development Notes

## Project Overview
The SecureLog Redactor is a web-based tool for redacting sensitive information from log files. It supports both JSON and plain text logs, with real-time preview and redaction capabilities.

## Current State (2025-02-03)

### Core Features
1. **File Upload**
   - Supports both JSON and plain text log files
   - Handles large files through chunked processing

2. **Redaction Types**
   - IPv4 addresses: `\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b`
   - IPv6 addresses: `\b(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}\b|::1\b`
   - Domain names: `\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:local|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b`
   - Security IDs (SIDs): `\bS-1-[0-9-]+\b`
   - GUIDs: `\{?[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}\}?`
   - Email addresses: `\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b`

3. **Preview Mode**
   - Highlights detected sensitive data
   - Shows data type on hover
   - Uses `<mark>` tags with CSS styling

4. **Redaction Modes**
   - [REDACTED] placeholders
   - Dummy data replacement

### Recent Changes

#### 2025-02-03
1. Fixed JSON handling and preview mode
   - Added proper JSON parsing and structure preservation
   - Improved HTML tag handling in preview mode
   - Fixed overlapping matches handling

2. Simplified redaction patterns
   - Temporarily removed path detection
   - Focused on core patterns that work reliably
   - Improved regex patterns for better accuracy

### Known Issues
1. **Path Detection**
   - Currently disabled due to false positives
   - Needs better handling of:
     - Windows paths
     - Unix paths
     - Network shares
     - Nested paths in JSON

2. **JSON Processing**
   - Deep nested objects might need better handling
   - Some edge cases with escaped characters

### Next Steps

#### High Priority
1. **Path Detection Reimplementation**
   - Create separate patterns for different path types
   - Add context awareness for path detection
   - Implement better validation for path matches

2. **JSON Processing Improvements**
   - Add better handling of nested objects
   - Improve escaped character handling
   - Add validation for JSON structure preservation

3. **Testing**
   - Create test suite for core patterns
   - Add validation for JSON structure
   - Test with various log formats

#### Future Enhancements
1. **Additional Patterns**
   - MAC addresses
   - AWS credentials
   - JWT tokens
   - Base64 encoded data

2. **User Interface**
   - Add pattern testing interface
   - Improve preview mode visualization
   - Add pattern customization options

3. **Performance**
   - Optimize regex patterns
   - Add worker thread for processing
   - Implement better chunking for large files

## Development Environment
- OS: mac
- Browser Support: Modern browsers (Chrome, Firefox, Safari)
- No external dependencies required
- Hosted on GitHub Pages

## Repository Structure
```
SecureLogRedactor/
├── src/
│   ├── index.html       # Main application
│   └── CNAME           # Custom domain config
├── logs/
│   ├── troubleshooting_logs/
│   └── feature_logs/
└── docs/
    └── DEVELOPMENT_NOTES.md
```

## Getting Started
1. Clone the repository
2. Open `src/index.html` in a browser
3. No build process required
4. Changes are deployed automatically via GitHub Pages

## Testing
1. Use sample log files in `test_data/`
2. Test each pattern type individually
3. Verify JSON structure is preserved
4. Check preview mode highlighting

## Contact
For questions or issues, please create a GitHub issue or contact the development team.
