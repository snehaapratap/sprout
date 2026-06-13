# Sprout — Evaluation Tasks

A children's learning app for ages 3–8. This repository contains all 4 evaluation tasks.

## Task 1: 5-Minute Engagement Loop (25 pts)
**Location:** `task1-engagement-loop/engagement-loop.md`

Designed an "Animal Drawing Adventure with Brushy" — a guided drawing activity where a friendly animated paintbrush character leads a 3-year-old through drawing an animal step by step. Includes detailed minute-by-minute breakdown and UI sketches.

## Task 2: Mini Interactive Screen (25 pts)
**Location:** `task2-interactive-screen/index.html`

**Bubble Pop Farm** — a single-file HTML/CSS/JS app where children tap floating bubbles to discover hidden farm animals. Features:
- 6 animal bubbles with floating animations
- Tap-to-pop with sparkle effects
- Synthesized animal sounds (Web Audio API, no external files)
- Progress tracking with paw print indicators
- Celebration with confetti when all animals found
- Fully responsive and touch-optimized

**Live demo:** Open `task2-interactive-screen/index.html` in any browser, or deploy to GitHub Pages.

## Task 3: Drop-Off Diagnosis (20 pts)
**Location:** `task3-dropoff-diagnosis/dropoff-diagnosis.md`

Structured analysis of the "kids leave after 2 minutes" problem — investigation steps, hypotheses to test, and measurable success criteria. Under 200 words.

## Task 4: Camera-Based Learning App (30 pts)
**Location:** `task4-camera-app/`

**Nature Explorer — Find 5 Things!** — a React Native (Expo) scavenger hunt app. Children:
1. Pick a category (Flowers, Kitchen Things, Round Things)
2. Use their device camera to photograph matching items
3. App identifies the item and awards a star
4. Collect 5 stars to earn a victory badge

### Running Task 4
```bash
cd task4-camera-app
npx expo start
```
Scan the QR code with Expo Go (iOS/Android) to run on your device.

### Image Recognition
The app supports Google Cloud Vision API for real image recognition. Currently set to **mock mode** for easy demo without an API key. To enable real recognition:
1. Get a Google Cloud Vision API key
2. Edit `src/services/visionApi.js`
3. Set `USE_MOCK = false` and replace `YOUR_GOOGLE_CLOUD_VISION_API_KEY`

## Tech Stack
- **Task 2:** HTML5, CSS3, Web Audio API
- **Task 4:** React Native, Expo SDK 56, expo-camera, expo-haptics
