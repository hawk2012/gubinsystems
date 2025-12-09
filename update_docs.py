#!/usr/bin/env python3

import os
import re
from pathlib import Path

def process_file(filepath):
    """Process a single documentation file to add terminal header"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract topic name from filename (without extension)
    filename = Path(filepath).stem  # Gets filename without extension
    topic_name = filename.replace('-', '_')  # Replace hyphens with underscores
    
    # Create the terminal header HTML
    terminal_header = f'''                <div class="terminal-content">
                    <div class="terminal-text">
                        <div class="terminal-p">
                            <span class="terminal-prompt">devops@mikhail:~$ </span>
                            <span class="terminal-command">man {topic_name}</span>
                        </div>
                    </div>
                </div>'''
    
    # Insert the terminal header in the kb-hero section, right after the opening tag and before the <h1>
    # First, remove any existing terminal header to avoid duplicates
    # Use a more targeted approach - only remove terminal-content divs that appear right after kb-hero
    pattern_remove = r'(<section class="kb-hero">)\s*<div class="terminal-content">.*?</div>\s*\n?'
    content = re.sub(pattern_remove, r'\1', content, flags=re.DOTALL)
    
    # Now add the new terminal header
    pattern_add = r'(<section class="kb-hero">)'
    replacement = f'\\1\n{terminal_header}'
    content = re.sub(pattern_add, replacement, content, count=1)
    
    # Write the updated content back to the file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Processed: {filepath} with topic: {topic_name}")

def main():
    # Find all documentation files in subdirectories of kb/
    kb_dir = Path('/workspace/kb')
    doc_files = []
    
    # Look for HTML files in subdirectories (like kb/docker/*.html, kb/kubernetes/*.html, etc.)
    for subfolder in kb_dir.iterdir():
        if subfolder.is_dir():
            doc_files.extend(list(subfolder.glob('*.html')))
    
    for doc_file in doc_files:
        if doc_file.name != 'index.html' and doc_file.name != 'terminal.html':
            process_file(str(doc_file))

if __name__ == '__main__':
    main()