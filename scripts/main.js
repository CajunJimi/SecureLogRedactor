// Configuration
const CONFIG = {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    CHUNK_SIZE: 50000, // 50KB chunks
    ALLOWED_EXTENSIONS: ['.log', '.txt']
};

// Cache for compiled regex patterns
const REGEX_PATTERNS = {
    ipv4: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
    ipv6: /\b(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}\b/gi,
    domain: /\b(?:[a-z0-9]+\.)+[a-z]{2,}\b/gi,
    path: /(?:[A-Za-z]:\\|\/)[^\s]*/g,
    sid: /S-\d-\d+-(\d+-){1,14}\d+/g,
    account: /(?:user|account):\s*\S+/gi,
    guid: /\b[A-F0-9]{8}(?:-[A-F0-9]{4}){3}-[A-F0-9]{12}\b/gi,
    kerberos: /\b(?:krbtgt|TGT|TGS):[^\s]*/gi,
    mac: /\b([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})\b/g,
    cloudCreds: /\b((?:AKIA|ASIA)[0-9A-Z]{16}|(?:aws)?_?(?:secret|access)_?key_?id)\b/gi,
    jwt: /eyJ[A-Za-z0-9-_]+\.eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/g,
    base64: /\b[A-Za-z0-9+/]{32,}={0,2}\b/g,
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
};

// Dummy data generators
const dummyData = {
    generateIP: () => {
        return `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    },
    generateIPv6: () => {
        return Array.from({length: 8}, () => 
            Math.floor(Math.random() * 65536).toString(16).padStart(4, '0')
        ).join(':');
    },
    generateDomain: () => {
        const domains = ['example.com', 'test.local', 'internal.net', 'dev.org'];
        const prefixes = ['srv', 'host', 'web', 'db', 'app'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const domain = domains[Math.floor(Math.random() * domains.length)];
        return `${prefix}-${Math.floor(Math.random() * 999)}.${domain}`;
    },
    // ... (rest of the dummy data generators)
};

// State management
const undoStack = [];
const redoStack = [];
let currentText = '';

// Load saved preferences
function loadPreferences() {
    try {
        const savedPrefs = localStorage.getItem('redactionPreferences');
        if (savedPrefs) {
            const prefs = JSON.parse(savedPrefs);
            Object.entries(prefs).forEach(([id, checked]) => {
                const element = document.getElementById(id);
                if (element) {
                    element.checked = checked;
                }
            });
        }
    } catch (error) {
        console.error('Error loading preferences:', error);
    }
}

// Save preferences
function savePreferences() {
    const prefs = {};
    document.querySelectorAll('.redaction-type input[type="checkbox"]').forEach(checkbox => {
        prefs[checkbox.id] = checkbox.checked;
    });
    localStorage.setItem('redactionPreferences', JSON.stringify(prefs));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadPreferences();
    document.querySelectorAll('.redaction-type input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', savePreferences);
    });
});

// File handling
function validateFile(file) {
    if (!file) {
        throw new Error('Please select a file');
    }

    if (file.size > CONFIG.MAX_FILE_SIZE) {
        throw new Error('File size exceeds 10MB limit');
    }

    const extension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    if (!CONFIG.ALLOWED_EXTENSIONS.includes(extension)) {
        throw new Error('Invalid file type. Please upload .log or .txt files only');
    }
}

// Processing functions
async function processInChunks(text, chunkSize = CONFIG.CHUNK_SIZE) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
    }

    const progressBar = document.getElementById('progressBar');
    const progressBarFill = document.getElementById('progressBarFill');
    progressBar.style.display = 'block';

    let processedText = '';
    for (let i = 0; i < chunks.length; i++) {
        processedText += await processChunk(chunks[i]);
        const progress = ((i + 1) / chunks.length) * 100;
        progressBarFill.style.width = `${progress}%`;
        await new Promise(resolve => setTimeout(resolve, 0));
    }

    progressBar.style.display = 'none';
    return processedText;
}

// Event listeners
document.getElementById('logFile').addEventListener('change', handleFileUpload);

// Export functions
function exportResults(format) {
    const detectedItems = {};
    let content;

    if (format === 'json') {
        content = JSON.stringify(detectedItems, null, 2);
        downloadFile(content, 'detected_items.json', 'application/json');
    } else if (format === 'csv') {
        const csv = Object.entries(detectedItems)
            .map(([type, items]) => `${type},${items.join(',')}`)
            .join('\n');
        downloadFile(csv, 'detected_items.csv', 'text/csv');
    }
}

// Utility functions
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function processText() {
    const inputText = document.getElementById('input-text').value;
    if (!inputText) {
        return;
    }

    undoStack.push(currentText);
    redoStack.length = 0;
    currentText = inputText;

    try {
        const processedText = processInChunks(inputText);
        document.getElementById('input-text').value = processedText;
        updateUndoRedoButtons();
    } catch (error) {
        showError(error);
    }
}
