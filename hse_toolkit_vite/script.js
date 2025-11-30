document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = nav.querySelectorAll('a');
    
    // --- 1. Mobile Menu Toggle ---
    if (menuToggle) { // Safety check added here
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // --- 2. Tab/Tool Switching Logic (The Fix!) ---
    function showTool(toolId) {
        // Hide all tool components (sections)
        document.querySelectorAll('.tool-component').forEach(comp => {
            comp.classList.remove('active');
            comp.classList.add('hidden');
        });

        // Show the selected component (based on the ID)
        const selectedTool = document.getElementById(toolId);
        if (selectedTool) {
            selectedTool.classList.add('active');
            selectedTool.classList.remove('hidden');
        }

        // Update active navigation link styling
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // --- THE CRITICAL FIX IS BELOW ---
        const activeLink = document.querySelector(`[data-tool="${toolId}"]`);
        
        // Check if the link element exists before trying to add a class to it.
        if (activeLink) { 
            activeLink.classList.add('active');
        }
    }

    // --- 3. Attach Click Handlers to Navigation Links ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Stop the link from jumping/reloading
            
            const toolId = link.getAttribute('data-tool');
            if (toolId) {
                showTool(toolId);
            }
            
            // Close mobile menu after selection
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                if(menuToggle) {
                     menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Initialize: Show the home page when the app starts
    showTool('home'); 
});
