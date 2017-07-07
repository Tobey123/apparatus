'use strict'

const searchAttribute = require('./core/searchAttribute.js')
const printChat = require('./core/printChat.js')

module.exports = function console (cy, selectedNode) {
  // help menu
  const helpMenu = `• help: for options
• meta + l: focus on console
• meta + z: restore node
• search for attributes`

  // loses the focus from the console when tapping
  cy.on('tap', 'node', selection => {
    consoleId.blur()
  })
  cy.on('tap', 'edge', selection => {
    consoleId.blur()
  })
  cy.on('tap', selection => {
    consoleId.blur()
  })

  const consoleId = document.getElementById('console-id')
  // console commands
  const commands = () => {
    const input = document.getElementById('console-id').value
    document.getElementById('console-id').value = ''
    switch (input) {
      case 'help' || 'options':
        printChat(helpMenu)
        break
      case '':
        break
      case 'clear':
        document.getElementById('info-nodes-id').textContent = ''
        break
      default:
        searchAttribute(cy, input)
    }
  }

  // keydown listeners
  document.addEventListener('keydown', event => {
    // focus on the consoleId
    if (event.metaKey === true && event.code === 'KeyL') {
      consoleId.focus()
    }
    // restore elements with meta + z
    // BUG only restores the last node
    if (event.metaKey === true && event.code === 'KeyZ') {
      selectedNode.out.restore()
    }
    // listens for the ENTER key when focus is on the console
    if (document.activeElement === consoleId && event.code === 'Enter') {
      commands()
    }
  })
}