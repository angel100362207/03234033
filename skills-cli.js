// skills-cli.js

const fs = require('fs');
const clipboardy = require('clipboardy');
const { exec } = require('child_process');

class SkillManager {
    constructor() {
        this.skillsRegistry = [];
    }
    
    async downloadSkills(repoUrl) {
        const command = `git clone ${repoUrl} skills`; // Assuming skills will be cloned to a 'skills' directory
        await this.executeCommand(command);
    }
    
    manageSkills(action, skill) {
        switch(action) {
            case 'add':
                this.skillsRegistry.push(skill);
                break;
            case 'remove':
                this.skillsRegistry = this.skillsRegistry.filter(s => s !== skill);
                break;
            case 'list':
                console.log(this.skillsRegistry);
                break;
            default:
                console.log('Invalid action.');
                break;
        }
    }
    
    copySkillToClipboard(skill) {
        clipboardy.writeSync(skill);
        console.log(`Skill ${skill} copied to clipboard`);
    }
    
    async executeSkillCommand(skill) {
        const command = `node skills/${skill}.js`; // Assume each skill is a JS file in the 'skills' folder
        await this.executeCommand(command);
    }
    
    executeCommand(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    reject(`Error: ${stderr}`);
                    return;
                }
                resolve(stdout);
            });
        });
    }
}

module.exports = SkillManager;
