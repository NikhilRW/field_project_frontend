import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import MapView, {
  Marker,
  type Region,
  type MapPressEvent,
} from "react-native-maps";
import * as Location from "expo-location";
import { router } from "expo-router";
import { showMessage } from "react-native-flash-message";
import { locationPickerStyles as styles } from "../styles/locationPickerStyles";
import { useActivityDraftStore } from "../hooks/useActivityDraftStore";
import { Colors } from "@/shared/constants/color";

type Coordinates = {
  latitude: number;
  longitude: number;
};

const formatAddress = (
  result: Location.LocationGeocodedAddress | undefined,
) => {
  if (!result) return "";
  const parts = [
    result.name,
    result.street,
    result.city,
    result.region,
    result.postalCode,
  ].filter(Boolean);
  return parts.join(", ");
};

const formatCoords = (coords: Coordinates) =>
  `${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`;

export default function LocationPickerScreen() {
  const setLocation = useActivityDraftStore((state) => state.setLocation);

  const [region, setRegion] = useState<Region | null>(null);
  const [marker, setMarker] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(true);

  const resolveAddress = useCallback(async (coords: Coordinates) => {
    try {
      const results = await Location.reverseGeocodeAsync(coords);
      const formatted = formatAddress(results[0]) || formatCoords(coords);
      setAddress(formatted);
    } catch {
      setAddress(formatCoords(coords));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!isMounted) return;

      if (permission.status !== "granted") {
        setHasPermission(false);
        setIsLoading(false);
        showMessage({
          message: "Location permission required",
          description: "Please enable location permission to pick a location.",
          type: "warning",
        });
        return;
      }

      setHasPermission(true);

      const current = await Location.getCurrentPositionAsync({});
      if (!isMounted) return;

      const coords = {
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      };

      setMarker(coords);
      setRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      await resolveAddress(coords);
      setIsLoading(false);
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [resolveAddress]);

  const handleMapPress = async (event: MapPressEvent) => {
    const coords = event.nativeEvent.coordinate;
    setMarker(coords);
    await resolveAddress(coords);
  };

  const handleConfirm = () => {
    if (!address) {
      showMessage({
        message: "Pick a location",
        description: "Tap on the map to select a location.",
        type: "warning",
      });
      return;
    }

    setLocation(address);
    router.back();
  };

  const canShowMap = useMemo(
    () => !isLoading && hasPermission,
    [isLoading, hasPermission],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pick Location</Text>
        <Text style={styles.subtitle}>
          Tap on the map to choose the activity location
        </Text>
      </View>

      <View style={styles.mapWrapper}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Loading map…</Text>
          </View>
        )}
        {canShowMap && region && (
          <MapView
            style={styles.map}
            provider="google"
            initialRegion={region}
            onPress={handleMapPress}
          >
            {marker && <Marker coordinate={marker} />}
          </MapView>
        )}
        {!hasPermission && (
          <View style={styles.loadingOverlay}>
            <Text style={styles.loadingText}>
              Location permission is required to use the map.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.addressCard}>
          <Text style={styles.addressLabel}>Selected Location</Text>
          <Text style={styles.addressText}>
            {address || "Tap on the map to select a location"}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={handleConfirm}
          testID="confirm-location-btn"
        >
          <Text style={styles.confirmText}>Use This Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
