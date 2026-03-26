import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Users, Calendar, HandHeart, ArrowRight } from 'lucide-react-native';
import { Colors } from '@/shared/constants/color';

const { width } = Dimensions.get('window');

interface Slide {
  id: number;
  icon: React.ReactNode;
  accentColor: string;
  bgTint: string;
  title: string;
  body: string;
}

const slides: Slide[] = [
  {
    id: 1,
    icon: <Users size={44} color="#0D5C91" strokeWidth={1.4} />,
    accentColor: '#0D5C91',
    bgTint: '#E8F1F8',
    title: 'Track Every\nBeneficiary',
    body: 'Manage complete profiles — health status, service history, and needs, all in one place.',
  },
  {
    id: 2,
    icon: <Calendar size={44} color="#1D9E54" strokeWidth={1.4} />,
    accentColor: '#1D9E54',
    bgTint: '#E4F5EC',
    title: 'Monitor All\nActivities',
    body: 'Schedule, assign, and track every mission from study kit drives to health camps.',
  },
  {
    id: 3,
    icon: <HandHeart size={44} color="#E8880C" strokeWidth={1.4} />,
    accentColor: '#E8880C',
    bgTint: '#FDF3E3',
    title: 'Build Donor\nTrust',
    body: 'Transparent tracking and impact reporting that keeps every donor confident.',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateToSlide = (nextIndex: number) => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -20, duration: 180, useNativeDriver: true }),
    ]).start(() => {
      setCurrentIndex(nextIndex);
      slideAnim.setValue(20);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]).start();
    });
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      animateToSlide(currentIndex + 1);
    } else {
      router.replace('/login' as any);
    }
  };

  const handleSkip = () => {
    router.replace('/login' as any);
  };

  const slide = slides[currentIndex];

  return (
    <View style={styles.container} testID="onboarding-screen">
      <View style={styles.topBar}>
        <Text style={styles.stepText}>{currentIndex + 1} of {slides.length}</Text>
        <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.illustrationArea,
          { backgroundColor: slide.bgTint },
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.iconCircle}>
          {slide.icon}
        </View>
      </Animated.View>

      <View style={styles.contentArea}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.body}>{slide.body}</Text>
        </Animated.View>

        <View style={styles.bottomArea}>
          <View style={styles.dotsRow}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === currentIndex && [styles.dotActive, { backgroundColor: slide.accentColor }],
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.nextBtn, { backgroundColor: slide.accentColor }]}
            onPress={handleNext}
            activeOpacity={0.8}
            testID="next-btn"
          >
            <Text style={styles.nextBtnText}>
              {currentIndex === slides.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
            <ArrowRight size={16} color="#fff" strokeWidth={2.2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
  },
  stepText: {
    fontSize: 13,
    color: Colors.textTertiary,
    fontWeight: '500' as const,
  },
  skipBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skipText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
  },
  illustrationArea: {
    height: '38%',
    marginHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 32,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: 34,
    marginBottom: 12,
  },
  body: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  bottomArea: {
    paddingBottom: 48,
    gap: 22,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.border,
  },
  dotActive: {
    width: 20,
    borderRadius: 3,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    height: 50,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600' as const,
  },
});
