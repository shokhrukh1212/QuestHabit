/**
 * RPGDialogueBox — Dark semi-transparent box with thin purple pixel border.
 * Supports optional character-by-character typing animation.
 */

import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

interface RPGDialogueBoxProps {
  text: string;
  /** Enable character-by-character reveal animation */
  typing?: boolean;
  /** Milliseconds between each character (default 30) */
  typingSpeed?: number;
  /** Called when typing animation finishes */
  onTypingComplete?: () => void;
}

export function RPGDialogueBox({
  text,
  typing = false,
  typingSpeed = 30,
  onTypingComplete,
}: RPGDialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState(typing ? "" : text);
  const charIndex = useRef(0);

  useEffect(() => {
    if (!typing) {
      setDisplayedText(text);
      return;
    }

    // Reset when text changes
    charIndex.current = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      charIndex.current += 1;
      if (charIndex.current >= text.length) {
        setDisplayedText(text);
        clearInterval(interval);
        onTypingComplete?.();
      } else {
        setDisplayedText(text.slice(0, charIndex.current));
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [text, typing, typingSpeed, onTypingComplete]);

  return (
    <View
      style={{
        backgroundColor: "rgba(13, 13, 26, 0.85)",
        borderWidth: 1.5,
        borderColor: "#6C5CE7",
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginHorizontal: 16,
      }}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 16,
          lineHeight: 24,
          fontWeight: "400",
        }}
      >
        {displayedText}
        {typing && displayedText.length < text.length && (
          <Text style={{ color: "#6C5CE7" }}>▌</Text>
        )}
      </Text>
    </View>
  );
}
