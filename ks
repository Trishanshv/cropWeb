warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/.gitignore b/.gitignore[m
[1mindex 5ef6a52..3786fcf 100644[m
[1m--- a/.gitignore[m
[1m+++ b/.gitignore[m
[36m@@ -1,41 +1,66 @@[m
[31m-# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.[m
[31m-[m
[31m-# dependencies[m
[31m-/node_modules[m
[32m+[m[32m# Dependency directories[m
[32m+[m[32mnode_modules/[m
[32m+[m[32m/jspm_packages/[m
 /.pnp[m
 .pnp.*[m
[31m-.yarn/*[m
[31m-!.yarn/patches[m
[31m-!.yarn/plugins[m
[31m-!.yarn/releases[m
[31m-!.yarn/versions[m
 [m
[31m-# testing[m
[32m+[m[32m# Testing[m
 /coverage[m
[32m+[m[32m/.nyc_output[m
 [m
[31m-# next.js[m
[32m+[m[32m# Next.js build and production outputs[m
 /.next/[m
 /out/[m
[31m-[m
[31m-# production[m
 /build[m
[32m+[m[32m/dist[m
 [m
[31m-# misc[m
[31m-.DS_Store[m
[31m-*.pem[m
[31m-[m
[31m-# debug[m
[32m+[m[32m# Debug logs[m
 npm-debug.log*[m
 yarn-debug.log*[m
 yarn-error.log*[m
[31m-.pnpm-debug.log*[m
[31m-[m
[31m-# env files (can opt-in for committing if needed)[m
[31m-.env*[m
[32m+[m[32mpnpm-debug.log*[m
[32m+[m[32mlerna-debug.log*[m
 [m
[31m-# vercel[m
[31m-.vercel[m
[32m+[m[32m# Local environment variables and secrets (NEVER commit these)[m
[32m+[m[32m.env[m
[32m+[m[32m.env.local[m
[32m+[m[32m.env.development.local[m
[32m+[m[32m.env.test.local[m
[32m+[m[32m.env.production.local[m
[32m+[m[32m.env*.local[m
[32m+[m[32m*.pem[m
[32m+[m[32m*.key[m
 [m
[31m-# typescript[m
[32m+[m[32m# TypeScript build info[m
 *.tsbuildinfo[m
 next-env.d.ts[m
[32m+[m
[32m+[m[32m# Vercel deployments[m
[32m+[m[32m.vercel[m
[32m+[m
[32m+[m[32m# Operating System files[m
[32m+[m[32m.DS_Store[m
[32m+[m[32m.DS_Store?[m
[32m+[m[32m._*[m
[32m+[m[32m.Spotlight-V100[m
[32m+[m[32m.Trashes[m
[32m+[m[32mehthumbs.db[m
[32m+[m[32mThumbs.db[m
[32m+[m
[32m+[m[32m# IDEs and Editors[m
[32m+[m[32m.vscode/[m
[32m+[m[32m!.vscode/extensions.json[m
[32m+[m[32m.idea/[m
[32m+[m[32m*.suo[m
[32m+[m[32m*.ntvs*[m
[32m+[m[32m*.njsproj[m
[32m+[m[32m*.sln[m
[32m+[m[32m*.sw?[m
[32m+[m[32m.project[m
[32m+[m[32m.classpath[m
[32m+[m[32m.settings/[m
[32m+[m[32m*.sublime-project[m
[32m+[m[32m*.sublime-workspace[m
[32m+[m
[32m+[m[32m# Custom local screenshot references[m
[32m+[m[32mNew folder/[m
