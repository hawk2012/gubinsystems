#!/usr/bin/env python3
"""
Script to fix nested kb-section-block divs in knowledge base files
"""
import re
from pathlib import Path

def fix_nested_blocks(filepath):
    """Fix nested kb-section-block divs in a file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove nested kb-section-block divs - match <div class="kb-section-block"> inside another <div class="kb-section-block">
    # This regex finds nested blocks and removes the inner wrapper while keeping the content
    fixed_content = re.sub(
        r'<div class="kb-section-block">\s*<div class="kb-section-block">(.*?)</div>\s*</div>',
        r'<div class="kb-section-block">\1</div>',
        content,
        flags=re.DOTALL
    )
    
    # There might be multiple levels of nesting, so run it again to catch remaining cases
    while fixed_content != content:
        content = fixed_content
        fixed_content = re.sub(
            r'<div class="kb-section-block">\s*<div class="kb-section-block">(.*?)</div>\s*</div>',
            r'<div class="kb-section-block">\1</div>',
            content,
            flags=re.DOTALL
        )
    
    # Write the fixed content back to the file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    
    print(f"Fixed nested blocks: {filepath}")

def main():
    kb_dir = Path('/workspace/kb')
    
    # Find all HTML files in the kb directory
    html_files = list(kb_dir.rglob('*.html'))
    
    for html_file in html_files:
        # Only fix main category files (not subdirectory articles)
        rel_path = html_file.relative_to('/workspace/kb')
        path_parts = str(rel_path).split('/')
        is_main_category = len(path_parts) == 1
        
        if is_main_category:
            fix_nested_blocks(str(html_file))

if __name__ == "__main__":
    main()