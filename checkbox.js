const adminSwitch = document.getElementById('admin-switch')
const userContent = document.getElementById('user')
const adminContent = document.getElementById('admin')
const groupCheckbox = document.getElementById('group-prepare') // Main checkbox for "Подготовительные работы"
const toggleButtonUser = document.querySelector('#user .toggle-button')
const subCheckboxesContainerUser = document.querySelector(
    '#user .sub-checkboxes'
)
const subCheckboxesContainerAdmin = document.querySelector(
    '#admin .sub-checkboxes'
)
const subCheckboxesContainerAdminPrepare = document.getElementById(
    'subCheckboxesContainerAdmin-prepare'
)
const subCheckboxesContainerAdminSEO = document.getElementById(
    'subCheckboxesContainerAdmin-seo'
)
const subCheckboxesContainerAdminStrategy = document.getElementById(
    'subCheckboxesContainerAdmin-strategy'
)
const addButtonPrepare = document.getElementById('add-button-prepare')
const addButtonSEO = document.getElementById('add-button-seo')
const addButtonStrategy = document.getElementById('add-button-strategy')
const subCheckboxesContainerUserSEO = document.getElementById(
    'subCheckboxesContainerUser-seo'
)
const subCheckboxesContainerUserStrategy = document.getElementById(
    'subCheckboxesContainerUser-strategy'
)
const toggleButtonUserSEO = document.getElementById('toggleButtonUser-seo')
const toggleButtonUserStrategy = document.getElementById(
    'toggleButtonUser-strategy'
)

// Функция для создания нового суб-элемента
function createSubElement(label, id, container, groupName) {
    const divUser = document.createElement('div')
    divUser.innerHTML = `<input type="checkbox" id="${groupName}-${id}" name="${groupName}" value="${label}"><label for="${groupName}-${id}">${label}</label>`

    if (groupName === 'seo') {
        subCheckboxesContainerUserSEO.appendChild(divUser)
    } else if (groupName === 'strategy') {
        subCheckboxesContainerUserStrategy.appendChild(divUser)
    } else {
        subCheckboxesContainerUser.appendChild(divUser)
    }

    const divAdmin = document.createElement('div')
    divAdmin.innerHTML = `<label id="${groupName}-${id}">${label}</label><button class="delete-button" data-id="${id}" data-group="${groupName}" contenteditable="false">Удалить</button>`
    container.appendChild(divAdmin)

    divAdmin.innerHTML +=
        '<button class="save-button" data-id="${id}" data-group="${groupName}" contenteditable="false">Сохранить</button>'
    container.appendChild(divAdmin)
    // Добавляем обработчик события "click" для кнопки "Сохранить"
    divAdmin.querySelector('.save-button').addEventListener('click', () => {
        saveSubElement(id, groupName, divAdmin)
    })

    // Обновляем localStorage
    const subElementsData = JSON.parse(
        localStorage.getItem(`${groupName}SubElements`) || '[]'
    )
    subElementsData.push({ label: label, id: id })
    updateLocalStorage(subElementsData, groupName)
}

// Функция для обновления localStorage
function updateLocalStorage(subElementsData, groupName) {
    localStorage.setItem(
        `${groupName}SubElements`,
        JSON.stringify(subElementsData)
    )
}

// Функция для удаления суб-элемента
// Удаляем из subCheckboxesAdmin
function deleteSubElement(id, groupName) {
    // Удаляем из subCheckboxesAdmin
    console.log('groupName:', groupName)
    console.log('id:', id)
    let targetElement
    if (groupName === 'seo') {
        targetElement = subCheckboxesContainerAdminSEO.querySelector(
            `label[id="${groupName}-${id}"]`
        ).parentNode
    } else if (groupName === 'strategy') {
        targetElement = subCheckboxesContainerAdminStrategy.querySelector(
            `label[id="${groupName}-${id}"]`
        ).parentNode
    } else {
        // groupName === 'prepare'
        targetElement = subCheckboxesContainerAdminPrepare.querySelector(
            `label[id="${groupName}-${id}"]`
        ).parentNode
    }
    if (targetElement) {
        targetElement.remove()
    }

    // Удаляем из subCheckboxesUser
    const targetElementUser = subCheckboxesContainerUser.querySelector(
        `input[id="${groupName}-${id}"]`
    ).parentNode
    if (targetElementUser) {
        targetElementUser.remove()
    }

    // Обновляем localStorage
    const subElementsData = JSON.parse(
        localStorage.getItem(`${groupName}SubElements`) || '[]'
    )
    const index = subElementsData.findIndex((item) => item.id === parseInt(id))
    if (index !== -1) {
        subElementsData.splice(index, 1)
        updateLocalStorage(subElementsData, groupName)
    }
}

function saveSubElement(id, groupName, divAdmin) {
    const newLabel = divAdmin.querySelector('label').textContent // Получаем новое название сабэлемента

    // Обновляем localStorage
    const subElementsData = JSON.parse(
        localStorage.getItem(`${groupName}SubElements`) || '[]'
    )
    const index = subElementsData.findIndex((item) => item.id === parseInt(id))
    if (index !== -1) {
        subElementsData[index].label = newLabel
        updateLocalStorage(subElementsData, groupName)
    }

    // Обновляем отображение в юзер-части
    const targetElementUser = subCheckboxesContainerUser.querySelector(
        `input[id="${groupName}-${id}"]`
    ).parentNode
    if (targetElementUser) {
        targetElementUser.querySelector('label').textContent = newLabel
    }
}
// Функция для обновления состояния суб-чекбоксов
function updateSubCheckboxes(groupName) {
    const groupCheckbox = document.getElementById(`group-${groupName}`)
    let subCheckboxes
    if (groupName === 'seo') {
        subCheckboxes = document.querySelectorAll(
            '#subCheckboxesContainerUser-seo input[name="seo"]'
        )
    } else if (groupName === 'strategy') {
        subCheckboxes = document.querySelectorAll(
            '#subCheckboxesContainerUser-strategy input[name="strategy"]'
        )
    } else {
        // groupName === 'prepare'
        subCheckboxes = document.querySelectorAll(
            '#user .sub-checkboxes input[name="prepare"]'
        )
    }

    // Обработчик для главного чекбокса
    groupCheckbox.addEventListener('change', () => {
        subCheckboxes.forEach((checkbox) => {
            checkbox.checked = groupCheckbox.checked
        })
    })

    // Обработчики для суб-чекбоксов
    subCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const allChecked = Array.from(subCheckboxes).every(
                (cb) => cb.checked
            )
            groupCheckbox.checked = allChecked
        })
    })

    // Устанавливаем состояние главного чекбокса
    const allChecked = Array.from(subCheckboxes).every((cb) => cb.checked)
    groupCheckbox.checked = allChecked
}

// Обработчик событий для кнопки "Добавить сабэлемент"
addButtonPrepare.addEventListener('click', () => {
    const inputValue = document.getElementById('input-field-prepare').value
    if (inputValue.trim() !== '') {
        const newId = Date.now()
        createSubElement(
            inputValue,
            newId,
            subCheckboxesContainerAdminPrepare,
            'prepare'
        )
        document.getElementById('input-field-prepare').value = ''
    }
})

addButtonSEO.addEventListener('click', () => {
    const inputValue = document.getElementById('input-field-seo').value
    if (inputValue.trim() !== '') {
        const newId = Date.now()
        createSubElement(
            inputValue,
            newId,
            subCheckboxesContainerAdminSEO,
            'seo'
        )
        document.getElementById('input-field-seo').value = ''
    }
})

addButtonStrategy.addEventListener('click', () => {
    const inputValue = document.getElementById('input-field-strategy').value
    if (inputValue.trim() !== '') {
        const newId = Date.now()
        createSubElement(
            inputValue,
            newId,
            subCheckboxesContainerAdminStrategy,
            'strategy'
        )
        document.getElementById('input-field-strategy').value = ''
    }
})

// Обработчик кликов для кнопок "Удалить"
subCheckboxesContainerAdminSEO.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const id = event.target.dataset.id
        const groupName = event.target.dataset.group
        deleteSubElement(id, groupName)
        updateSubCheckboxes(groupName) // Обновляем состояние суб-чекбоксов
    }
})

subCheckboxesContainerAdminStrategy.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const id = event.target.dataset.id
        const groupName = event.target.dataset.group
        deleteSubElement(id, groupName)
        updateSubCheckboxes(groupName) // Обновляем состояние суб-чекбоксов
    }
})

subCheckboxesContainerAdminPrepare.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const id = event.target.dataset.id
        const groupName = event.target.dataset.group
        deleteSubElement(id, groupName)
        updateSubCheckboxes(groupName) // Обновляем состояние суб-чекбоксов
    }
})

// Загрузка сохраненных суб-элементов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const groups = ['prepare', 'seo', 'strategy']

    for (const groupName of groups) {
        const subElementsData = JSON.parse(
            localStorage.getItem(`${groupName}SubElements`) || '[]'
        )

        subElementsData.forEach((element) => {
            // Проверка, существует ли уже элемент с таким id
            const existingElement = document.getElementById(
                `${groupName}-${element.id}`
            )
            if (!existingElement) {
                // Используем правильный контейнер для добавления сабэлемента
                if (groupName === 'seo') {
                    createSubElement(
                        element.label,
                        element.id,
                        subCheckboxesContainerAdminSEO,
                        groupName
                    )
                } else if (groupName === 'strategy') {
                    createSubElement(
                        element.label,
                        element.id,
                        subCheckboxesContainerAdminStrategy,
                        groupName
                    )
                } else {
                    createSubElement(
                        element.label,
                        element.id,
                        subCheckboxesContainerAdminPrepare,
                        groupName
                    )
                }
            }
        })

        updateSubCheckboxes(groupName)
    }
})

const checkboxGroupsAdmin = document.querySelectorAll(
    '.admin-content .checkbox-group'
)

checkboxGroupsAdmin.forEach((group) => {
    group.addEventListener('click', () => {
        // Снимаем класс "active" с других групп
        checkboxGroupsAdmin.forEach((otherGroup) => {
            otherGroup.classList.remove('active')
        })

        // Добавляем класс "active" к текущей группе
        group.classList.add('active')
    })
})

// Обработчик изменения состояния переключателя Admin/User
adminSwitch.addEventListener('change', () => {
    if (adminSwitch.checked) {
        userContent.style.display = 'none'
        adminContent.style.display = 'block'
    } else {
        userContent.style.display = 'block'
        adminContent.style.display = 'none'
    }
})

// Наблюдатель за изменениями в subCheckboxesContainerUser
const observer = new MutationObserver((mutations) => {
    updateSubCheckboxes('prepare') // Обновляем состояние суб-чекбоксов для "Подготовительные работы"
})

observer.observe(subCheckboxesContainerUser, {
    childList: true,
})

// Обработчик события click для кнопки "Раскрыть/Закрыть список"
toggleButtonUser.addEventListener('click', () => {
    if (subCheckboxesContainerUser.style.display === 'none') {
        subCheckboxesContainerUser.style.display = 'block'
        toggleButtonUser.textContent = 'Закрыть список'
    } else {
        subCheckboxesContainerUser.style.display = 'none'
        toggleButtonUser.textContent = 'Раскрыть список'
    }
})

toggleButtonUserSEO.addEventListener('click', () => {
    if (subCheckboxesContainerUserSEO.style.display === 'none') {
        subCheckboxesContainerUserSEO.style.display = 'block'
        toggleButtonUserSEO.textContent = 'Закрыть список'
    } else {
        subCheckboxesContainerUserSEO.style.display = 'none'
        toggleButtonUserSEO.textContent = 'Раскрыть список'
    }
})

toggleButtonUserStrategy.addEventListener('click', () => {
    if (subCheckboxesContainerUserStrategy.style.display === 'none') {
        subCheckboxesContainerUserStrategy.style.display = 'block'
        toggleButtonUserStrategy.textContent = 'Закрыть список'
    } else {
        subCheckboxesContainerUserStrategy.style.display = 'none'
        toggleButtonUserStrategy.textContent = 'Раскрыть список'
    }
})
