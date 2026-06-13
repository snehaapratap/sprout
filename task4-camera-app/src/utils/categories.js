export const CATEGORIES = {
  flowers: {
    title: 'Flowers',
    emoji: '🌸',
    icon: '🌺',
    color: '#FFB6C1',
    darkColor: '#FF69B4',
    matchTerms: [
      'flower', 'rose', 'daisy', 'sunflower', 'petal', 'blossom',
      'plant', 'garden', 'tulip', 'lily', 'bouquet', 'floral',
      'bloom', 'orchid', 'lavender', 'marigold', 'hibiscus',
    ],
    encouragement: [
      'Beautiful flower!',
      'What a pretty bloom!',
      'Nature is amazing!',
      'You have a great eye!',
      'Wonderful find!',
    ],
  },
  kitchen: {
    title: 'Kitchen Things',
    emoji: '🍳',
    icon: '🥄',
    color: '#87CEEB',
    darkColor: '#4682B4',
    matchTerms: [
      'cup', 'mug', 'plate', 'bowl', 'spoon', 'fork', 'knife',
      'pot', 'pan', 'kettle', 'bottle', 'glass', 'kitchen',
      'dish', 'utensil', 'cookware', 'tableware', 'container',
      'jar', 'pitcher', 'colander', 'spatula', 'ladle', 'whisk',
    ],
    encouragement: [
      'Found one!',
      'Great spotting!',
      'Kitchen explorer!',
      'You know your kitchen!',
      'Awesome find!',
    ],
  },
  round: {
    title: 'Round Things',
    emoji: '⭕',
    icon: '🔵',
    color: '#98FB98',
    darkColor: '#32CD32',
    matchTerms: [
      'ball', 'circle', 'wheel', 'clock', 'plate', 'coin',
      'orange', 'apple', 'globe', 'button', 'ring', 'sphere',
      'round', 'circular', 'disc', 'disk', 'tire', 'donut',
      'cookie', 'pizza', 'frisbee', 'balloon',
    ],
    encouragement: [
      'That IS round!',
      'Circles everywhere!',
      'Round and found!',
      'Shape detective!',
      'Great discovery!',
    ],
  },
};

export function checkCategoryMatch(visionResult, categoryKey) {
  const category = CATEGORIES[categoryKey];
  if (!category) return null;

  const allDetected = [
    ...visionResult.labels.map((l) => l.name.toLowerCase()),
    ...visionResult.objects.map((o) => o.name.toLowerCase()),
  ];

  for (const term of category.matchTerms) {
    const match = allDetected.find((d) => d.includes(term) || term.includes(d));
    if (match) {
      return {
        label: match.charAt(0).toUpperCase() + match.slice(1),
        encouragement:
          category.encouragement[
            Math.floor(Math.random() * category.encouragement.length)
          ],
      };
    }
  }
  return null;
}
