// Exchange rates (as of June 2025) - ZAR to other currencies
const exchangeRates = {
    USD: 0.0556, // 1 ZAR = 0.0556 USD (based on ~18 ZAR per USD)
    EUR: 0.0493, // 1 ZAR = 0.0493 EUR (based on ~20.3 ZAR per EUR)
    GBP: 0.0420  // 1 ZAR = 0.0420 GBP (based on ~23.8 ZAR per GBP)
};

document.getElementById('shipping-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('weight').value);
    const distance = parseFloat(document.getElementById('distance').value);
    const service = document.getElementById('service').value;
    
    if (!weight || !distance || !service) {
        alert('Please fill in all fields');
        return;
    }
    
    const costZAR = calculateShipping(weight, distance, service);
    const deliveryTime = estimateDelivery(service, distance);
    
    displayResult(costZAR, deliveryTime, service);
});

function calculateShipping(weight, distance, service) {
    const baseRate = {
        'standard': 8.0,   // Adjusted for ZAR (was 0.5)
        'express': 12.8,   // Adjusted for ZAR (was 0.8)
        'overnight': 19.2  // Adjusted for ZAR (was 1.2)
    };
    
    const weightMultiplier = weight * 30;  // Adjusted for ZAR (was 2)
    const distanceMultiplier = distance * 1.5;  // Adjusted for ZAR (was 0.1)
    const serviceRate = baseRate[service];
    
    return (weightMultiplier + distanceMultiplier) * serviceRate / 10;
}

function estimateDelivery(service, distance) {
    const baseDays = {
        'standard': Math.ceil(distance / 500) + 3,
        'express': Math.ceil(distance / 800) + 1,
        'overnight': 1
    };
    
    return baseDays[service];
}

function convertCurrency(zarAmount) {
    return {
        ZAR: zarAmount,
        USD: zarAmount * exchangeRates.USD,
        EUR: zarAmount * exchangeRates.EUR,
        GBP: zarAmount * exchangeRates.GBP
    };
}

function displayResult(costZAR, deliveryTime, service) {
    const currencies = convertCurrency(costZAR);
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = `
        <h3>Shipping Calculation Results</h3>
        <p><strong>Service:</strong> ${service.charAt(0).toUpperCase() + service.slice(1)}</p>
        <div class="cost-breakdown">
            <h4>Estimated Cost:</h4>
            <p class="primary-currency"><strong>R${currencies.ZAR.toFixed(2)} ZAR</strong></p>
            <div class="currency-conversions">
                <p>$${currencies.USD.toFixed(2)} USD</p>
                <p>€${currencies.EUR.toFixed(2)} EUR</p>
                <p>£${currencies.GBP.toFixed(2)} GBP</p>
            </div>
        </div>
        <p><strong>Estimated Delivery:</strong> ${deliveryTime} day(s)</p>
        <p class="rate-note"><em>Exchange rates updated June 2025</em></p>
    `;
    resultDiv.style.display = 'block';
}