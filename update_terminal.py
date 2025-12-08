#!/usr/bin/env python3

import os
import re

def update_file_content(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Define the pattern to match the footer part
    # This pattern matches from </main> to </html> with the terminal footer
    old_footer_pattern = r'(</main>\s*\n\s*)<!-- Footer with terminal-style animation -->\s*\n\s*<footer>.*?<div class="terminal-content">.*?</div>\s*<span class="cursor">\|</span>\s*</div>\s*</footer>\s*</div>\s*<script src="([^"]*)"></script>\s*</body>\s*</html>'
    
    # Find the path to the script file to preserve it
    match = re.search(r'<script src="([^"]*)"></script>', content, re.DOTALL)
    if not match:
        print(f"No script tag found in: {file_path}")
        return False
        
    script_path = match.group(1)
    
    # Create the new content with the correct script path
    new_content = f'''        </main>

        <!-- Terminal component -->
        <section class="kb-content">
            <div class="terminal-component">
                <span class="prompt">devops@mikhail:~$ </span>
                <div class="terminal-commands">
                    <div class="command">kubectl apply -f deployment.yaml</div>
                    <div class="command">docker build -t app:latest .</div>
                    <div class="command">ansible-playbook deploy.yml</div>
                    <div class="command">terraform apply</div>
                    <div class="command">git push origin main</div>
                    <div class="command">kubectl rollout restart deployment/app</div>
                </div>
            </div>
        </section>
    </div>

    <script src="{script_path}"></script>
</body>
</html>'''
    
    # Replace the old footer with the new terminal component
    updated_content = re.sub(
        r'</main>\s*\n\s*<!-- Footer with terminal-style animation -->.*?</footer>\s*</div>\s*<script src="[^"]*"></script>\s*</body>\s*</html>',
        new_content,
        content,
        flags=re.DOTALL
    )
    
    # Check if the content was actually updated
    if updated_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        print(f"Updated: {file_path}")
        return True
    else:
        print(f"No match found in: {file_path}")
        return False

# Find all HTML files in the kb directory (excluding index.html and terminal.html)
kb_dir = "/workspace/kb"
html_files = []
for root, dirs, files in os.walk(kb_dir):
    for file in files:
        if file.endswith(".html") and file not in ["index.html", "terminal.html"]:
            html_files.append(os.path.join(root, file))

# Process each file
updated_count = 0
for file_path in html_files:
    if update_file_content(file_path):
        updated_count += 1

print(f"Update completed! Updated {updated_count} files.")