let history = [];

function appendValue(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function backspace() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

// FIXED SCIENTIFIC LOGIC
function calculate() {
    let display = document.getElementById("display");
    let exp = display.value;

    try {
        if (!exp) return;

        while (/[+\-*/.]$/.test(exp)) {
            exp = exp.slice(0, -1);
        }

        exp = exp.replace(/sin\(([^)]*)\)/g, "Math.sin(($1)*Math.PI/180)");
        exp = exp.replace(/cos\(([^)]*)\)/g, "Math.cos(($1)*Math.PI/180)");
        exp = exp.replace(/tan\(([^)]*)\)/g, "Math.tan(($1)*Math.PI/180)");

        exp = exp.replace(/log\(/g, "Math.log10(");
        exp = exp.replace(/sqrt\(/g, "Math.sqrt(");

        let result = Function("return " + exp)();

        display.value = result;
        history.push(exp + " = " + result);

    } catch (e) {
        display.value = "Error";
        console.log(e);
    }
}

function addToHistory() {
    alert(history.join("\n"));
}

// FIXED DARK MODE NAME MATCH
function toggleDark() {
    document.body.classList.toggle("dark");
}

function appendFunction(func) {
    document.getElementById("display").value += func + "(";
}
function appendValue(value) {
    let display = document.getElementById("display");
    let current = display.value;

    let parts = current.split(/[\+\-\*\/]/);
    let last = parts[parts.length - 1];

    let digits = last.replace(/[^0-9]/g, "");

    // ✔ 15-digit limit restored
    if (digits.length >= 15 && /[0-9]/.test(value)) {
        alert("Cannot add more than 15 digits!");
        return;
    }

    display.value += value;
}
document.addEventListener("keydown", function(e) {

    let key = e.key;

    // numbers + operators
    if (!isNaN(key) || "+-*/().".includes(key)) {
        appendValue(key);
    }

    // enter = calculate
    else if (key === "Enter") {
        calculate();
    }

    // backspace
    else if (key === "Backspace") {
        backspace();
    }
});