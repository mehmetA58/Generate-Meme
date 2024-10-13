// API URL'si
const MEME_API_URL = 'https://api.imgflip.com/get_memes';

// DOM elementlerini seçme
const generateMemeButton = document.getElementById('generateMeme');
const memeResult = document.getElementById('memeResult');

// Event listener'ları ekleme
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
  generateMemeButton.addEventListener('click', generateRandomMeme);
}

async function generateRandomMeme() {
  try {
    const memeData = await fetchMemeData();
    const randomMeme = getRandomMeme(memeData);
    displayMeme(randomMeme.url);
  } catch (error) {
    handleError(error);
  }
}

async function fetchMemeData() {
  const response = await fetch(MEME_API_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  if (!data.success) {
    throw new Error('API yanıtı başarısız');
  }
  return data.data.memes;
}

function getRandomMeme(memes) {
  const randomIndex = Math.floor(Math.random() * memes.length);
  return memes[randomIndex];
}

function displayMeme(memeUrl) {
  memeResult.innerHTML = `
    <img src="${memeUrl}" alt="Rastgele Oluşturulan Mem">
    <button id="shareButton">Paylaş</button>
  `;
  
  const shareButton = document.getElementById('shareButton');
  if (shareButton) {
    shareButton.addEventListener('click', () => shareMeme(memeUrl));
  }
}

function shareMeme(memeUrl) {
  navigator.clipboard.writeText(memeUrl)
    .then(() => showMessage('Mem bağlantısı panoya kopyalandı!'))
    .catch(error => handleError(error, 'Panoya kopyalama başarısız oldu'));
}

function showMessage(message) {
  alert(message);
}

function handleError(error, customMessage = 'Bir hata oluştu') {
  console.error(`${customMessage}:`, error);
  memeResult.textContent = `${customMessage}. Lütfen tekrar deneyin.`;
}