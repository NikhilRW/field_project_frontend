import { StyleSheet } from "react-native-unistyles";

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A4F7A",
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrap: {
    alignItems: "center",
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  appName: {
    fontSize: 26,
    fontWeight: "700" as const,
    color: "#fff",
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  orgFull: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "500" as const,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    fontWeight: "400" as const,
  },
  bottomSection: {
    position: "absolute",
    bottom: 60,
    alignItems: "center",
    gap: 12,
  },
  loaderTrack: {
    width: 80,
    height: 2,
    borderRadius: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  loaderBar: {
    height: 2,
    borderRadius: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  version: {
    fontSize: 11,
    color: "rgba(255,255,255,0.25)",
    fontWeight: "500" as const,
  },
});
