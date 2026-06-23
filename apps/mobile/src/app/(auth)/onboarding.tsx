import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Pressable,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import Button from '@/components/ui/button';
import { onboardingSlides, OnboardingSlide } from '@/data/onboarding';
import { useOnboardingStore } from '@/store/useOnboardingStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const completeOnboarding = useOnboardingStore((state) => state.completeOnboarding);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingSlide>>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    completeOnboarding();
    router.replace('/(auth)/signup' as any);
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => {
    return (
      <View style={styles.slideContainer}>
        {/* Full-width Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={styles.slideImage}
            contentFit="cover"
            transition={300}
          />
        </View>

        {/* Text Section (Left-aligned details matching reference image) */}
        <View style={styles.textContainer}>
          <Text 
            className="font-display text-4xl font-extrabold text-primary tracking-tight"
            style={styles.slideTitle}
          >
            {item.title}
          </Text>
          <Text className="font-body text-base text-on-surface-variant/80 mt-3 leading-6">
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  const isLastSlide = currentIndex === onboardingSlides.length - 1;

  return (
    <View style={styles.container} className="bg-background">
      {/* Absolute positioned Skip Button at top right (Premium UI touch) */}
      {!isLastSlide && (
        <View style={[styles.skipContainer, { top: insets.top + 12 }]}>
          <Pressable 
            onPress={handleFinish}
            style={({ pressed }) => [styles.skipBtn, pressed && styles.pressed]}
          >
            <Text className="font-body text-sm font-bold text-primary/75">
              Skip
            </Text>
          </Pressable>
        </View>
      )}

      {/* Main FlatList for Slides */}
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.flatList}
      />

      {/* Footer controls */}
      <View style={[styles.footerContainer, { paddingBottom: insets.bottom + 20 }]}>
        {/* Pagination Dots */}
        <View style={styles.paginationRow}>
          {onboardingSlides.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <View
                key={index}
                style={[
                  styles.dot,
                  isActive 
                    ? [styles.activeDot, { backgroundColor: '#1d4626' }] 
                    : styles.inactiveDot
                ]}
              />
            );
          })}
        </View>

        {/* CTA Button - Pill shaped styled with Hunter Green theme background */}
        <View style={styles.buttonWrapper}>
          <Button
            title={isLastSlide ? "Get Started" : "Continue"}
            onPress={handleNext}
            hideChevron={true}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1fcf5', // Hunter Green light background theme
  },
  skipContainer: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
  },
  skipBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#ffffffaa',
    borderWidth: 1,
    borderColor: '#1d462615',
  },
  pressed: {
    opacity: 0.6,
  },
  flatList: {
    flex: 1,
  },
  slideContainer: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.56,
    overflow: 'hidden',
    borderBottomLeftRadius: 32, // Soft rounded borders for visual premium touch
    borderBottomRightRadius: 32,
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    paddingHorizontal: 24,
    marginTop: 28,
  },
  slideTitle: {
    lineHeight: 44,
    color: '#1d4626', // Hunter green
  },
  footerContainer: {
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // aligned left
    alignSelf: 'flex-start', // matches left text layout
    paddingHorizontal: 4,
    height: 10,
    marginBottom: 28,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    width: 22,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#dae5df', // neutral dim gray
  },
  buttonWrapper: {
    width: '100%',
  },
});
