#standard workflow in git bash
# nieuwe feature-branch
git checkout -b feature/nieuwe-instellingen

# vrij committen, zoveel als je wilt, geen tags, geen builds
git add .
git commit -m "werk aan instellingen-paneel"
git push origin feature/nieuwe-instellingen

# ... meer commits, testen, etc ...

# klaar? merge naar main
git checkout main
git pull
git merge feature/nieuwe-instellingen
git push

# nu pas, bewust, een release maken:
bash bump.sh