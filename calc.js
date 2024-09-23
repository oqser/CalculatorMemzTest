function calculateFood() {
    const breed = document.getElementById('breed').value
    const age = document.getElementById('age').value
    const activity = document.querySelector(
        'input[name="activity"]:checked'
    ).value
    const weight = parseInt(document.getElementById('weight').value)

    let foodAmount = 0

    if (breed === 'овчарка') {
        if (age === 'меньше1') {
            foodAmount = 600
        } else if (age === '1-5') {
            foodAmount = 800
        } else {
            foodAmount = 700
        }
    } else if (breed === 'лабрадор') {
        if (age === 'меньше1') {
            foodAmount = 500
        } else if (age === '1-5') {
            foodAmount = 700
        } else {
            foodAmount = 400
        }
    }

    if (weight >= 5 && weight <= 10) {
        foodAmount += foodAmount * 0.2
    } else if (weight >= 10 && weight <= 20) {
        foodAmount += foodAmount * 0.3
    } else if (weight >= 21 && weight <= 30) {
        foodAmount += foodAmount * 0.4
    }

    if (activity === 'активный') {
        foodAmount += foodAmount * 0.3
    }

    document.getElementById('result').innerHTML =
        'Рекомендуемое количество корма:  ' + '<br>' + foodAmount + ' грамм'
}
