import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, SlidersHorizontal, ChevronRight, Plus } from 'lucide-react-native';
import AppHeader from '@/shared/components/AppHeader';
import { Colors } from '@/shared/constants/color';
import { beneficiaries, Beneficiary, BeneficiaryCategory } from '@/shared/mock/data';

type FilterTab = 'All' | BeneficiaryCategory;

const filterTabs: FilterTab[] = ['All', 'Elderly', 'Children', 'Youth', 'PWD', 'Mothers'];

const healthColor = (status: string) => {
  if (status === 'Good') return Colors.secondary;
  if (status === 'Moderate') return Colors.accent;
  return Colors.error;
};

const healthBg = (status: string) => {
  if (status === 'Good') return Colors.secondaryLight;
  if (status === 'Moderate') return Colors.accentLight;
  return Colors.errorLight;
};

const categoryColor = (cat: string) => {
  const map: Record<string, string> = {
    Elderly: '#0D5C91',
    Children: '#1D9E54',
    Youth: '#0891B2',
    PWD: '#7C3AED',
    Mothers: '#DB2777',
  };
  return map[cat] ?? Colors.primary;
};

const categoryBg = (cat: string) => {
  const map: Record<string, string> = {
    Elderly: '#E8F1F8',
    Children: '#E4F5EC',
    Youth: '#E0F7FA',
    PWD: '#EDE9FE',
    Mothers: '#FCE7F3',
  };
  return map[cat] ?? Colors.primaryLight;
};

export default function BeneficiariesScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  const filtered = beneficiaries.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === 'All' || b.category === activeTab;
    return matchSearch && matchTab;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader />

      <View style={styles.titleRow}>
        <View>
          <Text style={styles.title}>Beneficiaries</Text>
          <Text style={styles.titleSub}>{beneficiaries.length} people registered</Text>
        </View>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Search size={16} color={Colors.textTertiary} strokeWidth={1.8} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name..."
            placeholderTextColor={Colors.textTertiary}
            value={search}
            onChangeText={setSearch}
            testID="search-input"
          />
        </View>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
          <SlidersHorizontal size={17} color={Colors.primary} strokeWidth={1.8} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
        contentContainerStyle={styles.tabsContent}
      >
        {filterTabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterTab, activeTab === tab && styles.filterTabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
            testID={`filter-${tab}`}
          >
            <Text style={[styles.filterTabText, activeTab === tab && styles.filterTabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((b: Beneficiary) => (
          <TouchableOpacity
            key={b.id}
            style={styles.card}
            activeOpacity={0.7}
            testID={`beneficiary-${b.id}`}
          >
            <View style={[styles.avatar, { backgroundColor: b.color }]}>
              <Text style={styles.avatarText}>{b.initials}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{b.name}</Text>
              <Text style={styles.cardAge}>{b.age} yrs · {b.address}</Text>
              <View style={styles.badgeRow}>
                <View style={[styles.catBadge, { backgroundColor: categoryBg(b.category) }]}>
                  <Text style={[styles.catBadgeText, { color: categoryColor(b.category) }]}>
                    {b.category}
                  </Text>
                </View>
                <View style={[styles.healthBadge, { backgroundColor: healthBg(b.healthStatus) }]}>
                  <View style={[styles.healthDot, { backgroundColor: healthColor(b.healthStatus) }]} />
                  <Text style={[styles.healthText, { color: healthColor(b.healthStatus) }]}>
                    {b.healthStatus}
                  </Text>
                </View>
              </View>
            </View>
            <ChevronRight size={15} color={Colors.textTertiary} />
          </TouchableOpacity>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/add-beneficiary' as any)}
        activeOpacity={0.8}
        testID="add-fab"
      >
        <Plus size={22} color="#fff" strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleRow: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  titleSub: {
    fontSize: 13,
    color: Colors.textTertiary,
    marginTop: 1,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  filterBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsScroll: {
    maxHeight: 38,
    marginBottom: 10,
  },
  tabsContent: {
    paddingHorizontal: 20,
    gap: 8,
    alignItems: 'center',
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.surface,
  },
  filterTabActive: {
    backgroundColor: Colors.primary,
  },
  filterTabText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
  },
  filterTabTextActive: {
    color: '#fff',
    fontWeight: '600' as const,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 6,
    gap: 11,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600' as const,
  },
  cardInfo: {
    flex: 1,
    gap: 2,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
  },
  cardAge: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  catBadge: {
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  catBadgeText: {
    fontSize: 10,
    fontWeight: '600' as const,
  },
  healthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  healthDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  healthText: {
    fontSize: 10,
    fontWeight: '600' as const,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
});
