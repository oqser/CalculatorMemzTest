const adminSwitch = document.getElementById('admin-switch')
const userContent = document.getElementById('user')
const adminContent = document.getElementById('admin')

adminSwitch.addEventListener('change', () => {
    if (adminSwitch.checked) {
        userContent.style.display = 'none'
        adminContent.style.display = 'block'
    } else {
        userContent.style.display = 'block'
        adminContent.style.display = 'none'
    }
})

const groupCheckbox = document.getElementById('group-breed')
const subCheckboxes = document.querySelectorAll(
    '#user .sub-checkboxes input[type="checkbox"]'
)
const toggleButton = document.querySelector('.toggle-button')
const subCheckboxesContainer = document.querySelector('.sub-checkboxes')

groupCheckbox.addEventListener('change', () => {
    subCheckboxes.forEach((checkbox) => {
        checkbox.checked = groupCheckbox.checked
    })
})

subCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        const allChecked = Array.from(subCheckboxes).every((cb) => cb.checked)
        groupCheckbox.checked = allChecked
    })
})

toggleButton.addEventListener('click', () => {
    if (subCheckboxesContainer.style.display === 'none') {
        subCheckboxesContainer.style.display = 'block'
        toggleButton.textContent = 'Закрыть список'
    } else {
        subCheckboxesContainer.style.display = 'none'
        toggleButton.textContent = 'Раскрыть список'
    }
})
