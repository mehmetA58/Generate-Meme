chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "analyzeContent") {
      analyzePageContent(request.content)
        .then(meme => sendResponse({meme: meme}))
        .catch(error => sendResponse({error: error.message}));
      return true;  // Asenkron yanıt için gerekli
    }
  });
  
  async function analyzePageContent(content) {
    // Burada içerik analizi yapılabilir
    // Şimdilik basit bir örnek:
    const keywords = content.split(' ').filter(word => word.length > 5);
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    
    try {
      const response = await fetch(`https://api.imgflip.com/get_memes`);
      const data = await response.json();
      if (data.success) {
        const memes = data.data.memes;
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        return randomMeme.url;
      } else {
        throw new Error('API yanıtı başarısız');
      }
    } catch (error) {
      console.error('Mem oluşturulurken hata oluştu:', error);
      throw error;
    }
  }