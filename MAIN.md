# GitHub Shipping Calculator Project - Complete Solution

## Part 1: Using GitHub UI

### Step 1: Create a New Repository
1. **Sign in to GitHub** and navigate to your dashboard
2. **Click "New repository"** or the "+" icon in the top-right corner
3. **Repository setup:**
   - Repository name: `shipping-calculator`
   - Description: "A web application for calculating shipping costs and delivery estimates"
   - Set to **Public** (to make it available to the community)
   - Check **"Add a README file"**
   - Add **.gitignore** template: Choose "Node" or "Web"
   - Choose **Apache License 2.0** from the license dropdown

### Step 2: Create Supporting Documents

#### README.md (Edit the generated one)
```markdown
# Shipping Calculator

A robust web application for calculating shipping costs and providing delivery estimates for logistics companies.

## Features
- Calculate shipping rates based on weight, distance, and service type
- Estimate delivery times
- Support for multiple shipping carriers
- User-friendly interface

## Installation
1. Clone the repository
2. Open `index.html` in your browser
3. Start calculating shipping costs!

## Usage
1. Enter package details (weight, dimensions)
2. Select origin and destination
3. Choose shipping service
4. Get instant cost calculation and delivery estimate

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
```

#### Create CONTRIBUTING.md
1. Click **"Create new file"** in your repository
2. Name it `CONTRIBUTING.md`
3. Add the following content:

```markdown
# Contributing to Shipping Calculator

We love your input! We want to make contributing to this project as easy and transparent as possible.

## Development Process
We use GitHub to sync code, track issues, feature requests, and accept pull requests.

## Pull Requests
1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code lints
5. Issue that pull request!

## Any contributions you make will be under the Apache License 2.0
When you submit code changes, your submissions are understood to be under the same [Apache License 2.0](LICENSE) that covers the project.

## Report bugs using GitHub's [issue tracker](../../issues)
We use GitHub issues to track public bugs. Report a bug by opening a new issue.

## Write bug reports with detail, background, and sample code
**Great Bug Reports** tend to have:
- A quick summary and/or background
- Steps to reproduce
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening)

## Code of Conduct
Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.
```

#### Create CODE_OF_CONDUCT.md
1. Click **"Create new file"**
2. Name it `CODE_OF_CONDUCT.md`
3. You can use GitHub's template or create custom content:

```markdown
# Contributor Covenant Code of Conduct

## Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone.

## Our Standards
Examples of behavior that contributes to creating a positive environment include:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

## Enforcement
Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated.

## Attribution
This Code of Conduct is adapted from the [Contributor Covenant](https://www.contributor-covenant.org/), version 2.0.
```

### Step 3: Add Starter Code
1. **Create `index.html`:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shipping Calculator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Shipping Cost Calculator</h1>
        <form id="shipping-form">
            <div class="form-group">
                <label for="weight">Package Weight (kg):</label>
                <input type="number" id="weight" required>
            </div>
            <div class="form-group">
                <label for="distance">Distance (km):</label>
                <input type="number" id="distance" required>
            </div>
            <div class="form-group">
                <label for="service">Service Type:</label>
                <select id="service" required>
                    <option value="">Select Service</option>
                    <option value="standard">Standard</option>
                    <option value="express">Express</option>
                    <option value="overnight">Overnight</option>
                </select>
            </div>
            <button type="submit">Calculate Shipping</button>
        </form>
        <div id="result"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

2. **Create `styles.css`:**
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    padding: 20px;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
}

input, select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

#result {
    margin-top: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 5px;
    display: none;
}
```

3. **Create `script.js`:**
```javascript
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
```

## Part 2: Using GitHub CLI

### Step 1: Set up Local Environment
```bash
# Install GitHub CLI (if not already installed)
# On Ubuntu/Debian:
sudo apt install gh

# On macOS:
brew install gh

# On Windows:
winget install GitHub.cli
```

### Step 2: Authentication and Fork
```bash
# Authenticate with GitHub
gh auth login

# Fork the centralized repository
gh repo fork https://github.com/ibm-developer-skills-network/Centralized-repository-shipping_calculations.git

# Clone your fork
git clone https://github.com/YOUR_USERNAME/Centralized-repository-shipping_calculations.git
cd Centralized-repository-shipping_calculations
```

### Step 3: Create and Switch to New Branch
```bash
# Create and switch to a new feature branch
git checkout -b feature/enhanced-shipping-calculator

# Verify you're on the correct branch
git branch
```

### Step 4: Make Code Edits and Add Files

#### Edit existing files (example modifications):
```bash
# Edit the main shipping calculator file
nano shipping_calculator.js  # or use your preferred editor
```

Add these enhancements to the existing code:
```javascript
// Add new shipping methods
const SHIPPING_METHODS = {
    STANDARD: 'standard',
    EXPRESS: 'express',
    OVERNIGHT: 'overnight',
    ECONOMY: 'economy'  // New addition
};

// Enhanced rate calculation with new economy option
function calculateEnhancedShipping(weight, distance, method, isInternational = false) {
    const rates = {
        economy: 0.3,
        standard: 0.5,
        express: 0.8,
        overnight: 1.2
    };
    
    let baseCost = (weight * 2) + (distance * 0.1);
    let methodMultiplier = rates[method] || rates.standard;
    
    // International shipping surcharge
    if (isInternational) {
        methodMultiplier *= 1.5;
    }
    
    return baseCost * methodMultiplier;
}

// Add tracking number generation
function generateTrackingNumber() {
    const prefix = 'SC';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${prefix}${timestamp}${random}`;
}
```

#### Create new files:
```bash
# Create a configuration file
cat > config.json << EOF
{
    "api": {
        "version": "1.0",
        "endpoint": "https://api.shipping-calculator.com"
    },
    "rates": {
        "currency": "USD",
        "tax_rate": 0.08,
        "fuel_surcharge": 0.05
    },
    "services": {
        "economy": {
            "name": "Economy Shipping",
            "rate_multiplier": 0.3,
            "delivery_days": "7-10"
        },
        "standard": {
            "name": "Standard Shipping",
            "rate_multiplier": 0.5,
            "delivery_days": "3-5"
        },
        "express": {
            "name": "Express Shipping",
            "rate_multiplier": 0.8,
            "delivery_days": "1-2"
        },
        "overnight": {
            "name": "Overnight Shipping",
            "rate_multiplier": 1.2,
            "delivery_days": "1"
        }
    }
}
EOF

# Create a utilities file
cat > utils.js << EOF
// Utility functions for shipping calculator

// Validate shipping data
function validateShippingData(data) {
    const required = ['weight', 'distance', 'service'];
    for (let field of required) {
        if (!data[field] || data[field] <= 0) {
            throw new Error(\`Invalid \${field}: \${data[field]}\`);
        }
    }
    return true;
}

// Format currency
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Calculate delivery date
function calculateDeliveryDate(days) {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + days);
    return deliveryDate.toLocaleDateString();
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateShippingData,
        formatCurrency,
        calculateDeliveryDate
    };
}
EOF

# Create a test file
cat > tests.js << EOF
// Basic tests for shipping calculator

function runTests() {
    console.log('Running shipping calculator tests...');
    
    // Test 1: Basic calculation
    try {
        const cost = calculateEnhancedShipping(5, 100, 'standard');
        console.log('✓ Test 1 passed: Basic calculation');
    } catch (error) {
        console.log('✗ Test 1 failed:', error.message);
    }
    
    // Test 2: International shipping
    try {
        const cost = calculateEnhancedShipping(5, 100, 'express', true);
        console.log('✓ Test 2 passed: International shipping');
    } catch (error) {
        console.log('✗ Test 2 failed:', error.message);
    }
    
    // Test 3: Tracking number generation
    try {
        const tracking = generateTrackingNumber();
        if (tracking && tracking.startsWith('SC')) {
            console.log('✓ Test 3 passed: Tracking number generation');
        } else {
            throw new Error('Invalid tracking number format');
        }
    } catch (error) {
        console.log('✗ Test 3 failed:', error.message);
    }
    
    console.log('Tests completed!');
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
    runTests();
}
EOF
```

### Step 5: Commit and Push Changes
```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "feat: enhance shipping calculator with new features

- Add economy shipping option
- Implement international shipping support
- Add tracking number generation
- Create configuration file for rates and services
- Add utility functions for validation and formatting
- Include basic test suite
- Improve code modularity and maintainability"

# Push to your fork
git push origin feature/enhanced-shipping-calculator
```

### Step 6: Create Pull Request
```bash
# Create pull request using GitHub CLI
gh pr create \
    --title "Enhanced Shipping Calculator with New Features" \
    --body "## Summary
This pull request enhances the shipping calculator with several new features and improvements:

### New Features
- 🚚 Economy shipping option for cost-conscious customers
- 🌍 International shipping support with appropriate surcharges
- 📦 Automatic tracking number generation
- ⚙️ Configuration file for easy rate management

### Improvements
- 🧪 Added basic test suite for quality assurance
- 🛠️ Utility functions for data validation and formatting
- 📊 Better code organization and modularity
- 💰 Enhanced cost calculation algorithms

### Files Changed
- Enhanced existing shipping calculator logic
- Added \`config.json\` for configuration management
- Added \`utils.js\` for utility functions
- Added \`tests.js\` for testing framework

### Testing
All new features have been tested locally and pass the basic test suite.

## Checklist
- [x] Code follows project style guidelines
- [x] Self-review of code completed
- [x] Code is properly commented
- [x] Tests added for new functionality
- [x] All tests pass locally" \
    --base main \
    --head feature/enhanced-shipping-calculator
```

## Additional Commands and Best Practices

### Useful Git/GitHub CLI Commands
```bash
# Check status of your changes
git status

# View differences
git diff

# View commit history
git log --oneline

# Check pull request status
gh pr status

# View repository information
gh repo view

# List all branches
git branch -a

# Switch between branches
git checkout main
git checkout feature/enhanced-shipping-calculator

# Sync with upstream (original repository)
git remote add upstream https://github.com/ibm-developer-skills-network/Centralized-repository-shipping_calculations.git
git fetch upstream
git merge upstream/main
```

### Best Practices Followed
1. **Descriptive commit messages** using conventional commit format
2. **Feature branch workflow** for organized development
3. **Comprehensive pull request description** with checklist
4. **Code organization** with separate files for different concerns
5. **Configuration management** with JSON config file
6. **Testing framework** for quality assurance
7. **Documentation** through comments and README updates

## Verification Steps
1. Ensure your repository is public and has Apache 2.0 license
2. Verify all supporting documents are present (README, CONTRIBUTING, CODE_OF_CONDUCT)
3. Test the shipping calculator functionality locally
4. Confirm pull request is created and properly formatted
5. Check that all files are properly committed and pushed

This completes both parts of the GitHub shipping calculator project, demonstrating proficiency in GitHub UI operations, Git CLI usage, collaborative development practices, and open source project management.