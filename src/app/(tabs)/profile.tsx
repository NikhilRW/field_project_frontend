import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Pencil,
  Users,
  Bell,
  Info,
  LogOut,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Shield,
} from 'lucide-react-native';
import { Colors } from '@/shared/constants/color';

interface SettingsItem {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  isLogout?: boolean;
  onPress?: () => void;
  iconBg: string;
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const settingsItems: SettingsItem[] = [
    {
      icon: <Pencil size={16} color={Colors.primary} strokeWidth={1.8} />,
      label: 'Edit Profile',
      sub: 'Update NGO information',
      iconBg: Colors.primaryLight,
    },
    {
      icon: <Users size={16} color={Colors.secondary} strokeWidth={1.8} />,
      label: 'Manage Users',
      sub: 'Admins, volunteers & donors',
      iconBg: Colors.secondaryLight,
    },
    {
      icon: <Bell size={16} color={Colors.accent} strokeWidth={1.8} />,
      label: 'Notifications',
      sub: 'Alerts and reminders',
      iconBg: Colors.accentLight,
    },
    {
      icon: <Info size={16} color={Colors.textSecondary} strokeWidth={1.8} />,
      label: 'About App',
      sub: 'Smart NGO v1.0',
      iconBg: Colors.borderLight,
    },
    {
      icon: <LogOut size={16} color={Colors.error} strokeWidth={1.8} />,
      label: 'Logout',
      isLogout: true,
      onPress: () => router.replace('/login' as any),
      iconBg: Colors.errorLight,
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topBg} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatarSection}>
            <View style={styles.orgAvatar}>
              <Text style={styles.orgAvatarText}>HH</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Shield size={10} color="#fff" fill="#fff" />
            </View>
          </View>
          <Text style={styles.orgName}>Helping Hands</Text>
          <Text style={styles.orgFullName}>Samajik Seva Sanstha</Text>
          <Text style={styles.orgReg}>Regd. NGO · Kalyan, Maharashtra</Text>

          <View style={styles.contactList}>
            <View style={styles.contactItem}>
              <Phone size={13} color={Colors.textTertiary} strokeWidth={1.6} />
              <Text style={styles.contactText}>+91 98765 43210</Text>
            </View>
            <View style={styles.contactItem}>
              <Mail size={13} color={Colors.textTertiary} strokeWidth={1.6} />
              <Text style={styles.contactText}>helpinghand7887@gmail.com</Text>
            </View>
            <View style={styles.contactItem}>
              <MapPin size={13} color={Colors.textTertiary} strokeWidth={1.6} />
              <Text style={styles.contactText}>Opp. Mrunmayi Palace, Chikanghar, Kalyan</Text>
            </View>
          </View>
        </View>

        <View style={styles.impactRow}>
          <View style={styles.impactItem}>
            <Text style={styles.impactValue}>248</Text>
            <Text style={styles.impactLabel}>People</Text>
          </View>
          <View style={styles.impactDivider} />
          <View style={styles.impactItem}>
            <Text style={styles.impactValue}>64</Text>
            <Text style={styles.impactLabel}>Volunteers</Text>
          </View>
          <View style={styles.impactDivider} />
          <View style={styles.impactItem}>
            <Text style={styles.impactValue}>18</Text>
            <Text style={styles.impactLabel}>Programs</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Settings</Text>

        <View style={styles.settingsCard}>
          {settingsItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.settingsRow,
                i === settingsItems.length - 1 && styles.settingsRowLast,
              ]}
              onPress={item.onPress}
              activeOpacity={0.6}
              testID={`settings-${i}`}
            >
              <View style={[styles.settingsIconWrap, { backgroundColor: item.iconBg }]}>
                {item.icon}
              </View>
              <View style={styles.settingsTextWrap}>
                <Text style={[styles.settingsLabel, item.isLogout && styles.logoutText]}>
                  {item.label}
                </Text>
                {item.sub && <Text style={styles.settingsSub}>{item.sub}</Text>}
              </View>
              {!item.isLogout && (
                <ChevronRight size={15} color={Colors.textTertiary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.footer}>Smart NGO v1.0 · SDG-3: Good Health & Well-Being</Text>
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  topBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: Colors.primary,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },
  profileCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 22,
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarSection: {
    position: 'relative',
    marginBottom: 12,
  },
  orgAvatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orgAvatarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700' as const,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  orgName: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    marginBottom: 1,
  },
  orgFullName: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: Colors.textSecondary,
    marginBottom: 3,
  },
  orgReg: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginBottom: 14,
  },
  contactList: {
    alignSelf: 'stretch',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: 14,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
  },
  impactRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 22,
  },
  impactItem: {
    flex: 1,
    alignItems: 'center',
  },
  impactValue: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  impactLabel: {
    fontSize: 11,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  impactDivider: {
    width: 1,
    backgroundColor: Colors.borderLight,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.textTertiary,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.6,
    marginBottom: 8,
    paddingLeft: 4,
  },
  settingsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    marginBottom: 22,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingsRowLast: {
    borderBottomWidth: 0,
  },
  settingsIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsTextWrap: { flex: 1 },
  settingsLabel: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.textPrimary,
  },
  logoutText: {
    color: Colors.error,
  },
  settingsSub: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: 1,
  },
  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: Colors.textTertiary,
    marginBottom: 8,
  },
});
