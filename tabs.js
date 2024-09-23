const tabs = document.querySelectorAll('input[name="tab"]')
const calculatorContent = document.getElementById('calculator')
const checkboxesContent = document.getElementById('checkboxes')

tabs.forEach((tab) => {
  tab.addEventListener('change', () => {
    if (tab.id === 'calculator') {
      calculatorContent.style.visibility = 'visible'
      checkboxesContent.style.visibility = 'hidden'
    } else if (tab.id === 'checkboxes') {
      calculatorContent.style.visibility = 'hidden'
      checkboxesContent.style.visibility = 'visible'

      fetch('chckbox.html')
        .then((response) => response.text())
        .then((html) => {
          checkboxesContent.innerHTML = html
        })
        .catch((error) => {
          console.error('Ошибка загрузки checkbox.html:', error)
        })
    }
  })
})
