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
import { Camera, ChevronDown } from 'lucide-react-native';
import { Colors } from '@/shared/constants/color';

type Gender = 'Male' | 'Female' | 'Other';
type Category = 'Elderly' | 'Children' | 'Youth' | 'PWD' | 'Mothers';
type HealthStatus = 'Good' | 'Moderate' | 'Critical';

export default function AddBeneficiaryScreen() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('Male');
  const [category, setCategory] = useState<Category>('Elderly');
  const [address, setAddress] = useState('');
  const [healthStatus, setHealthStatus] = useState<HealthStatus>('Good');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showHealthPicker, setShowHealthPicker] = useState(false);

  const genders: Gender[] = ['Male', 'Female', 'Other'];
  const categories: Category[] = ['Elderly', 'Children', 'Youth', 'PWD', 'Mothers'];
  const healthOptions: HealthStatus[] = ['Good', 'Moderate', 'Critical'];

  const healthColor = (h: HealthStatus) => {
    if (h === 'Good') return Colors.secondary;
    if (h === 'Moderate') return Colors.accent;
    return Colors.error;
  };

  const handleSave = () => {
    console.log('Saving beneficiary:', { name, age, gender, category, address, healthStatus });
    router.back();
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.photoUpload} testID="photo-upload">
          <View style={styles.photoCircle}>
            <Camera size={26} color={Colors.textTertiary} strokeWidth={1.6} />
            <Text style={styles.photoText}>Add Photo</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            placeholder="Enter full name"
            placeholderTextColor={Colors.textTertiary}
            value={name}
            onChangeText={setName}
            testID="name-input"
          />
        </View>

        <Text style={styles.label}>Age</Text>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            placeholder="Enter age"
            placeholderTextColor={Colors.textTertiary}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            testID="age-input"
          />
        </View>

        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioGroup}>
          {genders.map((g) => (
            <TouchableOpacity
              key={g}
              style={styles.radioItem}
              onPress={() => setGender(g)}
              testID={`gender-${g}`}
            >
              <View style={[styles.radioOuter, gender === g && styles.radioOuterActive]}>
                {gender === g && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={styles.pickerBtn}
          onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          testID="category-picker"
        >
          <Text style={styles.pickerValue}>{category}</Text>
          <ChevronDown size={16} color={Colors.textTertiary} />
        </TouchableOpacity>
        {showCategoryPicker && (
          <View style={styles.pickerDropdown}>
            {categories.map((c) => (
              <TouchableOpacity
                key={c}
                style={[styles.pickerOption, c === category && styles.pickerOptionActive]}
                onPress={() => { setCategory(c); setShowCategoryPicker(false); }}
              >
                <Text style={[styles.pickerOptionText, c === category && styles.pickerOptionTextActive]}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>Address</Text>
        <View style={[styles.inputWrap, styles.textAreaWrap]}>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter complete address"
            placeholderTextColor={Colors.textTertiary}
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={3}
            testID="address-input"
          />
        </View>

        <Text style={styles.label}>Health Status</Text>
        <TouchableOpacity
          style={styles.pickerBtn}
          onPress={() => setShowHealthPicker(!showHealthPicker)}
          testID="health-picker"
        >
          <View style={styles.healthRow}>
            <View style={[styles.healthDot, { backgroundColor: healthColor(healthStatus) }]} />
            <Text style={styles.pickerValue}>{healthStatus}</Text>
          </View>
          <ChevronDown size={16} color={Colors.textTertiary} />
        </TouchableOpacity>
        {showHealthPicker && (
          <View style={styles.pickerDropdown}>
            {healthOptions.map((h) => (
              <TouchableOpacity
                key={h}
                style={[styles.pickerOption, h === healthStatus && styles.pickerOptionActive]}
                onPress={() => { setHealthStatus(h); setShowHealthPicker(false); }}
              >
                <View style={styles.healthRow}>
                  <View style={[styles.healthDot, { backgroundColor: healthColor(h) }]} />
                  <Text style={[styles.pickerOptionText, h === healthStatus && styles.pickerOptionTextActive]}>
                    {h}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={[styles.saveContainer, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8} testID="save-btn">
          <Text style={styles.saveBtnText}>Save Beneficiary</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },
  photoUpload: {
    alignItems: 'center',
    marginBottom: 28,
  },
  photoCircle: {
    width: 96,
    height: 96,
    borderRadius: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    gap: 4,
  },
  photoText: {
    fontSize: 11,
    color: Colors.textTertiary,
    fontWeight: '500' as const,
  },
  label: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  inputWrap: {
    backgroundColor: Colors.inputBg,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    justifyContent: 'center',
    marginBottom: 18,
  },
  textAreaWrap: {
    height: 90,
    paddingVertical: 12,
    justifyContent: 'flex-start',
  },
  input: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 18,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  radioLabel: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  pickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.inputBg,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 4,
  },
  pickerValue: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  healthDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pickerDropdown: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginBottom: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  pickerOptionActive: {
    backgroundColor: Colors.primaryLight,
  },
  pickerOptionText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  pickerOptionTextActive: {
    color: Colors.primary,
    fontWeight: '600' as const,
  },
  saveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600' as const,
  },
});
