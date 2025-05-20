import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useItemList } from '../hooks/useItemList';
import ItemCard from '../components/ItemCard';
import COLORS from '../../../theme/colors';
import typography from '../../../theme/typography';
const ItemListScreen = ({ navigation }) => {
  const { items, loading, showAddOptions, handleDeleteItem } = useItemList(navigation);
return (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.headerWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>What's Inside?</Text>
      </View>
    </View>
{loading ? (
  <ActivityIndicator size="large" color={COLORS.primaryAccent} style={{ marginTop: 50 }} />
) : (
  <FlatList
    data={items}
    renderItem={({ item }) => (
      <ItemCard item={item} onLongPress={() => handleDeleteItem(item.id)} />
    )}
    keyExtractor={item => item.id.toString()}
    contentContainerStyle={styles.listContent}
    showsVerticalScrollIndicator={false}
    ListEmptyComponent={
      <Text style={{ textAlign: 'center', marginTop: 20 }}>No items found.</Text>
    }
  />
)}
<TouchableOpacity style={styles.fab} onPress={showAddOptions} activeOpacity={0.8}>
  <Ionicons name="add" size={28} color={COLORS.white} />
</TouchableOpacity>
</SafeAreaView>
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  headerWrapper: { paddingHorizontal: 20, paddingVertical: 10, marginTop: 30 },
  header: { flexDirection: 'row', alignItems: 'center', position: 'relative' },
  headerTitle: {
    ...typography.header,
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 35,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.primaryAccent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: COLORS.primaryAccent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
export default ItemListScreen;
