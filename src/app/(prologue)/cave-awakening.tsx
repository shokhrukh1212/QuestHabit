/**
 * P.1 — Cave Awakening
 * Design ref: designs/Cave Awakening.png
 *
 * Full-screen cave scene with gradient overlay.
 * RPG dialogue box layered on top. "Tap to stand up" button with pulse.
 * ZERO app chrome.
 */

import { useCallback, useState } from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { router } from "expo-router";

import { RPGDialogueBox } from "@/components/ui/RPGDialogueBox";
import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { StoneButton } from "@/components/ui/StoneButton";
import { sceneImages } from "@/lib/assets";
import { usePrologueStore } from "@/stores/prologue-store";

const DIALOGUE_TEXT =
  "You wake up in a dark cave. Cold stone beneath you. You don't remember how you got here.";

export default function CaveAwakening() {
  const setStep = usePrologueStore((s) => s.setStep);
  const [typingDone, setTypingDone] = useState(false);

  const handleStandUp = useCallback(() => {
    setStep("character_mirror");
    router.push("/(prologue)/character-mirror");
  }, [setStep]);

  return (
    <ScreenWrapper bgColor="#000000" fullScreen>
      <View style={{ flex: 1 }}>
        {/* Full-screen scene image with subtle breathing */}
        <MotiView
          from={{ scale: 1.0, opacity: 0.8 }}
          animate={{ scale: 1.02, opacity: 1 }}
          transition={{
            type: "timing",
            duration: 3000,
            loop: true,
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Image
            source={sceneImages.caveAwakening}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
        </MotiView>

        {/* Gradient overlay — mostly transparent, dark only near bottom for text readability */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}
          locations={[0.5, 0.7, 0.9]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        {/* UI overlay — dialogue + button at bottom */}
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            paddingBottom: 60,
            paddingHorizontal: 16,
          }}
        >
          {/* Dialogue box */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 800, delay: 500 }}
            style={{ marginBottom: 24 }}
          >
            <RPGDialogueBox
              text={DIALOGUE_TEXT}
              typing
              typingSpeed={35}
              onTypingComplete={() => setTypingDone(true)}
            />
          </MotiView>

          {/* CTA button — appears after typing completes */}
          {typingDone && (
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 500 }}
              style={{ paddingHorizontal: 32 }}
            >
              <StoneButton
                label="Tap to stand up"
                onPress={handleStandUp}
                pulse
              />
            </MotiView>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
