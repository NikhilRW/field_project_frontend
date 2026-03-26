import { useEffect } from "react";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface UseSplashAnimationOptions {
  onComplete?: () => void;
}

export const useSplashAnimation = (options: UseSplashAnimationOptions = {}) => {
  const { onComplete } = options;
  const logoOpacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);
  const loaderWidth = useSharedValue(0);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
  }));

  const taglineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  const loaderAnimatedStyle = useAnimatedStyle(() => ({
    width: loaderWidth.value,
  }));

  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 500 }, (finished) => {
      if (finished) {
        taglineOpacity.value = withTiming(1, { duration: 400 }, (tagDone) => {
          if (tagDone) {
            loaderWidth.value = withTiming(
              80,
              { duration: 1000 },
              (loadDone) => {
                if (loadDone && onComplete) {
                  runOnJS(onComplete)();
                }
              },
            );
          }
        });
      }
    });
  }, [logoOpacity, taglineOpacity, loaderWidth, onComplete]);

  return {
    logoOpacity,
    taglineOpacity,
    loaderWidth,
    logoAnimatedStyle,
    taglineAnimatedStyle,
    loaderAnimatedStyle,
  };
};
