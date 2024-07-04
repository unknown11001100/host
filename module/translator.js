import Translator from './translator.js';

(function() {
  const scriptTag = document.currentScript;
  const apiKey = scriptTag.getAttribute('data-api-key');
  const userID = scriptTag.getAttribute('data-user-id');
  const ulcaApiKey = scriptTag.getAttribute('data-ulca-api-key');

  const translator = new Translator(apiKey, userID, ulcaApiKey);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'as', name: 'অসমীয়া' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'brx', name: 'बड़ो' },
    { code: 'doi', name: 'डोगरी' },
    { code: 'gom', name: 'गोंयची कोंकणी' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ks', name: 'कश्मीरी' },
    { code: 'mai', name: 'मैथिली' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'mni', name: 'মণিপুরি' },
    { code: 'mr', name: 'मराठी' },
    { code: 'ne', name: 'नेपाली' },
    { code: 'or', name: 'ଓଡ଼ିଆ' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' },
    { code: 'sa', name: 'संस्कृतम्' },
    { code: 'sat', name: 'ᱥᱟᱱᱛᱟᱲᱤ' },
    { code: 'sd', name: 'سنڌي' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ur', name: 'اردو' },
  ];

  // Create the container
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '10px';
  container.style.right = '10px';
  container.style.backgroundColor = 'white';
  container.style.border = '1px solid #ccc';
  container.style.padding = '10px';
  container.style.zIndex = '1000';

  // Create the from-language dropdown
  const fromSelect = document.createElement('select');
  fromSelect.id = 'from-language';
  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.name;
    fromSelect.appendChild(option);
  });
  container.appendChild(fromSelect);

  // Create the "to" text
  const toText = document.createElement('span');
  toText.textContent = ' to ';
  container.appendChild(toText);

  // Create the to-language dropdown
  const toSelect = document.createElement('select');
  toSelect.id = 'to-language';
  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.name;
    toSelect.appendChild(option);
  });
  toSelect.value = 'hi'; // Default to Hindi
  container.appendChild(toSelect);

  // Create the translate button
  const translateButton = document.createElement('button');
  translateButton.textContent = 'Translate Page';
  container.appendChild(translateButton);

  document.body.appendChild(container);

  translateButton.addEventListener('click', () => {
    const fromLanguage = fromSelect.value;
    const toLanguage = toSelect.value;
    translator.translatePage(fromLanguage, toLanguage);
  });
})();
