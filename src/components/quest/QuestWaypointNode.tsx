/**
 * QuestWaypointNode — Single waypoint on the quest path.
 * States: locked (gray), active (pulsing purple), completed (green glow + check badge), missed (dim red).
 * Tappable when active to open the encounter modal.
 */

import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { MotiView } from "moti";

import { getNarrative } from "@/lib/narrative-text";
import type { QuestWaypoint } from "@/types/game";

interface QuestWaypointNodeProps {
  waypoint: QuestWaypoint;
  onPress: (waypoint: QuestWaypoint) => void;
}

export function QuestWaypointNode({
  waypoint,
  onPress,
}: QuestWaypointNodeProps) {
  const { habit, status } = waypoint;
  const narrative = getNarrative(habit.category);
  const isActive = status === "active";
  const isCompleted = status === "completed";
  const isMissed = status === "missed";
  const isLocked = status === "locked";

  const borderColor = isCompleted
    ? "#27AE60"
    : isActive
      ? "#8B7CF7"
      : isMissed
        ? "#C0392B"
        : "#2A2A4E";

  const opacity = isLocked ? 0.4 : 1;

  return (
    <Pressable
      onPress={() => isActive && onPress(waypoint)}
      disabled={!isActive}
      style={{ alignItems: "center", width: 90, opacity }}
    >
      {/* Waypoint circle — larger (72px) */}
      <View style={{ position: "relative" }}>
        <MotiView
          animate={{
            scale: isActive ? 1.05 : 1,
            shadowOpacity: isActive ? 0.6 : isCompleted ? 0.4 : 0,
          }}
          transition={{
            type: "timing",
            duration: 1000,
            loop: isActive,
          }}
          style={{
            width: 68,
            height: 68,
            borderRadius: 34,
            backgroundColor: "#1A1A2E",
            borderWidth: 2.5,
            borderColor,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: isCompleted ? "#2ECC71" : borderColor,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 10,
            elevation: isActive ? 6 : isCompleted ? 4 : 0,
          }}
        >
          {/* Always show the encounter icon */}
          <Image
            source={narrative.icon}
            style={{
              width: 36,
              height: 36,
              opacity: isCompleted ? 0.7 : 1,
            }}
            contentFit="contain"
          />
        </MotiView>

        {/* Green check badge — overlaid on completed waypoints */}
        {isCompleted && (
          <View
            style={{
              position: "absolute",
              bottom: -2,
              right: -2,
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: "#2ECC71",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderColor: "#1A1A2E",
            }}
          >
            <Text style={{ fontSize: 12, color: "#FFFFFF", fontWeight: "700" }}>
              ✓
            </Text>
          </View>
        )}
      </View>

      {/* Habit name */}
      <Text
        numberOfLines={2}
        style={{
          color: isCompleted ? "#2ECC71" : "#FFFFFF",
          fontSize: 11,
          textAlign: "center",
          marginTop: 6,
          lineHeight: 14,
          textShadowColor: "rgba(0, 0, 0, 0.8)",
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 3,
        }}
      >
        {habit.name}
      </Text>
    </Pressable>
  );
}
