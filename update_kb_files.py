#!/usr/bin/env python3
"""
Script to update all knowledge base HTML files with:
1. Remove "Копирайт" heading from footer
2. Wrap content sections in kb-section-block divs for main category pages
"""
import os
import re
from pathlib import Path

def update_kb_file(filepath):
    """Update a single knowledge base file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove "Копирайт" heading from footer
    content = re.sub(r'<h3>\s*Копирайт\s*</h3>\s*', '', content)
    
    # Find the main content area and wrap sections in kb-section-block divs
    # Only do this for main category pages (not subdirectory articles)
    rel_path = os.path.relpath(filepath, '/workspace/kb')
    
    # Determine if this is a main category file (not in subdirectories)
    # Main category files are directly in /kb/ directory like index.html, docker.html, etc.
    path_parts = rel_path.split('/')
    is_main_category = len(path_parts) == 1
    
    if is_main_category:
        # Wrap content sections in kb-section-block divs for main category pages
        main_pattern = r'(<main>)(.*?)(</main>)'
        
        def wrap_sections(match):
            main_start = match.group(1)
            main_content = match.group(2)
            main_end = match.group(3)
            
            # Find all sections and wrap each in kb-section-block
            # Split content by section tags
            sections = re.split(r'(<section[^>]*>.*?</section>)', main_content, flags=re.DOTALL)
            
            new_content = ""
            for part in sections:
                if part.strip() and '<section' in part and '</section>' in part:
                    # This is a complete section, wrap it
                    new_content += f'<div class="kb-section-block">{part}</div>'
                elif part.strip():
                    # This is content that's not in a section, add as is
                    new_content += part
            
            return main_start + new_content + main_end
        
        # Apply the wrapping function to the main content if sections exist
        if '<section' in content:
            content = re.sub(main_pattern, wrap_sections, content, flags=re.DOTALL)
    
    # Write the updated content back to the file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated: {filepath}")

def main():
    kb_dir = Path('/workspace/kb')
    
    # Find all HTML files in the kb directory
    html_files = list(kb_dir.rglob('*.html'))
    
    for html_file in html_files:
        update_kb_file(str(html_file))

if __name__ == "__main__":
    main()