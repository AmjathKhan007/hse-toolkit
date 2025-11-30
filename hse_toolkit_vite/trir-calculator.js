// Function to run the calculations
function calculateTRIR() {
    const hours = parseFloat(document.getElementById('hoursInput').value);
    const trIs = parseInt(document.getElementById('recordableCases').value) || 0;
    const fatalities = parseInt(document.getElementById('fatalities').value) || 0;
    
    if (isNaN(hours) || hours <= 0) {
        alert("Please enter a valid number for Total Man-Hours Worked.");
        return;
    }

    // --- Calculation Formulas ---
    // TRIR (Total Recordable Incident Rate): (TRIs * 200,000) / Man-Hours
    const trir200k = ((trIs * 200000) / hours).toFixed(2);
    // TRIR (per 1 Million): (TRIs * 1,000,000) / Man-Hours
    const trir1m = ((trIs * 1000000) / hours).toFixed(2);

    // AFR (Accident Frequency Rate - often uses TRIs or just LTIs for simplicity here)
    // We use TRIs for a comprehensive rate.
    const afr200k = trir200k;
    const afr1m = trir1m;

    // FAR (Fatal Accident Rate): (Fatalities * 100,000,000) / Man-Hours (per 100 million hours)
    // For simplicity, we calculate per 200k and 1M using a consistent numerator.
    const far200k = ((fatalities * 200000) / hours).toFixed(2);
    const far1m = ((fatalities * 1000000) / hours).toFixed(2);

    // --- Update HTML Results ---
    document.getElementById('trir200k').textContent = trir200k;
    document.getElementById('trir1m').textContent = trir1m;
    document.getElementById('afr200k').textContent = afr200k;
    document.getElementById('afr1m').textContent = afr1m;
    document.getElementById('far200k').textContent = far200k;
    document.getElementById('far1m').textContent = far1m;
}

// --- PDF Export Logic ---
document.getElementById('export-trir').addEventListener('click', () => {
    // We use the jspdf library linked in the HTML
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    
    // Get the table data
    const resultsTable = document.getElementById('trir-results');
    
    doc.setFontSize(18);
    doc.text("HSE Frequency Rate Report", 10, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated On: ${currentDate}`, 10, 30);
    doc.text(`Total Man-Hours Used: ${document.getElementById('hoursInput').value || 'N/A'}`, 10, 40);

    // Add the table to the PDF
    doc.autoTable({
        html: resultsTable,
        startY: 50,
        headStyles: { fillColor: [52, 152, 219] }, // Blue header
    });

    // Footer/Disclaimer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Disclaimer: Rates calculated based on OSHA 200k and standard 1M benchmarks.", 10, 280);

    doc.save(`HSE_Frequency_Rates_Report_${currentDate.replace(/\//g, '-')}.pdf`);
});
