import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color, colors, fonts} from '../../utils';
import {MyButton, MyHeader} from '../../components';
import FastImage from 'react-native-fast-image';
import {apiURL, getData, MYAPP, webURL} from '../../utils/localStorage';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';
import {FlatList} from 'react-native';

export default function TambahKeuangan({navigation, route}) {
  const ITEM = route.params;

  const formatRupiah = amount => {
    return `Rp ${parseInt(amount).toLocaleString('id-ID')}`;
  };
  const toast = useToast();
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [user, setUser] = useState({});
  const getTransaksi = () => {
    try {
      setLoading(true);
      axios
        .post(apiURL + 'cicilan', {
          fid_pinjaman: ITEM.id_pinjaman,
        })
        .then(res => {
          console.log(res.data);
          setData(res.data);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getTransaksi();
      getData('user').then(u => setUser(u));
    }
  }, [isFocused]);

  const SISA =
    ITEM.nominal_total -
    data.reduce((nominal_bayar, item) => {
      return nominal_bayar + parseInt(item.nominal_bayar);
    }, 0);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MyHeader title="Detail Pinjaman" />
      <ScrollView>
        <View>
          <View key={ITEM.id_pinjaman} style={styles.itemCard}>
            <View style={styles.row}>
              <Text style={styles.label}>Nama Anggota:</Text>
              <Text style={styles.value}>{ITEM.nama_anggota}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tanggal Pinjaman:</Text>
              <Text style={styles.value}>
                {moment(ITEM.tanggal_pinjaman).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tanggal Pencairan:</Text>
              <Text style={styles.value}>
                {ITEM.tanggal_pencairan == null
                  ? '-'
                  : moment(ITEM.tanggal_pencairan).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Jatuh Tempo:</Text>
              <Text style={styles.value}>
                {ITEM.jatuh_tempo == null
                  ? '-'
                  : moment(ITEM.jatuh_tempo).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Skema:</Text>
              <Text style={styles.value}>{ITEM.nama_skema}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Nominal Pinjaman:</Text>
              <Text style={[styles.value, styles.nominal]}>
                {formatRupiah(ITEM.nominal_pinjaman)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Diterima:</Text>
              <Text style={[styles.value, styles.nominal]}>
                {formatRupiah(ITEM.nominal_diterima)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Cicilan:</Text>
              <Text style={[styles.value, styles.nominal]}>
                {formatRupiah(ITEM.nominal_cicilan)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Total:</Text>
              <Text style={[styles.value, styles.nominal]}>
                {formatRupiah(ITEM.nominal_total)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tenor:</Text>
              <Text style={styles.value}>{ITEM.tenor}x</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Status:</Text>
              <Text
                style={[
                  styles.value,
                  styles.badge,
                  ITEM.status_pinjaman == 'Diterima'
                    ? styles.badgeSuccess
                    : styles.badgeWarning,
                ]}>
                {ITEM.status_pinjaman}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[800],
              fontSize: 14,
            }}>
            Transaksi Cicilan
          </Text>
          {SISA > 0 && (
            <MyButton
              onPress={() =>
                navigation.navigate('ShowWeb', {
                  link: webURL + 'cicilan/add2/' + ITEM.id_pinjaman,
                  judul: 'Tambah Cicilan',
                })
              }
              title="Bayar Cicilan"
            />
          )}
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    marginVertical: 4,
                    borderRadius: 10,
                    borderColor: Color.blueGray[200],
                    padding: 10,
                    borderWidth: 1,
                  }}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Cicilan Ke:</Text>
                    <Text style={styles.value}>{item.urutan}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Tanggal Pinjaman:</Text>
                    <Text style={styles.value}>
                      {moment(item.tanggal_cicilan).format('DD MMMM YYYY')}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Pembayaran :</Text>
                    <Text style={styles.value}>{item.pembayaran}</Text>
                  </View>

                  {item.pembayaran == 'Transfer' && (
                    <View>
                      <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                          width: 100,
                          height: 150,
                        }}
                        source={{
                          uri: webURL + item.bukti_bayar,
                        }}
                      />
                    </View>
                  )}

                  <View style={styles.row}>
                    <Text style={styles.label}>Nominal :</Text>
                    <Text style={[styles.value, styles.nominal]}>
                      {formatRupiah(item.nominal_bayar)}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flex: 1,
                      }}>
                      <MyButton
                        title="Edit"
                        onPress={() =>
                          navigation.navigate('ShowWeb', {
                            link: webURL + 'cicilan/edit2/' + item.id_cicilan,
                            judul: 'Edit Cicilan',
                          })
                        }
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                      }}>
                      {user.level == 'Pengurus' && (
                        <MyButton
                          title="Hapus"
                          warna="red"
                          onPress={() => {
                            Alert.alert(MYAPP, 'Apakah kamu akan hapus ini ?', [
                              {
                                text: 'TIDAK',
                              },
                              {
                                text: 'HAPUS',
                                onPress: () => {
                                  console.log(item);
                                  axios
                                    .post(apiURL + 'delete', {
                                      modul: 'cicilan',
                                      id: item.id_cicilan,
                                    })
                                    .then(res => {
                                      if (res.data.status == 200) {
                                        toast.show(res.data.message, {
                                          type: 'success',
                                        });
                                        getTransaksi();
                                      }
                                    });
                                },
                              },
                            ]);
                          }}
                        />
                      )}
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
            flex: 1,
            fontSize: 12,
          }}>
          Total Bayar
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[800],
            color: colors.black,
            fontSize: 15,
          }}>
          {formatRupiah(
            data.reduce((nominal_bayar, item) => {
              return nominal_bayar + parseInt(item.nominal_bayar);
            }, 0),
          )}
        </Text>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
            flex: 1,
            fontSize: 12,
          }}>
          Sisa Pinjaman
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[800],
            color: colors.success,
            fontSize: 15,
          }}>
          {formatRupiah(SISA)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main Container
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileContainer: {
    padding: 20,
  },

  // Profile Styles
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.black,
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.primary[400],
  },

  // Detail Section
  detailSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.primary,
    marginBottom: 15,
  },
  detailItem: {
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: fonts.secondary[400],
    color: colors.black,
  },

  // KTP Section
  ktpSection: {
    marginBottom: 20,
  },
  ktpImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  // Accordion Styles
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  accordionItem: {
    backgroundColor: '#fff',
    marginBottom: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  headerActive: {
    backgroundColor: '#e3f2fd',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  headerTextActive: {
    color: '#1976d2',
  },
  chevron: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  chevronActive: {
    color: '#1976d2',
  },
  contentContainer: {
    padding: 16,
    backgroundColor: '#fafafa',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  nominal: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 60,
  },
  badgeSuccess: {
    backgroundColor: '#e8f5e8',
    color: '#2e7d32',
  },
  badgeWarning: {
    backgroundColor: '#fff3e0',
    color: '#f57c00',
  },
  badgeInfo: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
  },
  badgePrimary: {
    backgroundColor: '#f3e5f5',
    color: '#7b1fa2',
  },
});
