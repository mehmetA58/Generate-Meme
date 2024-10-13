chrome.runtime.sendMessage({
    action: "analyzeContent",
    content: document.body.innerText
  }, response => {
    if (response.meme) {
      showMeme(response.meme);
    }
  });
  
  function showMeme(memeUrl) {
    const memeContainer = document.createElement('div');
    memeContainer.style.position = 'fixed';
    memeContainer.style.bottom = '20px';
    memeContainer.style.right = '20px';
    memeContainer.style.zIndex = '9999';
  
    const memeImage = document.createElement('img');
    memeImage.src = memeUrl;
    memeImage.style.maxWidth = '200px';
    memeImage.style.border = '2px solid #333';
    memeImage.style.borderRadius = '5px';
  
    memeContainer.appendChild(memeImage);
    document.body.appendChild(memeContainer);
  }