import { useState, useEffect } from 'react';
import '../styles/Root.css'
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

const moduleName = import.meta.env.REACT_APP_MODULE_NAME;
const moduleAddress = import.meta.env.REACT_APP_MODULE_ADDRESS;

export default ({ page, setPage, pageData, setPageData }) => {
    const [theme, setTheme] = useState('light');
    const html = document.documentElement;
      
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};
    useEffect(() => {
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  
  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });
  
  // Intersection Observer for Fade-In Animation
  const observerOptions = {
      threshold: 0.2,
      rootMargin: '50px'
  };
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in').forEach(element => {
      observer.observe(element);
  });
  
  // Search Bar Enhancement
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  
  searchInput.addEventListener('focus', () => {
      searchInput.style.boxShadow = '0 0 0 2px var(--accent-color)';
  });
  
  searchInput.addEventListener('blur', () => {
      searchInput.style.boxShadow = 'none';
  });
  
  // Card Hover Effects
  document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-10px)';
          card.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
      });
  
      card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = 'var(--card-shadow)';
      });
  });
  
  // Category Hover Effects
  document.querySelectorAll('.category').forEach(category => {
      category.addEventListener('mouseenter', () => {
          category.style.transform = 'translateY(-5px)';
          category.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
      });
  
      category.addEventListener('mouseleave', () => {
          category.style.transform = 'translateY(0)';
          category.style.boxShadow = 'none';
      });
  });
  
  // Mobile Menu Toggle (Add this if you want to implement a mobile menu)
  function createMobileMenu() {
      const navbar = document.querySelector('.navbar');
      const mobileMenuBtn = document.createElement('button');
      mobileMenuBtn.className = 'mobile-menu-btn';
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      
      const navLinks = document.querySelector('.nav-links');
      
      if (window.innerWidth <= 768) {
          if (!document.querySelector('.mobile-menu-btn')) {
              navbar.appendChild(mobileMenuBtn);
          }
          
          mobileMenuBtn.addEventListener('click', () => {
              navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
          });
      }
  }
  
  // Call createMobileMenu on load and resize
  window.addEventListener('load', createMobileMenu);
  window.addEventListener('resize', createMobileMenu);
  
  // Add mobile menu styles
  const style = document.createElement('style');
  style.textContent = `
      @media (max-width: 768px) {
          .mobile-menu-btn {
              display: block;
              background: none;
              border: none;
              color: var(--text-primary);
              font-size: 1.5rem;
              cursor: pointer;
              padding: 0.5rem;
          }
  
          .nav-links {
              display: none;
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              background: var(--nav-bg);
              flex-direction: column;
              padding: 1rem;
              box-shadow: var(--nav-shadow);
          }
  
          .nav-links li {
              margin: 0.5rem 0;
          }
      }
  `;
    document.head.appendChild(style);
  
    }, [])

    return <>
    <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>FreelanceHub - Find Top Talent</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
    <link rel="stylesheet" href="styles.css"/>

    </head>
    
    <header>
        <nav class="navbar">
            <h1 class="logo">Skill-Chain</h1>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#categories">Categories</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><button class={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'} id="themeToggle" onClick={() => switchTheme()}>
                </button></li>
                <li>
                    <WalletSelector />
                </li>
            </ul>
        </nav>
    </header>

    <section class="hero fade-in" id="home">
        <div class="hero-content">
            <h2>Find Expert Freelancers for Your Vision</h2>
            <p>Connect with top talent from around the world to bring your projects to life.</p>
            <div class="search-bar">
                <input type="text" placeholder="What skill are you looking for?" />
                <button>Find Talent</button>
            </div>
        </div>
    </section>

    <section class="featured-freelancers fade-in">
        <div class="section-header">
            <h2>Featured Professionals</h2>
            <p>Work with trusted experts in their fields</p>
        </div>
        <div class="freelancer-cards">
            <div class="card">
                <img src="/api/placeholder/120/120" alt="John Doe" />
                <h3>John Doe</h3>
                <p>Full Stack Developer</p>
                <div class="card-stats">
                    <div class="stat">
                        <div class="stat-value">4.9</div>
                        <div class="stat-label">Rating</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">127</div>
                        <div class="stat-label">Projects</div>
                    </div>
                </div>
                <button>View Profile</button>
            </div>
            <div class="card">
                <img src="" alt="Jane Smith" />
                <h3>Jane Smith</h3>
                <p>UI/UX Designer</p>
                <div class="card-stats">
                    <div class="stat">
                        <div class="stat-value">5.0</div>
                        <div class="stat-label">Rating</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">84</div>
                        <div class="stat-label">Projects</div>
                    </div>
                </div>
                <button>View Profile</button>
            </div>
            <div class="card">
                <img src="/api/placeholder/120/120" alt="Alex Johnson" />
                <h3>Alex Johnson</h3>
                <p>Content Strategist</p>
                <div class="card-stats">
                    <div class="stat">
                        <div class="stat-value">4.8</div>
                        <div class="stat-label">Rating</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">156</div>
                        <div class="stat-label">Projects</div>
                    </div>
                </div>
                <button>View Profile</button>
            </div>
        </div>
    </section>

    <section class="categories fade-in" id="categories">
        <div class="section-header">
            <h2>Popular Categories</h2>
            <p>Explore services by category</p>
        </div>
        <div class="category-list">
            <div class="category">
                <i class="fas fa-code"></i>
                <h3>Development</h3>
            </div>
            <div class="category">
                <i class="fas fa-paint-brush"></i>
                <h3>Design</h3>
            </div>
            <div class="category">
                <i class="fas fa-pen"></i>
                <h3>Writing</h3>
            </div>
            <div class="category">
                <i class="fas fa-chart-line"></i>
                <h3>Marketing</h3>
            </div>
        </div>
    </section>

    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>FreelanceHub</h3>
                <p>Connect with the world's top talent for your next big project.</p>
            </div>
            <div class="footer-section">
                <h3>For Clients</h3>
                <ul class="footer-links">
                    <li><a href="#">Find Freelancers</a></li>
                    <li><a href="#">Post a Project</a></li>
                    <li><a href="#">Project Catalog</a></li>
                    <li><a href="#">Hiring Guides</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>For Freelancers</h3>
                <ul class="footer-links">
                    <li><a href="#">Find Work</a></li>
                    <li><a href="#">Create Profile</a></li>
                    <li><a href="#">Skills Tests</a></li>
                    <li><a href="#">Success Stories</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Resources</h3>
                <ul class="footer-links">
                    <li><a href="#">Help & Support</a></li>
                    <li><a href="#">Trust & Safety</a></li>
                    <li><a href="#">Community</a></li>
                    <li><a href="#">Blog</a></li>
                </ul>
            </div>
        </div>
        <div class="copyright">
            <p>&copy; 2024 FreelanceHub. All rights reserved.</p>
        </div>
    </footer>
    </>
}