import { Redirect } from "expo-router";

/**
 * Entry point — redirects to the main tab navigator.
 * Later this will check if the user has completed the Prologue
 * and redirect to (prologue) if not.
 */

export default function Index() {
  return <Redirect href="/(tabs)/quest-path" />;
}
