import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, X, CalendarDays, Briefcase, ChevronRight } from 'lucide-react-native';
import { Colors } from '@/shared/constants/color';
import { volunteers as initialVolunteers, Volunteer } from '@/shared/mock/data';

export default function VolunteersScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [volList, setVolList] = useState<Volunteer[]>(initialVolunteers);
  const [selected, setSelected] = useState<Volunteer | null>(null);

  const filtered = volList.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.skill.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAvailability = (id: string) => {
    setVolList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, available: !v.available } : v))
    );
  };

  const roleColor = (role: string) => {
    const map: Record<string, string> = {
      Medical: '#0D5C91',
      Logistics: '#1D9E54',
      Technical: '#E8880C',
      'Social Work': '#7C3AED',
      Education: '#0891B2',
    };
    return map[role] ?? Colors.primary;
  };

  const roleBg = (role: string) => {
    const map: Record<string, string> = {
      Medical: Colors.primaryLight,
      Logistics: Colors.secondaryLight,
      Technical: Colors.accentLight,
      'Social Work': '#EDE9FE',
      Education: '#E0F7FA',
    };
    return map[role] ?? Colors.primaryLight;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Search size={16} color={Colors.textTertiary} strokeWidth={1.8} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search volunteers..."
            placeholderTextColor={Colors.textTertiary}
            value={search}
            onChangeText={setSearch}
            testID="volunteer-search"
          />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statChip, { backgroundColor: Colors.secondaryLight }]}>
          <View style={[styles.statDot, { backgroundColor: Colors.secondary }]} />
          <Text style={styles.statChipText}>
            {volList.filter((v) => v.available).length} Available
          </Text>
        </View>
        <View style={[styles.statChip, { backgroundColor: Colors.errorLight }]}>
          <View style={[styles.statDot, { backgroundColor: Colors.error }]} />
          <Text style={styles.statChipText}>
            {volList.filter((v) => !v.available).length} Unavailable
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((v) => (
          <TouchableOpacity
            key={v.id}
            style={styles.card}
            onPress={() => setSelected(v)}
            activeOpacity={0.7}
            testID={`volunteer-${v.id}`}
          >
            <View style={[styles.avatar, { backgroundColor: v.color }]}>
              <Text style={styles.avatarText}>{v.initials}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{v.name}</Text>
              <View style={styles.tagRow}>
                <View style={[styles.roleTag, { backgroundColor: roleBg(v.role) }]}>
                  <Text style={[styles.roleTagText, { color: roleColor(v.role) }]}>
                    {v.role}
                  </Text>
                </View>
                <Text style={styles.skillText}>{v.skill}</Text>
              </View>
              <View style={styles.assignedRow}>
                <CalendarDays size={11} color={Colors.textTertiary} strokeWidth={1.6} />
                <Text style={styles.assignedText}>{v.assignedActivity}</Text>
              </View>
            </View>
            <View style={styles.cardRight}>
              <Switch
                value={v.available}
                onValueChange={() => toggleAvailability(v.id)}
                trackColor={{ false: Colors.border, true: Colors.secondary + '66' }}
                thumbColor={v.available ? Colors.secondary : '#ccc'}
                testID={`toggle-${v.id}`}
              />
              <ChevronRight size={14} color={Colors.textTertiary} style={{ marginTop: 4 }} />
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 24 }} />
      </ScrollView>

      <Modal
        visible={selected !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setSelected(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelected(null)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelected(null)}>
              <X size={16} color={Colors.textSecondary} strokeWidth={2} />
            </TouchableOpacity>

            {selected && (
              <>
                <View style={styles.sheetProfile}>
                  <View style={[styles.sheetAvatar, { backgroundColor: selected.color }]}>
                    <Text style={styles.sheetAvatarText}>{selected.initials}</Text>
                  </View>
                  <Text style={styles.sheetName}>{selected.name}</Text>
                  <View style={[styles.roleTag, { backgroundColor: roleBg(selected.role), marginTop: 6 }]}>
                    <Text style={[styles.roleTagText, { color: roleColor(selected.role) }]}>
                      {selected.role}
                    </Text>
                  </View>
                </View>

                <View style={styles.sheetDivider} />

                <View style={styles.sheetDetail}>
                  <View style={styles.sheetDetailRow}>
                    <Briefcase size={15} color={Colors.primary} strokeWidth={1.6} />
                    <Text style={styles.sheetDetailLabel}>Skill</Text>
                    <Text style={styles.sheetDetailValue}>{selected.skill}</Text>
                  </View>
                  <View style={styles.sheetDetailRow}>
                    <CalendarDays size={15} color={Colors.primary} strokeWidth={1.6} />
                    <Text style={styles.sheetDetailLabel}>Assigned To</Text>
                    <Text style={styles.sheetDetailValue}>{selected.assignedActivity}</Text>
                  </View>
                  <View style={styles.sheetDetailRow}>
                    <View style={[styles.statDot, { backgroundColor: selected.available ? Colors.secondary : Colors.error }]} />
                    <Text style={styles.sheetDetailLabel}>Availability</Text>
                    <Text style={[styles.sheetDetailValue, { color: selected.available ? Colors.secondary : Colors.error, fontWeight: '600' as const }]}>
                      {selected.available ? 'Available' : 'Unavailable'}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  searchRow: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  statChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  statDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statChipText: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '600' as const,
  },
  list: { flex: 1 },
  listContent: { paddingHorizontal: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700' as const,
  },
  cardInfo: { flex: 1, gap: 4 },
  cardName: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roleTag: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  roleTagText: {
    fontSize: 10,
    fontWeight: '600' as const,
  },
  skillText: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  assignedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  assignedText: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  cardRight: {
    alignItems: 'center',
    gap: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: 16,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetProfile: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sheetAvatar: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  sheetAvatarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700' as const,
  },
  sheetName: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  sheetDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginBottom: 16,
  },
  sheetDetail: { gap: 14 },
  sheetDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sheetDetailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  sheetDetailValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500' as const,
  },
});
