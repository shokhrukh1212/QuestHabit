import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

/**
 * Tab navigator layout — the main navigation structure.
 *
 * 5 tabs: Quest Path, Character, World Map, Party, Settings.
 * Uses RPG-themed styling: dark background, gold active color.
 */

type IoniconsName = ComponentProps<typeof Ionicons>["name"];

interface TabConfig {
  name: string;
  title: string;
  icon: IoniconsName;
  activeIcon: IoniconsName;
}

const tabs: TabConfig[] = [
  {
    name: "quest-path",
    title: "Quest",
    icon: "map-outline",
    activeIcon: "map",
  },
  {
    name: "character",
    title: "Hero",
    icon: "person-outline",
    activeIcon: "person",
  },
  {
    name: "world-map",
    title: "World",
    icon: "globe-outline",
    activeIcon: "globe",
  },
  {
    name: "party",
    title: "Party",
    icon: "people-outline",
    activeIcon: "people",
  },
  {
    name: "settings",
    title: "Settings",
    icon: "settings-outline",
    activeIcon: "settings",
  },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1A1A2E",
          borderTopColor: "#252542",
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 25,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#F4A261",
        tabBarInactiveTintColor: "#7F8C8D",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? tab.activeIcon : tab.icon}
                size={size}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
