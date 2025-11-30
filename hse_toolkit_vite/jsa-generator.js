document.addEventListener('DOMContentLoaded', () => {
    const addRowBtn = document.getElementById('addRowBtn');
    const jsaBody = document.getElementById('jsa-body');
    const generateJsaPdfBtn = document.getElementById('generateJsaPdf');
    let stepCount = 0;

    // --- 1. Function to Add a New Dynamic Row ---
    function addJsaRow() {
        stepCount++;
        const newRow = jsaBody.insertRow();
        newRow.setAttribute('data-step', stepCount);
        
        // Step Number Cell
        let cell1 = newRow.insertCell(0);
        cell1.textContent = stepCount;
        
        // Job Step Cell (Editable)
        let cell2 = newRow.insertCell(1);
        cell2.innerHTML = '<textarea class="jsa-input" placeholder="Describe the task..."></textarea>';
        
        // Hazard Cell (Editable)
        let cell3 = newRow.insertCell(2);
        cell3.innerHTML = '<textarea class="jsa-input" placeholder="e.g., Fall from height, Electrocution..."></textarea>';
        
        // Control Cell (Editable)
        let cell4 = newRow.insertCell(3);
        cell4.innerHTML = '<textarea class="jsa-input" placeholder="e.g., Use full body harness, LOTO procedure..."></textarea>';
    }

    // Add initial rows when the JSA tool is loaded
    addJsaRow(); 
    addJsaRow(); 

    // Event listener for the "Add New Step" button
    addRowBtn.addEventListener('click', addJsaRow);

    // --- 2. Function to Generate PDF ---
    generateJsaPdfBtn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('landscape'); // Use landscape for wider tables
        const currentDate = new Date().toLocaleDateString();

        const jobTitle = document.getElementById('jobTitle').value || 'Untitled Job Safety Analysis';
        const location = document.getElementById('location').value || 'Not Specified';

        doc.setFontSize(18);
        doc.text("Job Safety Analysis (JSA)", 10, 15);
        
        doc.setFontSize(12);
        doc.text(`Job/Activity: ${jobTitle}`, 10, 25);
        doc.text(`Location: ${location}`, 10, 32);
        doc.text(`Date: ${currentDate}`, 10, 39);

        // AutoTable to convert HTML table to PDF
        doc.autoTable({
            html: '#jsa-table', 
            startY: 45,
            headStyles: { fillColor: [23, 162, 184] }, // Teal header
            bodyStyles: { minCellHeight: 12, valign: 'middle' },
            styles: { fontSize: 8 },
            theme: 'striped'
        });

        // Footer
        doc.setFontSize(8);
        doc.text('Prepared by HSE Toolkit. Review and Validation by Site Safety Team is Required.', 10, doc.internal.pageSize.height - 10);

        doc.save(`${jobTitle.replace(/[^a-z0-9]/gi, '_')}_JSA_Report.pdf`);
    });
});
