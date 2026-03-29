import { StyleSheet } from "react-native-unistyles";
import { Colors } from "@/shared/constants/color";

export const locationPickerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 18,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textTertiary,
    marginTop: 4,
  },
  mapWrapper: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.surface,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 13,
    color: Colors.textTertiary,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    backgroundColor: Colors.background,
  },
  addressCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  addressLabel: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  addressText: {
    marginTop: 6,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  confirmBtn: {
    marginTop: 12,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "700" as const,
    fontSize: 14,
  },
});
