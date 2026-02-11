/**
 * QuestWaypointNode — Single waypoint on the quest path.
 * States: locked (gray), active (pulsing purple), completed (green), missed (dim red).
 * Tappable when active to open the encounter modal.
 */

import { Pressable, Text, View } from "react-native";
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

  const bgColor = isCompleted
    ? "#2ECC71"
    : isActive
      ? "#6C5CE7"
      : isMissed
        ? "#E74C3C"
        : "#3A3A5E";

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
      style={{ alignItems: "center", width: 80, opacity }}
    >
      {/* Waypoint circle */}
      <MotiView
        animate={{
          scale: isActive ? 1.05 : 1,
          shadowOpacity: isActive ? 0.6 : 0,
        }}
        transition={{
          type: "timing",
          duration: 1000,
          loop: isActive,
        }}
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: isCompleted ? bgColor : "#1A1A2E",
          borderWidth: 2.5,
          borderColor,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: bgColor,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 10,
          elevation: isActive ? 6 : 0,
        }}
      >
        {isCompleted ? (
          <Text style={{ fontSize: 22, color: "#FFFFFF" }}>✓</Text>
        ) : (
          <Text style={{ fontSize: 24 }}>{narrative.icon}</Text>
        )}
      </MotiView>

      {/* Habit name */}
      <Text
        numberOfLines={2}
        style={{
          color: isCompleted ? "#2ECC71" : "#B0B0C0",
          fontSize: 11,
          textAlign: "center",
          marginTop: 6,
          lineHeight: 14,
        }}
      >
        {habit.name}
      </Text>
    </Pressable>
  );
}
