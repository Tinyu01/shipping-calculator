document.getElementById('shipping-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('weight').value);
    const distance = parseFloat(document.getElementById('distance').value);
    const service = document.getElementById('service').value;
    
    if (!weight || !distance || !service) {
        alert('Please fill in all fields');
        return;
    }
    
    const cost = calculateShipping(weight, distance, service);
    const deliveryTime = estimateDelivery(service, distance);
    
    displayResult(cost, deliveryTime, service);
});

function calculateShipping(weight, distance, service) {
    const baseRate = {
        'standard': 0.5,
        'express': 0.8,
        'overnight': 1.2
    };
    
    const weightMultiplier = weight * 2;
    const distanceMultiplier = distance * 0.1;
    const serviceRate = baseRate[service];
    
    return (weightMultiplier + distanceMultiplier) * serviceRate;
}

function estimateDelivery(service, distance) {
    const baseDays = {
        'standard': Math.ceil(distance / 500) + 3,
        'express': Math.ceil(distance / 800) + 1,
        'overnight': 1
    };
    
    return baseDays[service];
}

function displayResult(cost, deliveryTime, service) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>Shipping Calculation Results</h3>
        <p><strong>Service:</strong> ${service.charAt(0).toUpperCase() + service.slice(1)}</p>
        <p><strong>Estimated Cost:</strong> $${cost.toFixed(2)}</p>
        <p><strong>Estimated Delivery:</strong> ${deliveryTime} day(s)</p>
    `;
    resultDiv.style.display = 'block';
}