# SecureLogRedactor

A secure, browser-based tool for redacting sensitive information from log files. Built with modern web technologies and focused on security, performance, and user experience.

## Features

- Redact multiple types of sensitive information:
  - IP Addresses (IPv4 & IPv6)
  - Domain Names & Hostnames
  - File Paths & Share Names
  - Security IDs (SIDs) & Account Names
  - GUIDs & Unique Identifiers
  - Kerberos Tickets
  - MAC Addresses
  - Cloud Credentials
  - JWT Tokens
  - Base64 Encoded Secrets
  - Email Addresses

- Advanced Features:
  - Preview Mode (highlight instead of redact)
  - Dummy Data Generation
  - Undo/Redo Support
  - File Upload Support
  - Export Results (JSON/CSV)
  - User Preferences Saving
  - Large File Processing

## Project Structure

```
SecureLogRedactor/
├── src/              # Source files
├── public/           # Static assets
├── styles/           # CSS styles
├── scripts/          # JavaScript files
├── docs/            # Documentation
└── logs/            # Log files
    ├── change_logs/
    ├── feature_logs/
    └── troubleshooting_logs/
```

## Getting Started

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Start redacting sensitive information from your logs

## Browser Support

Supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security

- All processing is done client-side
- No data is sent to any server
- Supports offline usage
- Regular security updates

## Deployment

This project is deployed using GitHub Pages. For detailed deployment instructions, please see [DEPLOYMENT.md](docs/DEPLOYMENT.md).

Quick deployment steps:
1. Create a GitHub repository
2. Push the code to the repository
3. Enable GitHub Pages in repository settings
4. Access your site at `https://YOUR_USERNAME.github.io/SecureLogRedactor`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
