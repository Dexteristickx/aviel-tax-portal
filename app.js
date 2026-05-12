let currentCategory = '';

function startDiagnostic(category) {
    currentCategory = category;
    document.getElementById('selection-screen').classList.add('hidden');
    document.getElementById('intake-form').classList.remove('hidden');
    document.getElementById('intake-form').classList.add('fade-in');

    const title = document.getElementById('form-title');
    const indFields = document.getElementById('individual-fields');
    const bizFields = document.getElementById('business-fields');

    if (category === 'individual') {
        title.innerText = 'Individual Tax Intake Form';
        indFields.classList.remove('hidden');
        bizFields.classList.add('hidden');
        document.getElementById('company_name').required = false;
    } else {
        title.innerText = 'Business Tax Intake Form';
        bizFields.classList.remove('hidden');
        indFields.classList.add('hidden');
        document.getElementById('company_name').required = true;
    }
    
    updateProgress(30);
}

function showSelection() {
    document.getElementById('intake-form').classList.add('hidden');
    document.getElementById('selection-screen').classList.remove('hidden');
    document.getElementById('selection-screen').classList.add('fade-in');
    updateProgress(0);
}

function updateProgress(val) {
    document.getElementById('form-progress').style.width = val + '%';
}

function handleFormSubmit(event) {
    event.preventDefault();
    updateProgress(100);

    const name = document.getElementById('full_name').value;
    const email = document.getElementById('email').value;
    
    // Simulate processing
    const btn = event.target.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Analyzing... <i data-lucide="loader"></i>';
    lucide.createIcons();

    setTimeout(() => {
        document.getElementById('intake-form').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('dashboard').classList.add('fade-in');
        
        setupDashboard(name);
    }, 1500);
}

function setupDashboard(name) {
    document.getElementById('dashboard-client-name').innerText = `Client: ${name} | Category: ${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}`;
    
    const estLiability = document.getElementById('est-liability');
    const actionList = document.getElementById('action-list');
    
    if (currentCategory === 'individual') {
        const income = document.getElementById('ind-income').value;
        if (income === 'over50') {
            estLiability.innerText = '₦12,450,000.00';
            document.getElementById('health-status').innerText = 'Action Required';
            document.getElementById('health-status').style.background = 'var(--danger)';
            actionList.innerHTML = `
                <li><i data-lucide="alert-circle" class="icon-warning"></i> Apply for Consolidated Relief Allowance</li>
                <li><i data-lucide="alert-circle" class="icon-warning"></i> Declare foreign investment income</li>
                <li><i data-lucide="check-circle" class="icon-success"></i> PAYE returns up to date</li>
            `;
        } else {
            estLiability.innerText = '₦850,000.00';
            document.getElementById('health-status').innerText = 'Healthy';
            document.getElementById('health-status').style.background = 'var(--success)';
        }
    } else {
        const rev = document.getElementById('biz-revenue').value;
        if (rev === 'large') {
            estLiability.innerText = '₦45,000,000.00+';
            document.getElementById('health-status').innerText = 'High Risk';
            document.getElementById('health-status').style.background = 'var(--danger)';
            actionList.innerHTML = `
                <li><i data-lucide="alert-circle" class="icon-warning"></i> VAT Audit pending for Q1 2026</li>
                <li><i data-lucide="alert-circle" class="icon-warning"></i> WHT remitted but not receipted</li>
                <li><i data-lucide="info" class="icon-info"></i> Education Tax calculation needs review</li>
            `;
        } else {
            estLiability.innerText = '₦2,100,000.00';
            document.getElementById('health-status').innerText = 'Healthy';
            document.getElementById('health-status').style.background = 'var(--success)';
        }
    }
    
    lucide.createIcons();
}

function generateFullReport() {
    alert('Generating your professional Tax Health Report... This document will include the Executive Summary, Exposure Analysis, and Compliance Roadmap.');
}

// Consultation Form Logic
let activeConsultationType = '';

function openConsultation(type) {
    activeConsultationType = type;
    document.getElementById('consultations').classList.add('hidden');
    document.getElementById('consultation-form-container').classList.remove('hidden');
    
    const title = document.getElementById('consultation-title');
    const desc = document.getElementById('consultation-desc');
    const corpFields = document.getElementById('corporate-only');
    const legalFields = document.getElementById('legal-only');
    const orgLabel = document.getElementById('label-org');

    if (type === 'corporate') {
        title.innerText = 'International Corporate Consultation Request';
        orgLabel.innerText = 'Company Name (If applicable)';
        corpFields.classList.remove('hidden');
        legalFields.classList.add('hidden');
    } else {
        title.innerText = 'Legal Consultation Request';
        orgLabel.innerText = 'Organisation / Company Name (If applicable)';
        corpFields.classList.add('hidden');
        legalFields.classList.remove('hidden');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeConsultation() {
    document.getElementById('consultation-form-container').classList.add('hidden');
    document.getElementById('consultations').classList.remove('hidden');
}

function handleConsultationSubmit(event) {
    event.preventDefault();
    
    const container = document.getElementById('consultation-form-container');
    const screen = document.getElementById('confirmation-screen');
    const details = document.getElementById('confirmation-details');
    
    container.classList.add('hidden');
    screen.classList.remove('hidden');
    
    if (activeConsultationType === 'corporate') {
        details.innerHTML = `
            <strong>Our consultation fee is:</strong><br>
            • 30 minutes – ₦50,000<br>
            • 60 minutes – ₦100,000<br><br>
            <em>For international clients, the equivalent amount will be communicated.</em>
        `;
    } else {
        details.innerHTML = `
            <strong>Consultation Fees:</strong><br>
            • 30 minutes – ₦50,000<br>
            • 60 minutes – ₦100,000
        `;
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
