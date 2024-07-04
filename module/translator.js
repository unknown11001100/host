export default class Translator {
    constructor(apiKey, userID, ulcaApiKey) {
      this.apiKey = apiKey;
      this.userID = userID;
      this.ulcaApiKey = ulcaApiKey;
    }
  
    async translateText(text, fromLanguage, toLanguage) {
      try {
        const response = await fetch("https://dhruva-api.bhashini.gov.in/services/inference/pipeline", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.apiKey,
            "userID": this.userID,
            "ulcaApiKey": this.ulcaApiKey
          },
          body: JSON.stringify({
            "pipelineTasks": [{
              "taskType": "tts",
              "config": {
                "language": {
                  "sourceLanguage": fromLanguage,
                  "targetLanguage": toLanguage
                },
                "serviceId": "ai4bharat/indictrans-v2-all-gpu--t4"
              }
            }],
            "inputData": {
              "input": [{
                "source": text
              }]
            }
          })
        });
  
        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status);
        }
  
        const data = await response.json();
        return data.pipelineResponse[0].output[0].target;
      } catch (error) {
        console.error('Error:', error.message);
        throw error;
      }
    }
  
    async translatePage(fromLanguage, toLanguage) {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
  
      let currentNode;
      while ((currentNode = walker.nextNode())) {
        const originalText = currentNode.nodeValue.trim();
        if (originalText) {
          try {
            const translatedText = await this.translateText(originalText, fromLanguage, toLanguage);
            currentNode.nodeValue = translatedText;
          } catch (error) {
            console.error('Error translating text:', error.message);
          }
        }
      }
      console.log("Translation done");
    }
  }
  