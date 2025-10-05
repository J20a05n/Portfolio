document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Current Year in Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Projects Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-categories').includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Reset skill filtering when changing category
            resetSkillFilter();
        });
    });
    
    // Skill Filtering
    const skillItems = document.querySelectorAll('.skill-item');
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    function highlightProjectsBySkill(skill) {
        // First scroll to the projects section
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            window.scrollTo({
                top: projectsSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }

        // Then highlight projects that use this skill (after a small delay to account for scrolling)
        setTimeout(() => {
            const relevantProjects = document.querySelectorAll(`.project-card[data-skills*="${skill}"]`);
            relevantProjects.forEach(project => {
                project.classList.add('highlight');
                
                // Remove highlight after 1 second
                setTimeout(() => {
                    project.classList.remove('highlight');
                }, 1000);
            });
            
            // Highlight the skill badge in projects
            const relevantBadges = document.querySelectorAll(`.skill-badge[data-skill="${skill}"]`);
            relevantBadges.forEach(badge => {
                badge.classList.add('active');
                
                // Remove highlight after 1 second
                setTimeout(() => {
                    badge.classList.remove('active');
                }, 1000);
            });
        }, 500);
    }
    
    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            const skill = this.getAttribute('data-skill');
            highlightProjectsBySkill(skill);
        });
    });
    
    skillBadges.forEach(badge => {
        badge.addEventListener('click', function(e) {
            e.stopPropagation();
            const skill = this.getAttribute('data-skill');
            highlightProjectsBySkill(skill);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section, .project-card, .timeline-item, .skill-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.section, .project-card, .timeline-item, .skill-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    animateOnScroll();
    
    window.addEventListener('scroll', animateOnScroll);
});

//#region console
// Console Easter Egg
const consoleContainer = document.getElementById('console-container');
const consoleOutput = document.getElementById('console-output');
const consoleInput = document.getElementById('console-input');
const consoleClose = document.getElementById('console-close');

let consoleVisible = false;

// Toggle console with backtick key (`)
document.addEventListener('keydown', function(e) {
    if (e.shiftKey && e.key === 'C') {
        e.preventDefault();
        toggleConsole();
    }
    
    // If console is visible and Enter is pressed
    if (consoleVisible && e.key === 'Enter' && document.activeElement === consoleInput) {
        e.preventDefault();
        processCommand(consoleInput.value);
        consoleInput.value = '';
    }
});

// Close button
consoleClose.addEventListener('click', toggleConsole);

function toggleConsole() {
    consoleVisible = !consoleVisible;
    if (consoleVisible) {
        consoleContainer.classList.remove('console-hidden');
        consoleInput.focus();
        printToConsole('Welcome to JPK Console! Type "help" for available commands.', 'info');
    } else {
        consoleContainer.classList.add('console-hidden');
    }
}

function printToConsole(text, type = 'normal') {
    const line = document.createElement('div');
    line.className = `response ${type}`;
    line.textContent = text;
    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function processCommand(cmd) {
    if (!cmd.trim()) return;
    
    // Echo the command
    printToConsole(`$ ${cmd}`, 'command');
    
    const args = cmd.split(' ');
    const command = args[0].toLowerCase();
    const params = args.slice(1).join(' ');
    
    switch(command) {
        case 'help':
            printToConsole('Available commands:', 'info');
            printToConsole('info - Shows information about this website');
            printToConsole(' goto <section> - Jump to section (about, skills, projects, etc)');
            printToConsole('echo <text> - Repeats the provided text');
            printToConsole('contact - Shows contact information');
            printToConsole('projects - Lists all projects');
            printToConsole('skills - Lists all skills');
            printToConsole('clear - Clears the console');
            printToConsole('play <game>- Launch one of my games (beaver-runner, move-on, etc)');
            printToConsole('open <site>- Open a website (github, linkedin, lieblings-wunschliste, etc)');
            printToConsole('quit - Close the console');
            break;
            
        case 'info':
            printToConsole('Jan Philipp Kleinschmidt Portfolio', 'info');
            printToConsole('Version: 0.2.9');
            printToConsole('Description: Professional portfolio showcasing skills in Wirtschaftsinformatik, programming, and Game design.');
            printToConsole('Technologies: HTML5, CSS3, JavaScript');
            break;
            
        case 'echo':
            if (!params) {
                printToConsole('Usage: echo <text>', 'error');
                break;
            }
            printToConsole(params);
            break;
            
        case 'contact':
            printToConsole('Contact Information:', 'info');
            printToConsole('Email: mail@janphilippkleinschmidt.com');
            printToConsole('LinkedIn: https://linkedin.com/in/Jan-Philipp-Kleinschmidt');
            printToConsole('GitHub: https://github.com/J20a05n');
            break;
            
        case 'projects':
            printToConsole('My Projects:', 'info');
            printToConsole('1. Lieblings Wunschliste - Free online wishlist creator');
            printToConsole('2. Move On - 2D Platformer game');
            printToConsole('3. Beaver Runner - 2D jump and run game');
            printToConsole('4. Side.Games - Game development project');
            printToConsole('5. Choros - 2D action space shooter');
            printToConsole('6. S.A.C. - Secret agent game');
            printToConsole('7. Cat Adventure - Run-and-gun platformer');
            printToConsole('Visit the projects section for more details!');
            break;
            
        case 'skills':
            printToConsole('My Skills:', 'info');
            printToConsole('Programming: C#, Java, Python, JavaScript, HTML, CSS');
            printToConsole('Tools: Unity, Godot, Git, Docker, Node.js, Linux, VS Code');
            printToConsole('Other: Office, Adobe Suite, 3D Printing, Arduino');
            break;
            
        case 'clear':
            consoleOutput.innerHTML = '';
            break;

        case 'play':
            if (!params) {
                printToConsole('Usage: play <game>', 'error');
                printToConsole('Available games: beaver-runner, move-on, choros, sac, cat-adventure', 'info');
                break;
            }
            
            const gameMap = {
                'beaver-runner': 'https://j20a05n.github.io/Beaver-Runner_WebGL-Build/',
                'move-on': 'https://j20a05n.itch.io/move-on',
                'choros': 'https://j20a05n.itch.io/choros',
                'sac': 'https://j20a05n.itch.io/sac',
                'cat-adventure': 'https://j20a05n.itch.io/cat-adventure'
            };
            
            const gameKey = params.toLowerCase().replace(/\s+/g, '-');
            
            if (gameMap[gameKey]) {
                printToConsole(`Launching ${params}...`, 'success');
                setTimeout(() => window.open(gameMap[gameKey], '_blank'), 500);
            } else {
                printToConsole(`Game "${params}" not found. Type "play" for available games.`, 'error');
            }
            break;
            
        case 'open':
            if (!params) {
                printToConsole('Usage: open <site>', 'error');
                printToConsole('Available sites: github, linkedin, lieblings-wunschliste, sidegames', 'info');
                break;
            }
            
            const siteMap = {
                'github': 'https://github.com/J20a05n',
                'linkedin': 'https://linkedin.com/in/Jan-Philipp-Kleinschmidt',
                'lieblings': 'https://www.lieblings-wunschliste.de',
                'sidegames': 'https://sidegames.janphilippkleinschmidt.com'
            };
            
            const siteKey = params.toLowerCase();
            
            if (siteMap[siteKey]) {
                printToConsole(`Opening ${params}...`, 'success');
                setTimeout(() => window.open(siteMap[siteKey], '_blank'), 500);
            } else {
                printToConsole(`Site "${params}" not found. Type "open" for available sites.`, 'error');
            }
            break;
        
        case 'goto':
            if (!params) {
                printToConsole('Usage: goto <section>', 'error');
                printToConsole('Available sections: about, skills, projects, experience, contact', 'info');
                break;
            }

            const sectionMap = {
                'about': '#about',
                'skills': '#skills',
                'projects': '#projects',
                'experience': '#experience',
                'contact': '#contact'
            };

            const sectionKey = params.toLowerCase();
            
            if (sectionMap[sectionKey]) {
                const section = document.querySelector(sectionMap[sectionKey]);
                if (section) {
                    printToConsole(`Scrolling to ${params} section...`, 'success');
                    window.scrollTo({
                        top: section.offsetTop - 80,
                        behavior: 'smooth'
                    });
                } else {
                    printToConsole(`Section "${params}" not found in DOM`, 'error');
                }
            } else {
                printToConsole(`Section "${params}" not available. Type "goto" for available sections.`, 'error');
            }
            break;
            
        case 'sudo':
            if (params === 'rm -rf /') {
                printToConsole('', 'error');
                printToConsole('ERROR: PERMISSION DENIED.', 'error');
                printToConsole('', 'error');
                printToConsole('(╯°□°)╯︵ ┻━┻', 'error');
                printToConsole('', 'error');
                printToConsole('System integrity maintained. *phew*', 'success');
            } else {
                printToConsole(`sudo: ${params}: command not found`, 'error');
            }
            break;
            
        case 'quit':
            printToConsole('Closing console...', 'info');
            toggleConsole();
            break;
            
        default:
            printToConsole(`Command not found: ${command}`, 'error');
            printToConsole('Type "help" for available commands', 'info');
    }
}
//#endregion console
