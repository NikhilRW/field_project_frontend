
For linking backend with the current repo

- git remote add backend https://github.com/NikhilRW/field_project_backend.git

- git subtree add --prefix=backend backend main --squash

for pushing to attenex_backend from here
- git subtree push --prefix=backend backend main

for pulling updates from attenex_backend
- git subtree pull --prefix=backend backend main --squash