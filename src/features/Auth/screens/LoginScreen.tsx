import React from "react";
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
import { router } from "expo-router";
import { Mail, Lock, Eye, EyeOff, Heart } from "lucide-react-native";
import { Colors } from "@/shared/constants/color";
import { loginRoles } from "../constants/roles";
import { useLoginForm } from "../hooks/useLoginForm";
import { useLoginMutation } from "../hooks/useAuthMutations";
import { loginStyles as styles } from "../styles/loginStyles";

export default function LoginScreen() {
  const {
    selectedRole,
    setSelectedRole,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
  } = useLoginForm();

  const loginMutation = useLoginMutation();
  const roles = loginRoles;

  const handleLogin = async () => {
    try {
      await loginMutation.mutateAsync({
        role: selectedRole,
        email,
        password,
      });

      const destination =
        selectedRole === "Volunteer"
          ? "/(tabs)/activities"
          : "/(tabs)/dashboard";

      router.replace(destination as any);
    } catch (error: any) {
      const message = error?.message ?? "Unable to sign in. Please try again.";
      if (
        typeof message === "string" &&
        message.toLowerCase().includes("verify")
      ) {
        router.replace(
          `/(auth)/verify-email?email=${encodeURIComponent(email)}` as any,
        );
        return;
      }
      Alert.alert("Login failed", message);
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
        <View style={styles.topSection}>
          <View style={styles.logoBox}>
            <Heart size={22} color="#fff" fill="#fff" />
          </View>
          <Text style={styles.brandName}>Helping Hands</Text>
          <Text style={styles.brandOrg}>Samajik Seva Sanstha</Text>
          <Text style={styles.brandSub}>Sign in to your account</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>I am a</Text>
          <View style={styles.roleSelector} testID="role-selector">
            {roles.map((role) => (
              <TouchableOpacity
                key={role}
                style={[
                  styles.roleTab,
                  selectedRole === role && styles.roleTabActive,
                ]}
                onPress={() => setSelectedRole(role)}
                activeOpacity={0.7}
                testID={`role-${role}`}
              >
                <Text
                  style={[
                    styles.roleTabText,
                    selectedRole === role && styles.roleTabTextActive,
                  ]}
                >
                  {role}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

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
              testID="email-input"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrap}>
            <Lock size={17} color={Colors.textTertiary} strokeWidth={1.6} />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor={Colors.textTertiary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              testID="password-input"
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {showPassword ? (
                <Eye size={17} color={Colors.textTertiary} strokeWidth={1.6} />
              ) : (
                <EyeOff
                  size={17}
                  color={Colors.textTertiary}
                  strokeWidth={1.6}
                />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.forgotBtn}
            onPress={() => router.push("/(auth)/forgot-password" as any)}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleLogin}
            activeOpacity={0.8}
            testID="login-btn"
            disabled={loginMutation.isPending}
          >
            <Text style={styles.loginBtnText}>
              {loginMutation.isPending ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 14,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: Colors.textSecondary }}>New here? </Text>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/register" as any)}
            >
              <Text
                style={{
                  color: Colors.primary,
                  fontWeight: "600" as const,
                }}
              >
                Create account
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footer}>Powered by Smart NGO v1.0</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
