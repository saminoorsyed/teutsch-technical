
// builds the numbers string and input string from user input
export function pushInput(value: string, numbers: string | undefined, input: string[]) {
    if (numbers === undefined) {
        numbers = '';
    }
    // if the input is a number or decimal place, append to already input numbers
    const ints: string[] = ['0', "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "="]
    if (ints.includes(value)) {
        if (value === "." && numbers.includes(".")) {
            alert("You can't include more than one decimal in a number");
            return { numbers, input };
        }
        if (value === "=" && input.length < 2) {
            alert("You need more numbers to perform an operation")
            return { numbers, input };
        }
        numbers += value;
        // the case for operators (including = so that users know they have a result)
    } else if (value === "del") {
        const { numbers: newNumbers, input: newInput } = deleteLast(numbers, input)
        numbers = newNumbers
        input = newInput
    } else if (value === "ac") {
        numbers = ''
        input = []

        // the case for operator
    } else {
        // cannot put two operators in a row
        if (numbers.length <= 0) {
            alert("You can't input an operator here");
        } else {
            input = input.concat([numbers, value])
            numbers = '';
        }
    }
    return { numbers, input }
}

export function toggleNeg(numbers: string | undefined) {
    if (numbers === undefined) {
        numbers = ''
    }
    if (parseFloat(numbers) < 0 || numbers === '-') {
        numbers = numbers.slice(1);
    } else {
        numbers = "-" + numbers;
    }
    return numbers
}

export function compute(numbers: string, input: string[]) {
    const operations: Record<string, (a: number, b: number) => number> = {
        "^": (a, b) => a ** b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
    };
    input = [...input, numbers]
    numbers = "="

    for (const operation of ["^", "*", "/", "+", "-"]) {
        for (let i = 0; i < input.length; i++) {
            if (input[i] === operation) {
                handleComputation(operation, i, input);
                i--;
            }
        }
    }

    function handleComputation(operation: string, index: number, input: string[]) {
        const firstNum = parseFloat(input[index - 1]);
        const secondNum = parseFloat(input[index + 1]);
        if (operation in operations) {
            const interimResult: string = operations[operation](firstNum, secondNum).toFixed(2);
            console.log(interimResult)
            input.splice(index, 2);
            input[index - 1] = interimResult.toString();
        }
    }
    return { numbers, input }
}
export function deleteLast(numbers: string, input: string[]) {
    if (numbers.length > 0) {
        numbers = numbers.slice(0, -1);
    } else if (input.length > 0) {
        if (["^", "*", "/", "+", "-"].includes(input[input.length - 1])) {
            input.pop(); // Remove the last element
        } else {
            const lastInput = input.pop(); // Get and remove the last element
            if (lastInput !== undefined) {
                numbers = lastInput.slice(0, -1); // Update numbers based on the last input
            }
        }
    }
    return { numbers, input };
}