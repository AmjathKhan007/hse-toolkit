document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = nav.querySelectorAll('a');
    
    // --- 1. Mobile Menu Toggle ---
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // --- 2. Tab/Tool Switching Logic (The Fix!) ---
    function showTool(toolId) {
        // Hide all tool components
        document.querySelectorAll('.tool-component').forEach(comp => {
            comp.classList.remove('active');
            comp.classList.add('hidden');
        });

        // Show the selected component
        const selectedTool = document.getElementById(toolId);
        if (selectedTool) {
            selectedTool.classList.add('active');
            selectedTool.classList.remove('hidden');
        }

        // Update active navigation link styling
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-tool="${toolId}"]`).classList.add('active');
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
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Initialize: Show the home page when the app starts
    showTool('home'); 
});
