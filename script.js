
const result = document.getElementById("result");
const expression = document.getElementById("expression");

let currentInput = "";

// Display the entered values
function updateDisplay() {
    result.value = currentInput || "0";
    expression.textContent = currentInput
        .replaceAll("*", "×")
        .replaceAll("/", "÷");
}

// Handle button clicks
document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;
        const action = button.dataset.action;

        // Clear screen
        if (action === "clear") {
            currentInput = "";
            expression.textContent = "";
            updateDisplay();
        }

        // Delete last character
        else if (action === "delete") {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        }

        // Calculate result
        else if (action === "calculate") {
            calculate();
        }

        // Enter numbers and operators
        else if (value) {
            currentInput += value;
            updateDisplay();
        }

    });

});

// Perform calculations
function calculate() {

    if (currentInput === "") return;

    try {

        if (!/^[0-9+\-*/%. ]+$/.test(currentInput)) {
            throw new Error("Invalid");
        }

        const answer = Function(
            '"use strict"; return (' + currentInput + ')'
        )();

        if (!Number.isFinite(answer)) {
            throw new Error("Invalid");
        }

        expression.textContent = currentInput + " =";

        currentInput = String(
            Number.parseFloat(answer.toPrecision(12))
        );

        result.value = currentInput;

    } catch {

        result.value = "Error";
        currentInput = "";
        expression.textContent = "";

    }

}

// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (/^[0-9.+\-*/%]$/.test(key)) {
        currentInput += key;
        updateDisplay();
    }

    else if (key === "Enter") {
        calculate();
    }

    else if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    else if (key === "Escape") {
        currentInput = "";
        expression.textContent = "";
        updateDisplay();
    }

});
