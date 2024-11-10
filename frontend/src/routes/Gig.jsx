import { useEffect } from 'react';
import '../styles/Gig.css'
import {
    useWallet,
  } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

const moduleName = import.meta.env.REACT_APP_MODULE_NAME;
const moduleAddress = import.meta.env.REACT_APP_MODULE_ADDRESS;

export default ({ page, setPage, pageData, setPageData }) => {
    const dapp = !!window.dapp;
    useEffect(() => {
       // Theme Switcher (Same as main page)
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        const themeIcon = themeToggle.querySelector('i');

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        // Function to update the theme icon
        function updateThemeIcon(theme) {
            themeIcon.className = theme === 'light' 
                ? 'fas fa-moon'  // Show moon icon for light theme (allows switching to dark)
                : 'fas fa-sun';  // Show sun icon for dark theme (allows switching to light)
        }
    })
    return <>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>John Doe - Full Stack Developer | FreelanceHub</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
    </head>
    <header>
        <nav class="navbar">
            <h1 class="logo" style={{ cursor: 'pointer' }} onClick={() => setPage('/')}>Skill-Chian</h1>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="#categories">Categories</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><button class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                </button></li>
                <li>
                {dapp ? <WalletSelector /> : <>Wallet not found</>}
                </li>
            </ul>
        </nav>
    </header>

    <main>
        <section class="profile-header">
            <div class="profile-container profile-grid">
                <aside class="profile-sidebar">
                    <img src="/api/placeholder/150/150" alt="John Doe" class="profile-picture"/>
                    <h1 class="profile-name">John Doe</h1>
                    <p class="profile-title">Full Stack Developer</p>
                    
                    <div class="profile-stats">
                        <div class="stat-box">
                            <div class="stat-value">4.9</div>
                            <div class="stat-label">Rating</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value">127</div>
                            <div class="stat-label">Projects</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value">98%</div>
                            <div class="stat-label">Completion</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value">4h</div>
                            <div class="stat-label">Response</div>
                        </div>
                    </div>

                    <div class="availability available">
                        <i class="fas fa-circle"></i>
                        <span>Available for work</span>
                    </div>

                    <div class="profile-actions">
                        <a href="#" class="btn-primary">Hire Me</a>
                        <a href="#" class="btn-secondary">Send Message</a>
                    </div>
                </aside>

                <div class="profile-main">
                    <section class="profile-section">
                        <h2 class="section-title">
                            <i class="fas fa-user"></i>
                            About Me
                        </h2>
                        <p>Full Stack Developer with 5+ years of experience in building scalable web applications. Specialized in React, Node.js, and Python. Passionate about creating efficient, user-friendly solutions and maintaining high code quality standards.</p>
                    </section>

                    <section class="profile-section">
                        <h2 class="section-title">
                            <i class="fas fa-code"></i>
                            Skills
                        </h2>
                        <div class="skill-tags">
                            <span class="skill-tag">React</span>
                            <span class="skill-tag">Node.js</span>
                            <span class="skill-tag">Python</span>
                            <span class="skill-tag">MongoDB</span>
                            <span class="skill-tag">TypeScript</span>
                            <span class="skill-tag">AWS</span>
                            <span class="skill-tag">Docker</span>
                            <span class="skill-tag">GraphQL</span>
                        </div>
                    </section>

                    <section class="profile-section">
                        <h2 class="section-title">
                            <i class="fas fa-briefcase"></i>
                            My Gigs
                        </h2>
                        <div class="gig-grid">
                            <div class="gig-card">
                                <img src="/api/placeholder/250/160" alt="Full Stack Web App" class="gig-image"/>
                                <div class="gig-content">
                                    <h3 class="gig-title">Full Stack Web Application</h3>
                                    <p>Complete web application development with React and Node.js</p>
                                    <div class="gig-price">From $1,500</div>
                                </div>
                            </div>
                            <div class="gig-card">
                                <img src="/api/placeholder/250/160" alt="API Development" class="gig-image"/>
                                <div class="gig-content">
                                    <h3 class="gig-title">Custom API Development</h3>
                                    <p>RESTful API development with Node.js and MongoDB</p>
                                    <div class="gig-price">From $800</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="profile-section">
                        <h2 class="section-title">
                            <i class="fas fa-star"></i>
                            Recent Reviews
                        </h2>
                        <div class="reviews">
                            <div class="review-card">
                                <div class="review-header">
                                    <div class="reviewer">
                                        <img src="/api/placeholder/40/40" alt="Client" class="reviewer-avatar"/>
                                        <div class="reviewer-info">
                                            <h4>Sarah Johnson</h4>
                                            <p>2 weeks ago</p>
                                        </div>
                                    </div>
                                    <div class="rating">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                </div>
                                <p class="review-text">John did an excellent job on our e-commerce platform. He was professional, responsive, and delivered the project ahead of schedule. Highly recommended!</p>
                            </div>
                            <div class="review-card">
                                <div class="review-header">
                                    <div class="reviewer">
                                        <img src="/api/placeholder/40/40" alt="Client" class="reviewer-avatar"/>
                                        <div class="reviewer-info">
                                            <h4>Mike Anderson</h4>
                                            <p>1 month ago</p>
                                        </div>
                                    </div>
                                    <div class="rating">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                                <p class="review-text">Great experience working with John. He helped us optimize our API performance and implemented new features efficiently.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </main>
    </>
}