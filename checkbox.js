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

// Добавляем DOMContentLoaded, чтобы код выполнялся после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    // Получаем ссылки на элементы, которые мы будем использовать
    const addButton = document.getElementById('add-button')
    const inputField = document.getElementById('input-field')
    const subCheckboxesUser = document.querySelector('#user .sub-checkboxes')
    const subCheckboxesAdmin = document.querySelector('#admin .sub-checkboxes')

    function loadSubElements() {
        const subElementsData = JSON.parse(
            localStorage.getItem('subElements') || '[]'
        )
        subElementsData.forEach((element) => {
            createSubElement(element.label, element.id)
        })
    }

    function createSubElement(label, id) {
        const div = document.createElement('div')
        div.innerHTML = `
            <label id="${id}">${label}</label>
            <button class="delete-button" data-id="${id}">Удалить</button>
        `
        subCheckboxesUser.appendChild(div)
        subCheckboxesAdmin.appendChild(div.cloneNode(true))
    }

    function updateLocalStorage(subElementsData) {
        localStorage.setItem('subElements', JSON.stringify(subElementsData))
    }

    addButton.addEventListener('click', () => {
        const inputValue = inputField.value

        if (inputValue.trim() !== '') {
            const newId = Date.now()
            createSubElement(inputValue, newId)
            const subElementsData = JSON.parse(
                localStorage.getItem('subElements') || '[]'
            )
            subElementsData.push({ label: inputValue, id: newId })
            updateLocalStorage(subElementsData)
            inputField.value = ''
        }
    })

    subCheckboxesUser.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            const div = event.target.parentNode
            const id = event.target.dataset.id
            div.remove()
            const adminDiv = subCheckboxesAdmin.querySelector(
                `div label[id="${id}"]`
            ).parentNode
            adminDiv.remove()
            const subElementsData = JSON.parse(
                localStorage.getItem('subElements') || '[]'
            )
            const index = subElementsData.findIndex(
                (item) => item.id === parseInt(id)
            )
            if (index !== -1) {
                subElementsData.splice(index, 1)
                updateLocalStorage(subElementsData)
            }
        }
    })

    loadSubElements()
})

/* function loadCheckboxesFromStorage() {
    const storedCheckboxes = localStorage.getItem('checkboxes')
    if (storedCheckboxes) {
        const checkboxesData = JSON.parse(storedCheckboxes)
        // Здесь  вам  нужно  динамически  создать  чекбоксы  из  данных  checkboxesData
        // Например,  используя  document.createElement  и  добавляя  их  в  HTML
    }
}

function saveCheckboxesToStorage() {
    const checkboxesData = [] // Здесь  вам  нужно  собрать  данные  о  чекбоксах
    // Например,  пройдя  по  всем  чекбоксам  и  добавив  их  id  и  значение  в  массив
    localStorage.setItem('checkboxes', JSON.stringify(checkboxesData))
}

// Вызываем  loadCheckboxesFromStorage  при  загрузке  страницы
window.addEventListener('load', loadCheckboxesFromStorage)
 */
