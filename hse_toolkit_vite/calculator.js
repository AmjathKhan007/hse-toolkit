// Check if browser supports localStorage (to save the cumulative hours)
const isStorageAvailable = typeof(Storage) !== "undefined";

// Load cumulative hours from browser storage, or start at 0
let cumulativeSafeHours = isStorageAvailable ? parseFloat(localStorage.getItem('cumulativeHours')) || 0 : 0;

// Update the display element on load
document.getElementById('cumulativeHours').textContent = cumulativeSafeHours.toLocaleString();

function updateSafeHours() {
    const hoursInput = document.getElementById('hoursWorked');
    const newHours = parseFloat(hoursInput.value);

    if (isNaN(newHours) || newHours <= 0) {
        alert("Please enter a valid number of man-hours worked.");
        return;
    }

    // 1. Update cumulative hours
    cumulativeSafeHours += newHours;
    
    // 2. Save to browser storage
    if (isStorageAvailable) {
        localStorage.setItem('cumulativeHours', cumulativeSafeHours);
    }

    // 3. Update the display
    document.getElementById('cumulativeHours').textContent = cumulativeSafeHours.toLocaleString();
    
    // Clear the input field for next use
    hoursInput.value = '';
    
    alert(`Successfully added ${newHours.toLocaleString()} hours. Total Safe Hours: ${cumulativeSafeHours.toLocaleString()}`);
}

// --- PDF Export Logic ---
document.getElementById('export-man-hours').addEventListener('click', () => {
    // We use the jspdf library linked in the HTML
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const currentDate = new Date().toLocaleDateString();
    const lastLTI = document.getElementById('lastLTI').value || 'N/A';
    
    // Set title and content
    doc.setFontSize(18);
    doc.text("Safe Man-Hours Report", 10, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated On: ${currentDate}`, 10, 30);
    doc.text(`Project Name: [Input Project Name Here]`, 10, 40); // User should add project name input
    
    doc.setFontSize(14);
    doc.text("Safety Metrics:", 10, 60);

    doc.setFontSize(12);
    doc.text(`Total Cumulative Safe Man-Hours: ${cumulativeSafeHours.toLocaleString()}`, 10, 70);
    doc.text(`Date of Last LTI: ${lastLTI}`, 10, 80);
    doc.text("Report Status: CONFIRMED SAFE", 10, 90);

    // Footer/Disclaimer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Disclaimer: Calculations based on user input. Confirm with organizational standards.", 10, 280);

    // Save the PDF
    doc.save(`HSE_Safe_Man_Hours_Report_${currentDate.replace(/\//g, '-')}.pdf`);
});
