import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { Colors } from '@/shared/constants/color';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const loaderWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 9,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(loaderWidth, {
        toValue: 80,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setTimeout(() => {
        router.replace('/onboarding' as any);
      }, 200);
    });
  }, []);

  return (
    <View style={styles.container} testID="splash-screen">
      <Animated.View
        style={[
          styles.logoWrap,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <View style={styles.logoBox}>
          <Heart size={30} color="#fff" fill="#fff" />
        </View>
        <Text style={styles.appName}>Helping Hands</Text>
        <Text style={styles.orgFull}>Samajik Seva Sanstha</Text>
        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          Digital Empowerment for Social Good
        </Animated.Text>
      </Animated.View>

      <View style={styles.bottomSection}>
        <View style={styles.loaderTrack}>
          <Animated.View style={[styles.loaderBar, { width: loaderWidth }]} />
        </View>
        <Text style={styles.version}>v1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A4F7A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    alignItems: 'center',
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  appName: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: '#fff',
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  orgFull: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500' as const,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '400' as const,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
    gap: 12,
  },
  loaderTrack: {
    width: 80,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  loaderBar: {
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  version: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.25)',
    fontWeight: '500' as const,
  },
});
