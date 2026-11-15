#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const frontendPath = path.resolve(__dirname, '..', 'nexus-avatar');

if (args[0] === 'f' && args[1] === 'start') {
    if (!fs.existsSync(frontendPath)) {
        console.error('Fout: De map bestaat niet:', frontendPath);
        process.exit(1);
    }

    console.log('Frontend is starting....', frontendPath);

    // Gebruik 'npm.cmd' op Windows en 'npm' op Mac/Linux
    const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

    // Pas 'dev' hieronder aan naar 'start' als jouw frontend 'npm start' gebruikt!
    const child = spawn(npmCmd, ['run', 'tauri', 'dev'], {
        cwd: frontendPath,
        stdio: 'inherit',
        shell: true
    });

    child.on('error', (err) => {
        console.error('Error with starting of the frontend:', err);
    });

    child.on('close', (code) => {
        if (code !== 0) {
            console.log(`Het proces is gestopt met foutcode: ${code}`);
        }
    });
} else {
    console.log('Unknown command. Use command: `vra f start`');
}
