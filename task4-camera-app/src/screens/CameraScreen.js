import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import StarProgress from '../components/StarProgress';
import { CATEGORIES } from '../utils/categories';
import { identifyImage } from '../services/visionApi';
import { checkCategoryMatch } from '../utils/categories';

export default function CameraScreen({
  category,
  foundItems,
  onResult,
  onBack,
}) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef(null);
  const cat = CATEGORIES[category];

  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={cat.darkColor} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Text style={styles.permissionEmoji}>📷</Text>
        <Text style={styles.permissionTitle}>Camera Needed!</Text>
        <Text style={styles.permissionText}>
          We need your camera to explore and find {cat.title.toLowerCase()}!
        </Text>
        <TouchableOpacity
          style={[styles.permissionBtn, { backgroundColor: cat.darkColor }]}
          onPress={requestPermission}
        >
          <Text style={styles.permissionBtnText}>Turn On Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backLink} onPress={onBack}>
          <Text style={styles.backLinkText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleCapture = async () => {
    if (isCapturing || !cameraRef.current) return;
    setIsCapturing(true);

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.5,
        exif: false,
      });

      const visionResult = await identifyImage(photo.base64, category);
      const match = checkCategoryMatch(visionResult, category);

      onResult({
        photo: photo.uri,
        match,
        labels: visionResult.labels,
      });
    } catch (error) {
      console.error('Capture error:', error);
      setIsCapturing(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
      >
        <SafeAreaView style={styles.overlay}>
          {/* Top bar */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
              <Text style={styles.backBtnText}>← Back</Text>
            </TouchableOpacity>
            <StarProgress found={foundItems.length} total={5} />
          </View>

          {/* Hint */}
          <View style={styles.hintContainer}>
            <Text style={styles.hintIcon}>{cat.icon}</Text>
            <Text style={styles.hintText}>
              Find a {cat.title.toLowerCase().replace('things', 'thing')}!
            </Text>
          </View>

          {/* Capture button */}
          <View style={styles.bottomBar}>
            {isCapturing ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingEmoji}>🔍</Text>
                <Text style={styles.loadingText}>Looking closely...</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.captureBtn}
                onPress={handleCapture}
                activeOpacity={0.7}
              >
                <View style={styles.captureBtnInner} />
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8FF',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  backBtn: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  backBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  hintContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: 'row',
    gap: 8,
  },
  hintIcon: {
    fontSize: 24,
  },
  hintText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  bottomBar: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  captureBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  captureBtnInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF4444',
  },
  loadingContainer: {
    alignItems: 'center',
    gap: 8,
  },
  loadingEmoji: {
    fontSize: 40,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8FF',
    padding: 30,
  },
  permissionEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  permissionTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#2E4057',
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
  },
  permissionBtn: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
  },
  permissionBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
  },
  backLink: {
    marginTop: 20,
    padding: 10,
  },
  backLinkText: {
    color: '#999',
    fontSize: 16,
  },
});
