import Translator from './translator.js';

window.addEventListener('load', () => {
  const scriptTag = document.currentScript;
  const apiKey = scriptTag.getAttribute('data-api-key');
  const userID = scriptTag.getAttribute('data-user-id');
  const ulcaApiKey = scriptTag.getAttribute('data-ulca-api-key');
  const fromLanguage = scriptTag.getAttribute('data-from-language') || 'en';
  const toLanguage = scriptTag.getAttribute('data-to-language') || 'hi';

  const translator = new Translator(apiKey, userID, ulcaApiKey);

  const translateButton = document.createElement('button');
  translateButton.textContent = 'Translate Page';
  translateButton.style.position = 'fixed';
  translateButton.style.top = '10px';
  translateButton.style.right = '10px';
  translateButton.style.zIndex = '1000';
  document.body.appendChild(translateButton);

  translateButton.addEventListener('click', () => {
    translator.translatePage(fromLanguage, toLanguage);
  });
});
