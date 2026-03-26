import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, Heart } from 'lucide-react-native';
import { Colors } from '@/shared/constants/color';

type Role = 'Admin' | 'Volunteer' | 'Donor';

export default function LoginScreen() {
  const [selectedRole, setSelectedRole] = useState<Role>('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const roles: Role[] = ['Admin', 'Volunteer', 'Donor'];

  const handleLogin = () => {
    console.log('Login attempt:', { role: selectedRole, email });
    router.replace('/(tabs)/dashboard' as any);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {showPassword
                ? <Eye size={17} color={Colors.textTertiary} strokeWidth={1.6} />
                : <EyeOff size={17} color={Colors.textTertiary} strokeWidth={1.6} />
              }
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleLogin}
            activeOpacity={0.8}
            testID="login-btn"
          >
            <Text style={styles.loginBtnText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Powered by Smart NGO v1.0</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  topSection: {
    backgroundColor: '#0A4F7A',
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: -20,
  },
  logoBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  brandName: {
    fontSize: 21,
    fontWeight: '700' as const,
    color: '#fff',
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  brandOrg: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '500' as const,
    marginBottom: 6,
  },
  brandSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
  },
  formCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 22,
    marginTop: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
    marginBottom: 8,
    marginTop: 4,
  },
  roleSelector: {
    flexDirection: 'row',
    backgroundColor: Colors.inputBg,
    borderRadius: 10,
    padding: 3,
    marginBottom: 20,
  },
  roleTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  roleTabActive: {
    backgroundColor: Colors.primary,
  },
  roleTabText: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: Colors.textSecondary,
  },
  roleTabTextActive: {
    color: '#fff',
    fontWeight: '600' as const,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 22,
    marginTop: -8,
  },
  forgotText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '500' as const,
  },
  loginBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600' as const,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: 24,
  },
});
