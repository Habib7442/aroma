import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Pressable,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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
      <View className="flex-1 justify-start" style={{ width: SCREEN_WIDTH }}>
        {/* Full-width Image Section */}
        <View className="overflow-hidden rounded-b-[32px]" style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.56 }}>
          <Image
            source={item.image}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            transition={300}
          />
        </View>

        {/* Text Section (Left-aligned details matching reference image) */}
        <View className="px-6 mt-7">
          <Text 
            className="font-rubik-bold text-4xl text-primary tracking-tight"
            style={{ lineHeight: 44, fontStyle: 'normal' }}
          >
            {item.title}
          </Text>
          <Text 
            className="font-rubik-regular text-base text-on-surface-variant/80 mt-3"
            style={{ lineHeight: 24, fontStyle: 'normal' }}
          >
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  const isLastSlide = currentIndex === onboardingSlides.length - 1;

  return (
    <View style={{ flex: 1, backgroundColor: '#f1fcf5' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1d4626" />
      
      {/* Top notch / Status Bar Safe Area Block in Dark Hunter Green */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#1d4626' }} />

      {/* Main Content Area */}
      <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor: '#f1fcf5' }}>
        {/* Absolute positioned Skip Button overlayed on top of the image */}
        {!isLastSlide && (
          <View className="absolute top-4 right-5 z-10">
            <Pressable 
              onPress={handleFinish}
              style={({ pressed }) => ({
                paddingVertical: 6,
                paddingHorizontal: 16,
                borderRadius: 20,
                backgroundColor: '#ffffffaa',
                borderWidth: 1,
                borderColor: '#1d462615',
                opacity: pressed ? 0.6 : 1,
              })}
            >
              <Text className="font-rubik-bold text-sm text-primary/75" style={{ fontStyle: 'normal' }}>
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
          style={{ flex: 1 }}
        />

        {/* Footer controls */}
        <View className="px-6 w-full items-center bg-transparent pb-5">
          {/* Pagination Dots */}
          <View className="flex-row justify-start self-start px-1 h-2.5 mb-7">
            {onboardingSlides.map((_, index) => {
              const isActive = index === currentIndex;
              return (
                <View
                  key={index}
                  className="h-2 rounded-full mx-[3px]"
                  style={{
                    width: isActive ? 22 : 8,
                    backgroundColor: isActive ? '#1d4626' : '#dae5df',
                  }}
                />
              );
            })}
          </View>

          {/* CTA Button - Rounded rectangle matching primary style */}
          <View className="w-full">
            <Button
              title={isLastSlide ? "Get Started" : "Continue"}
              onPress={handleNext}
              hideChevron={true}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
