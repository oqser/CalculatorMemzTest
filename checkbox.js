const adminSwitch = document.getElementById('admin-switch')
const userContent = document.getElementById('user')
const adminContent = document.getElementById('admin')
const groupCheckbox = document.getElementById('group-prepare')
const toggleButtonUser = document.querySelector('#user .toggle-button')
const subCheckboxesContainerUser = document.querySelector(
  '#user .sub-checkboxes'
)
const subCheckboxesContainerAdmin = document.querySelector(
  '#admin .sub-checkboxes'
)

adminSwitch.addEventListener('change', () => {
  if (adminSwitch.checked) {
    userContent.style.display = 'none'
    adminContent.style.display = 'block'
  } else {
    userContent.style.display = 'block'
    adminContent.style.display = 'none'
  }
})

const observer = new MutationObserver((mutations) => {
  updateSubCheckboxes()
})

observer.observe(subCheckboxesContainerUser, {
  childList: true,
})

toggleButtonUser.addEventListener('click', () => {
  if (subCheckboxesContainerUser.style.display === 'none') {
    subCheckboxesContainerUser.style.display = 'block'
    toggleButtonUser.textContent = 'Закрыть список'
  } else {
    subCheckboxesContainerUser.style.display = 'none'
    toggleButtonUser.textContent = 'Раскрыть список'
  }
})

function updateSubCheckboxes() {
  const subCheckboxes = document.querySelectorAll(
    '#user .sub-checkboxes input[type="checkbox"]'
  )

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

  const allChecked = Array.from(subCheckboxes).every((cb) => cb.checked)
  groupCheckbox.checked = allChecked
}

updateSubCheckboxes()

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-button')
  const inputField = document.getElementById('input-field')
  const subCheckboxesUser = document.querySelector('#user .sub-checkboxes')
  const subCheckboxesAdmin = document.querySelector('#admin .sub-checkboxes')

  function loadSubElements() {
    const subElementsData = JSON.parse(
      localStorage.getItem('subElements') || '[]'
    )
    subElementsData.forEach((element) => {
      createSubElement(element.label, element.id, subCheckboxesAdmin)
    })

    // Добавьте обработчик кликов к кнопкам "Удалить" после того, как элементы будут загружены:
    subCheckboxesAdmin.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-button')) {
        const id = event.target.dataset.id
        // Удаляем сабэлемент из блока "admin"
        event.target.parentNode.remove()
        // Обновляем localStorage
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
        const userLabel = subCheckboxesUser.querySelector(
          `label[id="prepare-${id}"]`
        )
        if (userLabel && userLabel.parentNode) {
          userLabel.parentNode.remove()
        }

        updateSubCheckboxes()
      }
    })
  }

  function createSubElement(label, id, container) {
    const divUser = document.createElement('div')
    divUser.innerHTML = `<input type="checkbox" id="prepare-${id}" name="prepare" value="${label}"><label for="prepare-${id}">${label}</label>`
    subCheckboxesUser.appendChild(divUser)

    const divAdmin = document.createElement('div')
    divAdmin.innerHTML = `<label id="prepare-${id}">${label}</label>
    <button class="delete-button" data-id="${id}">Удалить</button>`
    container.appendChild(divAdmin)
  }

  function updateLocalStorage(subElementsData) {
    localStorage.setItem('subElements', JSON.stringify(subElementsData))
  }

  addButton.addEventListener('click', () => {
    const inputValue = inputField.value

    if (inputValue.trim() !== '') {
      const newId = Date.now()
      createSubElement(inputValue, newId, subCheckboxesAdmin)
      const subElementsData = JSON.parse(
        localStorage.getItem('subElements') || '[]'
      )
      subElementsData.push({ label: inputValue, id: newId })
      updateLocalStorage(subElementsData)
      inputField.value = ''
    }
  })

  loadSubElements()
})
