// Toggle this to true if you don't have a Google Cloud Vision API key
const USE_MOCK = true;

// Replace with your Google Cloud Vision API key for real recognition
const API_KEY = 'YOUR_GOOGLE_CLOUD_VISION_API_KEY';
const VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

// Mock labels for demo purposes when no API key is available
const MOCK_LABELS = {
  flowers: [
    'flower', 'plant', 'petal', 'rose', 'garden', 'blossom',
    'bloom', 'daisy', 'sunflower', 'tulip',
  ],
  kitchen: [
    'cup', 'bowl', 'plate', 'spoon', 'bottle', 'kitchen',
    'mug', 'glass', 'pot', 'container',
  ],
  round: [
    'ball', 'circle', 'wheel', 'clock', 'orange', 'apple',
    'button', 'coin', 'sphere', 'round',
  ],
};

async function mockIdentify(categoryKey) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const labels = MOCK_LABELS[categoryKey] || MOCK_LABELS.flowers;
  // Pick 3-5 random labels to simulate real API response
  const count = 3 + Math.floor(Math.random() * 3);
  const shuffled = [...labels].sort(() => Math.random() - 0.5).slice(0, count);

  return {
    labels: shuffled.map((name) => ({
      name,
      score: 0.7 + Math.random() * 0.3,
    })),
    objects: [
      {
        name: shuffled[0],
        score: 0.8 + Math.random() * 0.2,
      },
    ],
  };
}

async function realIdentify(base64Image) {
  const response = await fetch(VISION_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: [
        {
          image: { content: base64Image },
          features: [
            { type: 'LABEL_DETECTION', maxResults: 10 },
            { type: 'OBJECT_LOCALIZATION', maxResults: 5 },
          ],
        },
      ],
    }),
  });

  const data = await response.json();
  const result = data.responses?.[0] || {};
  const labels = result.labelAnnotations || [];
  const objects = result.localizedObjectAnnotations || [];

  return {
    labels: labels.map((l) => ({
      name: l.description.toLowerCase(),
      score: l.score,
    })),
    objects: objects.map((o) => ({
      name: o.name.toLowerCase(),
      score: o.score,
    })),
  };
}

export async function identifyImage(base64Image, categoryKey) {
  if (USE_MOCK) {
    return mockIdentify(categoryKey);
  }
  return realIdentify(base64Image);
}
