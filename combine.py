import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()
with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()
with open('js/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

html = html.replace('<link rel="stylesheet" href="css/style.css">', f'<style>\n{css}\n</style>')
html = html.replace('<script src="js/script.js" defer></script>', f'<script>\n{js}\n</script>')

with open('connected_portfolio.html', 'w', encoding='utf-8') as f:
    f.write(html)
