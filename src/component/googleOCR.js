import axios from 'axios';

const apiUrl = 'https://vision.googleapis.com/v1/images:annotate';

export const detectHandwrittenText = async (imageBase64) => {
  try {
    const response = await axios.post(apiUrl, {
      requests: [
        {
          features: [
            {
              "maxResults": 50,
              "model": "builtin/latest",
              "type": "DOCUMENT_TEXT_DETECTION"
            },
          ],
          image: {
            content: imageBase64.split(',')[1],
          },
        },
      ],
    }, {
      params: {
        key: 'AIzaSyDa_TqGV3-6nCcThA0Ul3LGmLucQVbNOgk',
      },
    });

    // Handle the API response
    console.log(response.data);
  } catch (error) {
    console.error('Error calling Vision API:', error.message);
  }
};