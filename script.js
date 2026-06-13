// Developer Portfolio Interaction Suite
// Client-side interactions, dynamic effects, and terminal controller for Surajit Patra.

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // Global Constants and Initial Settings
    // -------------------------------------------------------------
    const currentYear = new Date().getFullYear();
    const yearPlaceholder = document.getElementById('year-placeholder');
    if (yearPlaceholder) yearPlaceholder.textContent = currentYear;

    // Set default dark theme if not set
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
    }
    const savedTheme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // -------------------------------------------------------------
    // Theme Toggle Handler
    // -------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Print theme change system log in the terminal if it exists
            appendTerminalLine(`[SYSTEM] Interface theme toggled to: ${newTheme.toUpperCase()}`, 'system-msg');
        });
    }

    function updateThemeIcon(theme) {
        const lightIcon = document.querySelector('.light-icon');
        const darkIcon = document.querySelector('.dark-icon');
        if (theme === 'dark') {
            if (lightIcon) lightIcon.style.display = 'none';
            if (darkIcon) darkIcon.style.display = 'block';
        } else {
            if (lightIcon) lightIcon.style.display = 'block';
            if (darkIcon) darkIcon.style.display = 'none';
        }
    }

    // -------------------------------------------------------------
    // Dynamic Typography (Typewriter) Animation
    // -------------------------------------------------------------
    const typingElement = document.getElementById('typing-element');
    const roles = [
        'scalable RESTful APIs',
        'responsive Angular views',
        'robust MLOps pipelines',
        'intelligent data systems',
        'secure ASP.NET backends'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function handleTypewriter() {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120 - Math.random() * 40; // natural typing cadence
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Stop and wait before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // brief pause before next word
        }

        setTimeout(handleTypewriter, typingSpeed);
    }
    
    // Launch Typewriter
    setTimeout(handleTypewriter, 1000);

    // -------------------------------------------------------------
    // Pinned Scroll Progress Indicator
    // -------------------------------------------------------------
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.pageYOffset / totalHeight) * 100;
            if (scrollProgress) scrollProgress.style.width = `${progress}%`;
        }
    });

    // -------------------------------------------------------------
    // Mobile Navigation Drawer Overlay
    // -------------------------------------------------------------
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburgerBtn && mobileNavOverlay) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('open');
            mobileNavOverlay.classList.toggle('open');
            document.body.style.overflow = mobileNavOverlay.classList.contains('open') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                hamburgerBtn.classList.remove('open');
                mobileNavOverlay.classList.remove('open');
                document.body.style.overflow = '';
                
                // Add active class locally
                mobileLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // -------------------------------------------------------------
    // Scroll Spy: Update Active Navigation Links
    // -------------------------------------------------------------
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = 'hero';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Triggers active state when section is 30% down the screen
            if (window.pageYOffset >= sectionTop - window.innerHeight * 0.3) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-sec') === currentSectionId) {
                link.classList.add('active');
            }
        });
    });

    // -------------------------------------------------------------
    // Interactive Canvas Background (Neural Net Particle Mesh)
    // -------------------------------------------------------------
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 10;
                
                // Direction variables
                this.vx = (Math.random() * 1 - 0.5) * 0.8;
                this.vy = (Math.random() * 1 - 0.5) * 0.8;
            }

            draw() {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                // Vibrant Indigo/Teal based particle nodes
                ctx.fillStyle = currentTheme === 'dark' ? 'rgba(20, 184, 166, 0.65)' : 'rgba(99, 102, 241, 0.6)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                // Bounce off walls
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction physics (repel effect)
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius) {
                        let forceDirectionX = dx / distance;
                        let forceDirectionY = dy / distance;
                        let maxDistance = mouse.radius;
                        let force = (maxDistance - distance) / maxDistance;
                        let directionX = forceDirectionX * force * this.density * 0.4;
                        let directionY = forceDirectionY * force * this.density * 0.4;
                        
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }
        }

        function initParticles() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            
            // Adjust count dynamically based on resolution density
            const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 11000), 120);
            for (let i = 0; i < numberOfParticles; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        }

        function connectParticles() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let maxDistance = 140;
            
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        let opacityValue = 1 - (distance / maxDistance);
                        ctx.strokeStyle = currentTheme === 'dark' 
                            ? `rgba(99, 102, 241, ${opacityValue * 0.15})`
                            : `rgba(20, 184, 166, ${opacityValue * 0.12})`;
                            
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            connectParticles();
            requestAnimationFrame(animateParticles);
        }

        // Setup & Listeners
        initParticles();
        animateParticles();
        window.addEventListener('resize', initParticles);
    }

    // -------------------------------------------------------------
    // Intersection Observer: Trigger Skill Bar Fill Animations
    // -------------------------------------------------------------
    const skillsSection = document.getElementById('skills');
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    if (skillsSection && skillProgressBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillProgressBars.forEach(bar => {
                        const targetWidth = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 100);
                    });
                    // Unobserve to trigger animation only once
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        skillsObserver.observe(skillsSection);
    }

    // -------------------------------------------------------------
    // Skills Category Filtering
    // -------------------------------------------------------------
    const skillTabButtons = document.querySelectorAll('.skills-tabs .tab-btn');
    const skillColumns = document.querySelectorAll('.skills-grid .skills-column');

    skillTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active status
            skillTabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const categoryFilter = btn.getAttribute('data-target');
            skillColumns.forEach(col => {
                const colCat = col.getAttribute('data-category');
                
                if (categoryFilter === 'all' || colCat === categoryFilter) {
                    col.style.display = 'block';
                    col.style.opacity = '0';
                    setTimeout(() => {
                        col.style.opacity = '1';
                        col.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    col.style.display = 'none';
                }
            });
        });
    });

    // -------------------------------------------------------------
    // Projects Filtering Logic
    // -------------------------------------------------------------
    const projectFilterButtons = document.querySelectorAll('.portfolio-filters .filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');

    projectFilterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Highlight current button
            projectFilterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // -------------------------------------------------------------
    // Interactive Resume Bash CLI Terminal Console
    // -------------------------------------------------------------
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutputBody = document.getElementById('terminal-output-body');
    const terminalClearBtn = document.getElementById('terminal-clear-btn');
    
    // Command database
    const commands = {
        help: () => {
            return `Available interactive commands:
  <span class="highlight-cmd">about</span>       - Brief personal overview & summary
  <span class="highlight-cmd">skills</span>      - Breakdown of technical skills
  <span class="highlight-cmd">experience</span>  - View timeline internship details
  <span class="highlight-cmd">projects</span>    - Showcase completed software products
  <span class="highlight-cmd">project &lt;id&gt;</span> - Details on: <span class="highlight-cmd">fraud</span>, <span class="highlight-cmd">leaf</span>, <span class="highlight-cmd">recs</span>, <span class="highlight-cmd">network</span>
  <span class="highlight-cmd">contact</span>     - Display phone, email, and social networks
  <span class="highlight-cmd">matrix</span>      - Trigger digital fall matrix simulation (easter egg)
  <span class="highlight-cmd">clear</span>       - Empty the terminal buffer screen`;
        },
        about: () => {
            return `<b>Surajit Patra | CSE (Data Science) Undergrad & Software Engineer Intern</b>
--------------------------------------------------------------------------
Location: Greater Kolkata Area, West Bengal, India
Education: B.Tech in Computer Science Engineering (Data Science) @ The Neotia University (2022-2026)
Current Role: Full Stack Developer Intern @ DCG Data-Core Systems

Bio Summary:
I design and develop enterprise outpatient scheduling solutions using ASP.NET Core, C#, 
and Angular. Additionally, my data science profile spans machine learning classifiers, 
automated MLOps pipelines (Docker, Kafka, MLflow, DVC), and custom dashboard telemetry.`;
        },
        skills: () => {
            return `<b>Technical Stack:</b>
--------------------------------------------------------------------------
- <b>Languages:</b> C#, Python, JavaScript, TypeScript, Java, SQL, HTML, CSS
- <b>Frameworks & APIs:</b> ASP.NET Core Web API, Angular, FastAPI, Entity Framework
- <b>Data Science:</b> Scikit-Learn, PyTorch, Pandas, Power BI, Tableau
- <b>MLOps & Infra:</b> Git, Docker, Apache Kafka, MLflow, DVC, PostgreSQL, MySQL, SQL Server`;
        },
        experience: () => {
            return `<b>Professional Experience:</b>
--------------------------------------------------------------------------
1. <b>Full Stack Developer Intern @ DCG Data-Core Systems</b> (Jan 2026 - Present)
   - Built Medisoft+ OPD Modules (Patient booking, Doctor availability match grids).
   - Designed sector-wise revenue dashboard metrics for admin operations.
   - Stack: ASP.NET Core, Angular, SQL Server, C#, TypeScript.

2. <b>Healthcare FastAPI Specialist @ AILABS</b> (Sep 2025)
   - Created model serving REST API layers for healthcare applications.

3. <b>MLOps Intern @ AILABS</b> (Jun 2025 - Jul 2025)
   - Implemented metrics logging and dataset tracking using MLflow and DVC.

4. <b>Machine Learning Intern @ Webel</b> (Jun 2024 - Aug 2024)
   - Conducted transactional predictive accuracy improvements in Python.`;
        },
        projects: () => {
            return `<b>Featured Projects:</b> [Type <span class="highlight-cmd">project &lt;name&gt;</span> for architecture specs]
--------------------------------------------------------------------------
- <span class="highlight-cmd">project fraud</span>   - Real-Time Transaction Fraud Detection System (Kafka, .NET, MLflow)
- <span class="highlight-cmd">project leaf</span>    - Plant Leaf Disease Prediction using DL (FastAPI, PyTorch, Docker)
- <span class="highlight-cmd">project recs</span>    - Product Recommendation Systems with MLOps pipelines (DVC, MLflow)
- <span class="highlight-cmd">project network</span> - SOHO Network Topology & Subnetting Setup (VLANs, Cisco)`;
        },
        contact: () => {
            return `<b>Contact Information:</b>
--------------------------------------------------------------------------
- <b>Email:</b> <a href="mailto:surajitpatra434@gmail.com" class="detail-link">surajitpatra434@gmail.com</a>
- <b>Phone / Mobile:</b> +91 7501143084
- <b>LinkedIn:</b> <a href="https://www.linkedin.com/in/surajitpatra-709b24269" target="_blank" class="detail-link">linkedin.com/in/surajitpatra-709b24269</a>
- <b>Location:</b> Pingla, Paschim Medinipur, 750114, West Bengal, India`;
        }
    };

    const projectDetails = {
        fraud: () => {
            return `<b>Project: Real-Time Credit Card Fraud Detection System</b>
--------------------------------------------------------------------------
- <b>Role:</b> Backend Architecture & Pipeline Setup
- <b>Stack:</b> Apache Kafka, Docker Containers, .NET Core Web API, MLflow, C#
- <b>Architecture:</b> Streaming transactions are ingested via Kafka, analyzed by a 
  deployed classification model to detect anomalies, and saved to SQL Server. 
  Model drift and training loops are versioned and visualised in MLflow.`;
        },
        leaf: () => {
            return `<b>Project: Plant Leaf Disease Identification utilizing DL</b>
--------------------------------------------------------------------------
- <b>Role:</b> ML Inference Endpoint Engineer
- <b>Stack:</b> Python, FastAPI, PyTorch (CNN), Docker, HTML/CSS Interface
- <b>Architecture:</b> Users upload crop foliage photos via a web dashboard. FastAPI 
  intercepts the stream, preprocesses the image array, and feeds it into a trained 
  PyTorch CNN classifier model, outputting infection probability.`;
        },
        recs: () => {
            return `<b>Project: Product Recommendation Systems with MLOps</b>
--------------------------------------------------------------------------
- <b>Role:</b> Data Pipeline Automation Engineer
- <b>Stack:</b> Python, DVC (Data Version Control), MLflow, Scikit-Learn, Docker
- <b>Architecture:</b> Standardized end-to-end dataset acquisition, feature engineering, 
  model retraining, and deployment versioning. Data and models are fully tracked 
  in Git using DVC storage pointers.`;
        },
        network: () => {
            return `<b>Project: SOHO (Small Office Home Office) Network Design</b>
--------------------------------------------------------------------------
- <b>Role:</b> Network Architect
- <b>Stack:</b> Cisco Packet Tracer, VLAN configuration, Subnet routing tables, DHCP/DNS
- <b>Architecture:</b> Configured structured segments separating Guest, Employee, 
  and Server segments with firewalls and dynamic network address routing (NAT).`;
        }
    };

    // Append output line to console
    function appendTerminalLine(text, className = '') {
        if (!terminalOutputBody) return;
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.innerHTML = text;
        terminalOutputBody.appendChild(line);
        // Auto-scroll to bottom
        terminalOutputBody.scrollTop = terminalOutputBody.scrollHeight;
    }

    // Process Terminal Commands
    function executeCommand(inputVal) {
        const cleanInput = inputVal.trim().toLowerCase();
        appendTerminalLine(`visitor@surajit-patra:~$ ${inputVal}`, 'user-cmd');

        if (cleanInput === '') return;

        // Check base command
        if (commands[cleanInput]) {
            appendTerminalLine(commands[cleanInput](), 'system-msg');
        } else if (cleanInput === 'clear') {
            if (terminalOutputBody) {
                terminalOutputBody.innerHTML = '';
            }
        } else if (cleanInput === 'matrix') {
            triggerMatrixRain();
        } else if (cleanInput.startsWith('project ')) {
            const projId = cleanInput.split(' ')[1];
            if (projectDetails[projId]) {
                appendTerminalLine(projectDetails[projId](), 'system-msg');
            } else {
                appendTerminalLine(`Project ID "${projId}" not found. Options: fraud, leaf, recs, network`, 'error-msg');
            }
        } else {
            appendTerminalLine(`Command not recognized: "${inputVal}". Type <span class="highlight-cmd">help</span> to see valid commands.`, 'error-msg');
        }
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const value = terminalInput.value;
                executeCommand(value);
                terminalInput.value = '';
            }
        });
    }

    if (terminalClearBtn) {
        terminalClearBtn.addEventListener('click', () => {
            if (terminalOutputBody) {
                terminalOutputBody.innerHTML = '';
                appendTerminalLine('Terminal buffer cleared. Type <span class="highlight-cmd">help</span> for assistance.', 'text-muted');
            }
        });
    }

    // Terminal Quick inspect buttons in project cards
    const terminalTriggers = document.querySelectorAll('.terminal-trigger');
    terminalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const cmd = trigger.getAttribute('data-cmd');
            
            // Scroll to terminal section
            const termSec = document.getElementById('terminal');
            if (termSec) {
                termSec.scrollIntoView({ behavior: 'smooth' });
            }

            // Execute cmd with animation delay
            setTimeout(() => {
                executeCommand(cmd);
                if (terminalInput) terminalInput.focus();
            }, 600);
        });
    });

    // CLI mode trigger in Hero section
    const terminalShortcutBtn = document.querySelector('.terminal-shortcut-btn');
    if (terminalShortcutBtn) {
        terminalShortcutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const termSec = document.getElementById('terminal');
            if (termSec) {
                termSec.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    if (terminalInput) terminalInput.focus();
                }, 600);
            }
        });
    }

    // -------------------------------------------------------------
    // Easter Egg: Terminal Matrix Rain Simulation
    // -------------------------------------------------------------
    function triggerMatrixRain() {
        appendTerminalLine('Injecting neural telemetry matrix stream...', 'system-msg');
        
        // Hide terminal output lines temporarily or create a fullscreen/box-sized matrix canvas overlay
        const canvasRain = document.createElement('canvas');
        canvasRain.className = 'matrix-canvas';
        canvasRain.style.position = 'absolute';
        canvasRain.style.top = '0';
        canvasRain.style.left = '0';
        canvasRain.style.width = '100%';
        canvasRain.style.height = '100%';
        canvasRain.style.background = '#04060c';
        canvasRain.style.zIndex = '10';
        
        const terminalBox = document.querySelector('.terminal-container');
        if (!terminalBox) return;

        terminalBox.style.position = 'relative';
        terminalBox.appendChild(canvasRain);

        const mCtx = canvasRain.getContext('2d');
        canvasRain.width = terminalBox.clientWidth;
        canvasRain.height = terminalBox.clientHeight;

        const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const alphabet = katakana.split('');

        const fontSize = 14;
        const columns = canvasRain.width / fontSize;

        const rainDrops = [];
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        const drawMatrix = () => {
            mCtx.fillStyle = 'rgba(4, 6, 12, 0.05)';
            mCtx.fillRect(0, 0, canvasRain.width, canvasRain.height);

            mCtx.fillStyle = '#0f0';
            mCtx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet[Math.floor(Math.random() * alphabet.length)];
                mCtx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvasRain.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        const matrixInterval = setInterval(drawMatrix, 30);

        // Terminate simulation after 5.5 seconds and return
        setTimeout(() => {
            clearInterval(matrixInterval);
            if (terminalBox.contains(canvasRain)) {
                terminalBox.removeChild(canvasRain);
            }
            appendTerminalLine('[MATRIX EXITED] Streaming connection closed safely.', 'system-msg');
        }, 5500);
    }

    // -------------------------------------------------------------
    // Contact Form Local Record & Toast Notification System
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Save payload to localStorage messages
            const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
            const submission = {
                id: Date.now(),
                name,
                email,
                subject,
                message,
                date: new Date().toLocaleString()
            };
            messages.push(submission);
            localStorage.setItem('portfolio_messages', JSON.stringify(messages));

            // Feedback: toast notification popup
            showToast(`<i class="fas fa-check-circle toast-icon"></i> Message saved! Thank you, ${name}.`);

            // Feedback: print log alert to terminal
            appendTerminalLine(`[SYSTEM] Mail event intercepted from client. Message queued in local database.`, 'system-msg');
            appendTerminalLine(`&gt;&gt; Source: <b>${name}</b> (${email})<br>&gt;&gt; Subject: "${subject}"<br>&gt;&gt; Timestamp: ${submission.date}`, 'text-muted');

            // Reset form inputs
            contactForm.reset();
        });
    }

    function showToast(messageHtml) {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span class="toast-msg">${messageHtml}</span>`;
        toastContainer.appendChild(toast);

        // Trigger slide-in
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Disappear after 4.5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toastContainer.contains(toast)) {
                    toastContainer.removeChild(toast);
                }
            }, 400);
        }, 4500);
    }
});
