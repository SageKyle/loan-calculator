// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
    // Hide results
    
    // Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 1000);

    e.preventDefault();
});

// Calculate results
function calculateResults() {
    // UI varirables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest) / (x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        // Hide loader
        document.getElementById('loading').style.display = 'none';
        // Display results
        document.getElementById('results').style.display = 'block';
    } else {
        showError('Please complete all the input fields with valid numbers.');
        console.log('Something went wrong')
    }
}

// Show Errors
function showError(error) {
    // Hide loader
    document.getElementById('loading').style.display = 'none';
    // Display results
    document.getElementById('results').style.display = 'none';

    // Create a div
    const errorDiv = document.createElement('div');
    // Get elements
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')

    // Add class
    errorDiv.className = 'alert alert-danger'
    // Add a Text Node
    errorDiv.appendChild(document.createTextNode(error));
    // Insert ErrorDiv
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 2000);
}