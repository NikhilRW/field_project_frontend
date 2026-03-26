import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Mail, KeyRound, ArrowLeft } from "lucide-react-native";
import { Colors } from "@/shared/constants/color";
import {
  useSendVerificationEmailMutation,
  useVerifyEmailMutation,
} from "../hooks/useAuthMutations";
import { loginStyles as styles } from "../styles/loginStyles";

export default function VerifyEmailScreen() {
  const params = useLocalSearchParams<{ email?: string; token?: string }>();
  const [email, setEmail] = useState(params.email ?? "");
  const [token, setToken] = useState(params.token ?? "");

  const verifyMutation = useVerifyEmailMutation();
  const sendMutation = useSendVerificationEmailMutation();

  const handleVerify = async () => {
    if (!token.trim()) {
      Alert.alert("Missing token", "Please enter the verification token.");
      return;
    }

    try {
      await verifyMutation.mutateAsync(token.trim());
      Alert.alert("Verified", "Your email has been verified. Please sign in.");
      router.replace("/(auth)/login" as any);
    } catch (error: any) {
      Alert.alert(
        "Verification failed",
        error?.message ?? "Unable to verify email. Please try again.",
      );
    }
  };

  const handleResend = async () => {
    if (!email.trim()) {
      Alert.alert("Missing email", "Please enter your email address.");
      return;
    }

    try {
      await sendMutation.mutateAsync(email.trim());
      Alert.alert(
        "Email sent",
        "Verification email sent. Check your inbox.",
      );
    } catch (error: any) {
      Alert.alert(
        "Failed to send email",
        error?.message ?? "Unable to send verification email.",
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={{ marginBottom: 12, alignSelf: "flex-start" }}
          onPress={() => router.back()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <ArrowLeft size={18} color={Colors.textSecondary} strokeWidth={2} />
        </TouchableOpacity>

        <View style={styles.topSection}>
          <Text style={styles.brandName}>Verify Email</Text>
          <Text style={styles.brandSub}>
            Enter the verification token sent to your email.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrap}>
            <Mail size={17} color={Colors.textTertiary} strokeWidth={1.6} />
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={Colors.textTertiary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              testID="verify-email-input"
            />
          </View>

          <Text style={styles.label}>Verification Token</Text>
          <View style={styles.inputWrap}>
            <KeyRound size={17} color={Colors.textTertiary} strokeWidth={1.6} />
            <TextInput
              style={styles.input}
              placeholder="Enter token"
              placeholderTextColor={Colors.textTertiary}
              value={token}
              onChangeText={setToken}
              autoCapitalize="none"
              testID="verify-token-input"
            />
          </View>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleVerify}
            activeOpacity={0.8}
            disabled={verifyMutation.isPending}
            testID="verify-btn"
          >
            <Text style={styles.loginBtnText}>
              {verifyMutation.isPending ? "Verifying..." : "Verify Email"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.forgotBtn, { marginTop: 10 }]}
            onPress={handleResend}
            disabled={sendMutation.isPending}
          >
            <Text style={styles.forgotText}>
              {sendMutation.isPending ? "Sending..." : "Resend verification"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Powered by Smart NGO v1.0</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
