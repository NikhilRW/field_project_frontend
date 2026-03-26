export type BeneficiaryCategory = 'Elderly' | 'Children' | 'Youth' | 'PWD' | 'Mothers';
export type HealthStatus = 'Good' | 'Moderate' | 'Critical';
export type ActivityStatus = 'Upcoming' | 'Completed' | 'Ongoing';
export type DonationType = 'incoming' | 'outgoing';

export interface Beneficiary {
  id: string;
  name: string;
  age: number;
  category: BeneficiaryCategory;
  healthStatus: HealthStatus;
  address: string;
  initials: string;
  color: string;
}

export interface Activity {
  id: string;
  name: string;
  date: string;
  location: string;
  volunteers: number;
  status: ActivityStatus;
  description: string;
}

export interface Donation {
  id: string;
  donor: string;
  purpose: string;
  amount: number;
  type: DonationType;
  date: string;
}

export interface Volunteer {
  id: string;
  name: string;
  role: string;
  skill: string;
  assignedActivity: string;
  available: boolean;
  initials: string;
  color: string;
}

export interface Survey {
  id: string;
  date: string;
  location: string;
  note: string;
  beneficiariesCovered: number;
  imageUrl: string;
  geoTag: string;
}

export const beneficiaries: Beneficiary[] = [
  { id: '1', name: 'Sunita Patil', age: 72, category: 'Elderly', healthStatus: 'Good', address: 'Chikanghar, Kalyan East', initials: 'SP', color: '#1B6CA8' },
  { id: '2', name: 'Rahul Sharma', age: 8, category: 'Children', healthStatus: 'Moderate', address: 'Swanand Colony, Kalyan', initials: 'RS', color: '#27AE60' },
  { id: '3', name: 'Kamla Devi', age: 65, category: 'Elderly', healthStatus: 'Critical', address: 'Khadakpada, Kalyan West', initials: 'KD', color: '#E74C3C' },
  { id: '4', name: 'Priya Gupta', age: 5, category: 'Children', healthStatus: 'Good', address: 'Dombivli East, Thane', initials: 'PG', color: '#F39C12' },
  { id: '5', name: 'Ramesh Jadhav', age: 45, category: 'PWD', healthStatus: 'Moderate', address: 'Titwala, Thane District', initials: 'RJ', color: '#9B59B6' },
  { id: '6', name: 'Meena Wagh', age: 28, category: 'Mothers', healthStatus: 'Good', address: 'Ulhasnagar, Thane', initials: 'MW', color: '#E91E63' },
  { id: '7', name: 'Aakash More', age: 17, category: 'Youth', healthStatus: 'Good', address: 'Ambernath, Thane', initials: 'AM', color: '#00ACC1' },
  { id: '8', name: 'Lata Bhosle', age: 70, category: 'Elderly', healthStatus: 'Moderate', address: 'Shahad, Kalyan', initials: 'LB', color: '#FF5722' },
];

export const activities: Activity[] = [
  { id: '1', name: 'Study Kit Distribution', date: 'Feb 25, 2026', location: 'Chikanghar Community Hall, Kalyan', volunteers: 14, status: 'Upcoming', description: 'Distribution of study kits including notebooks, stationery, and school bags to underprivileged children.' },
  { id: '2', name: 'Sanitary Pad Drive', date: 'Feb 20, 2026', location: 'Swanand Colony, Kalyan', volunteers: 8, status: 'Completed', description: 'Hygiene awareness and free sanitary pad distribution for women and adolescent girls.' },
  { id: '3', name: 'Health Checkup Camp', date: 'Mar 3, 2026', location: 'Khadakpada, Kalyan West', volunteers: 6, status: 'Upcoming', description: 'Free health checkup camp for elderly beneficiaries with basic medicine distribution.' },
  { id: '4', name: 'Donation Drive', date: 'Feb 10, 2026', location: 'Dombivli East, Thane', volunteers: 20, status: 'Completed', description: 'Collection and distribution of clothes, food items, and essential supplies to needy families.' },
  { id: '5', name: 'Youth Awareness Workshop', date: 'Mar 12, 2026', location: 'Ulhasnagar Community Center', volunteers: 10, status: 'Upcoming', description: 'Workshop on career guidance, digital literacy, and health awareness for youth aged 15-24.' },
  { id: '6', name: 'Senior Citizen Meet', date: 'Feb 14, 2026', location: 'Chatri Banglow, Kalyan', volunteers: 5, status: 'Completed', description: 'Social gathering and recreational activities for elderly beneficiaries with basic health monitoring.' },
];

export const donations: Donation[] = [
  { id: '1', donor: 'Tata Trust', purpose: 'Medical Supplies', amount: 50000, type: 'incoming', date: 'Feb 15, 2026' },
  { id: '2', donor: 'Reliance Foundation', purpose: 'Sanitary Pad Drive', amount: 35000, type: 'incoming', date: 'Feb 12, 2026' },
  { id: '3', donor: 'Admin', purpose: 'Transportation', amount: 8500, type: 'outgoing', date: 'Feb 11, 2026' },
  { id: '4', donor: 'Infosys Foundation', purpose: 'Study Kits', amount: 25000, type: 'incoming', date: 'Feb 8, 2026' },
  { id: '5', donor: 'Admin', purpose: 'Office Supplies', amount: 3200, type: 'outgoing', date: 'Feb 7, 2026' },
  { id: '6', donor: 'CSR Fund - HDFC', purpose: 'Health Camp', amount: 100000, type: 'incoming', date: 'Feb 5, 2026' },
  { id: '7', donor: 'Admin', purpose: 'Medical Kits', amount: 12000, type: 'outgoing', date: 'Feb 4, 2026' },
  { id: '8', donor: 'Bajaj Foundation', purpose: 'Youth Workshop', amount: 18000, type: 'incoming', date: 'Feb 3, 2026' },
];

export const volunteers: Volunteer[] = [
  { id: '1', name: 'Nikhil Wankhede', role: 'Medical', skill: 'First Aid', assignedActivity: 'Health Checkup Camp', available: true, initials: 'NW', color: '#1B6CA8' },
  { id: '2', name: 'Mamta Mirani', role: 'Logistics', skill: 'Event Management', assignedActivity: 'Study Kit Distribution', available: true, initials: 'MM', color: '#27AE60' },
  { id: '3', name: 'Kangana Menghani', role: 'Technical', skill: 'IT Support', assignedActivity: 'Youth Awareness Workshop', available: false, initials: 'KM', color: '#F39C12' },
  { id: '4', name: 'Jiya Tarwani', role: 'Social Work', skill: 'Counseling', assignedActivity: 'Senior Citizen Meet', available: true, initials: 'JT', color: '#9B59B6' },
  { id: '5', name: 'Vikram Desai', role: 'Medical', skill: 'Pharmacist', assignedActivity: 'Health Checkup Camp', available: true, initials: 'VD', color: '#E74C3C' },
  { id: '6', name: 'Sneha Kulkarni', role: 'Education', skill: 'Teacher', assignedActivity: 'Study Kit Distribution', available: false, initials: 'SK', color: '#00ACC1' },
];

export const surveys: Survey[] = [
  { id: '1', date: 'Feb 18, 2026', location: 'Chikanghar, Kalyan East', note: 'Assessed 15 elderly households. 3 require urgent medical attention.', beneficiariesCovered: 15, imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400', geoTag: '19.2437° N, 73.1355° E' },
  { id: '2', date: 'Feb 16, 2026', location: 'Swanand Colony, Kalyan', note: 'Hygiene awareness survey. 8 families identified for sanitary pad distribution program.', beneficiariesCovered: 32, imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400', geoTag: '19.2501° N, 73.1412° E' },
  { id: '3', date: 'Feb 14, 2026', location: 'Khadakpada, Kalyan West', note: 'Child nutrition survey. 12 children found malnourished, enrolled in support program.', beneficiariesCovered: 24, imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400', geoTag: '19.2389° N, 73.1298° E' },
  { id: '4', date: 'Feb 10, 2026', location: 'Dombivli East, Thane', note: 'PWD household mapping completed. Accessibility improvements recommended.', beneficiariesCovered: 18, imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400', geoTag: '19.2183° N, 73.0867° E' },
];

export const monthlyDonations = [
  { month: 'Sep', received: 45000, spent: 20000 },
  { month: 'Oct', received: 62000, spent: 35000 },
  { month: 'Nov', received: 38000, spent: 28000 },
  { month: 'Dec', received: 90000, spent: 55000 },
  { month: 'Jan', received: 74000, spent: 42000 },
  { month: 'Feb', received: 228000, spent: 23700 },
];

export const dashboardStats = {
  beneficiaries: 248,
  activities: 18,
  volunteers: 64,
  donations: 228000,
};
