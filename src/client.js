const encryptBtn = document.querySelector('#encrypt-btn')
const decryptBtn = document.querySelector('#decrypt-btn')
const encryptedMessageEle = document.querySelector('#encrypted-message')
const decryptedMessageEle = document.querySelector('#decrypted-message')
const encryptedOutputEle = document.querySelector('#encrypted-output')
const decryptedOutputEle = document.querySelector('#decrypted-output')
const infoEle = document.querySelector('#info')
const vibrateStrength = 25
encryptBtn.addEventListener('click', () => {
  navigator.vibrate(vibrateStrength)
  let data = prompt('Enter message')
  if (!data || data == '') return
  let password = prompt('Enter password')
  if (data && password) {
    let encryptedData = encrypt(data, password)
    encryptedMessageEle.innerHTML = encryptedData
    encryptedOutputEle.style.display = 'flex'
    navigator.vibrate(vibrateStrength)
    infoEle.style.display = 'none'
  }
})
decryptBtn.addEventListener('click', () => {
  navigator.vibrate(25)
  let data = prompt('Enter Encryped message')
  if (!data || data == '') return
  let password = prompt('Enter password')
  if (data && password) {
    let decryptedData = decrypt(data, password)
    if (decryptedData.success) {
      decryptedMessageEle.innerHTML = decryptedData.data
      decryptedOutputEle.style.display = 'flex'
      infoEle.style.display = 'none'
    } else {
      alert('password incorrect')
    }
    navigator.vibrate(vibrateStrength)
  }
})
function copyText(ele) {
  try {
    if (ele == 'encrypted') {
      encryptedMessageEle.focus()
      encryptedMessageEle.select()
    } else {
      decryptedMessageEle.focus()
      decryptedMessageEle.select()
    }
    document.execCommand('copy')
    navigator.vibrate(vibrateStrength)
    alert('Copied')
  } catch {
    alert('error')
  }
}
