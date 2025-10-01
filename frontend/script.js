document.addEventListener('DOMContentLoaded', function() {
            // Menú Sticky
            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                header.classList.toggle('sticky', window.scrollY > 0);
            });
            
            // Menú Toggle
            const toggle = document.querySelector('.toggle');
            const header = document.querySelector('header');
            
            toggle.addEventListener('click', function() {
                header.classList.toggle('active');
            });
            
            // Cerrar menú al hacer clic en un enlace
            const navLinks = document.querySelectorAll('.navigation li a');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    header.classList.remove('active');
                });
            });
            
            // Smooth Scroll
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
            
            // Animación al hacer scroll
            const animateOnScroll = function() {
                const sections = document.querySelectorAll('.slide');
                
                sections.forEach(section => {
                    const sectionPosition = section.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.3;
                    
                    if (sectionPosition < screenPosition) {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }
                });
            };
            
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll();
        });