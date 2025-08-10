import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Linking,
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
import {Icon} from 'react-native-elements';

export default function CekDetailCostumer({navigation, route}) {
  const ITEM = route.params;
  const [data, setData] = useState({
    tabungan: [],
    simpanan: [],
    pinjaman: [],
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const isFocused = useIsFocused();

  const getTransaksi = () => {
    try {
      setLoading(true);
      axios
        .post(apiURL + 'transaksi', {
          fid_anggota: ITEM.id_anggota,
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
  const [user, setUser] = useState({});
  useEffect(() => {
    if (isFocused) {
      getData('user').then(u => setUser(u));
      getTransaksi();
    }
  }, [isFocused]);

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

  const toggleTab = tabName => {
    setActiveTab(activeTab === tabName ? null : tabName);
  };

  const renderTabunganContent = () => (
    <View style={styles.contentContainer}>
      <View
        style={{
          paddingVertical: 10,
        }}>
        {user.level == 'Pengurus' && (
          <MyButton
            title="Tambah Tabungan"
            onPress={() => {
              navigation.navigate('ShowWeb', {
                link: webURL + 'tabungan/add2/' + ITEM.id_anggota,
                judul: 'Tambah Tabungan',
              });
            }}
          />
        )}
      </View>
      {data.tabungan.map((item, index) => (
        <View key={item.id_tabungan} style={styles.itemCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Nominal:</Text>
            <Text style={[styles.value, styles.nominal]}>
              {formatRupiah(item.nominal)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tanggal:</Text>
            <Text style={styles.value}>
              {formatDate(item.tanggal_tabungan)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tipe:</Text>
            <Text
              style={[
                styles.value,
                styles.badge,
                item.tipe_tabungan === 'Setor'
                  ? styles.badgeSuccess
                  : styles.badgeInfo,
              ]}>
              {item.tipe_tabungan}
            </Text>
          </View>
          {user.level == 'Pengurus' && (
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
                      link: webURL + 'tabungan/edit2/' + item.id_tabungan,
                      judul: 'Edit Tabungan',
                    })
                  }
                />
              </View>
              <View
                style={{
                  flex: 1,
                }}>
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
                              modul: 'tabungan',
                              id: item.id_tabungan,
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
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderSimpananContent = () => (
    <View style={styles.contentContainer}>
      <View
        style={{
          paddingVertical: 10,
        }}>
        {user.level == 'Pengurus' && (
          <MyButton
            title="Tambah Simpanan"
            onPress={() => {
              navigation.navigate('ShowWeb', {
                link: webURL + 'simpanan/add2/' + ITEM.id_anggota,
                judul: 'Tambah Simpanan',
              });
            }}
          />
        )}
      </View>
      {data.simpanan.map((item, index) => (
        <View key={item.id_simpanan} style={styles.itemCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Nominal:</Text>
            <Text style={[styles.value, styles.nominal]}>
              {formatRupiah(item.nominal)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tanggal:</Text>
            <Text style={styles.value}>
              {formatDate(item.tanggal_simpanan)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tipe:</Text>
            <Text
              style={[
                styles.value,
                styles.badge,
                item.tipe_simpanan === 'Wajib'
                  ? styles.badgeWarning
                  : styles.badgePrimary,
              ]}>
              {item.tipe_simpanan}
            </Text>
          </View>

          {user.level == 'Pengurus' && (
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
                      link: webURL + 'simpanan/edit2/' + item.id_simpanan,
                      judul: 'Edit Simpanan',
                    })
                  }
                />
              </View>
              <View
                style={{
                  flex: 1,
                }}>
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
                              modul: 'simpanan',
                              id: item.id_simpanan,
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
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderPinjamanContent = () => (
    <View style={styles.contentContainer}>
      <View
        style={{
          paddingVertical: 10,
        }}>
        {ITEM.boleh_pinjam > 0 && (
          <MyButton
            title="Tambah Pinjaman"
            onPress={() => {
              navigation.navigate('ShowWeb', {
                link: webURL + 'pinjaman/add2/' + ITEM.id_anggota,
                judul: 'Tambah Pinjaman',
              });
            }}
          />
        )}

        {ITEM.boleh_pinjam == 0 && (
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 12,
              textAlign: 'center',
              color: colors.danger,
            }}>
            Masih ada pinjaman yang belum lunas
          </Text>
        )}
      </View>

      {data.pinjaman.map((item, index) => (
        <TouchableWithoutFeedback
          onPress={() => {
            if (item.status_pinjaman == 'Diterima') {
              navigation.navigate('TambahKeuangan', item);
            } else {
              toast.show('Status pinjaman ' + item.status_pinjaman);
            }
          }}>
          <View key={item.id_pinjaman} style={styles.itemCard}>
            <View style={styles.row}>
              <Text style={styles.label}>Nama Anggota:</Text>
              <Text style={styles.value}>{item.nama_anggota}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tanggal Pinjaman:</Text>
              <Text style={styles.value}>
                {moment(item.tanggal_pinjaman).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tanggal Pencairan:</Text>
              <Text style={styles.value}>
                {item.tanggal_pencairan == null
                  ? '-'
                  : moment(item.tanggal_pencairan).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Jatuh Tempo:</Text>
              <Text style={styles.value}>
                {item.jatuh_tempo == null
                  ? '-'
                  : moment(item.jatuh_tempo).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Skema:</Text>
              <Text style={styles.value}>{item.nama_skema}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Nominal Pinjaman:</Text>
              <Text style={[styles.value, styles.nominal]}>
                {formatRupiah(item.nominal_pinjaman)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Diterima:</Text>
              <Text style={[styles.value, styles.nominal]}>
                {formatRupiah(item.nominal_diterima)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Cicilan:</Text>
              <Text style={[styles.value, styles.nominal]}>
                {formatRupiah(item.nominal_cicilan)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Total:</Text>
              <Text style={[styles.value, styles.nominal]}>
                {formatRupiah(item.nominal_total)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tenor:</Text>
              <Text style={styles.value}>{item.tenor}x</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Status:</Text>
              <Text
                style={[
                  styles.value,
                  styles.badge,
                  item.status_pinjaman == 'Diterima'
                    ? styles.badgeSuccess
                    : styles.badgeWarning,
                ]}>
                {item.status_pinjaman}
              </Text>
            </View>
            {item.status_pinjaman != 'Diterima' && user.level == 'Pengurus' && (
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
                            modul: 'pinjaman',
                            id: item.id_pinjaman,
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
        </TouchableWithoutFeedback>
      ))}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <MyHeader title={ITEM.nama_anggota} />

      <ScrollView>
        <View style={styles.profileContainer}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <FastImage
              source={{uri: webURL + ITEM.foto_anggota}}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{ITEM.nama_anggota}</Text>
              <Text style={styles.phone}>{ITEM.telepon_anggota}</Text>
              <TouchableOpacity
                onPress={() => {
                  let no = ITEM.telepon_anggota;

                  // Jika nomor diawali 0, ubah jadi 62
                  if (no.startsWith('0')) {
                    no = '62' + no.slice(1);
                  }

                  Linking.openURL('https://wa.me/' + no);
                }}
                style={{
                  borderRadius: 5,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.success,
                  // width: 100,
                }}>
                <Icon
                  color={colors.white}
                  type="ionicon"
                  name="logo-whatsapp"
                />
                <Text
                  style={{
                    left: 5,
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                  }}>
                  Whatsapp
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Detail Section */}
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Informasi Pribadi</Text>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>NIK KTP</Text>
              <Text style={styles.detailValue}>{ITEM.nomor_ktp}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Alamat</Text>
              <Text style={styles.detailValue}>{ITEM.alamat_anggota}</Text>
              <TouchableOpacity
                onPress={() => {
                  let lihatGoogleMaps = ITEM.alamat_anggota;

                  Linking.openURL(
                    'https://www.google.com/maps/place/' + lihatGoogleMaps,
                  );
                }}
                style={{
                  borderRadius: 5,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.danger,
                  // width: 100,
                }}>
                <Icon
                  color={colors.white}
                  type="ionicon"
                  name="location-outline"
                />
                <Text
                  style={{
                    left: 5,
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                  }}>
                  Lihat Lokasi di Google Maps
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Tanggal Terdaftar</Text>
              <Text style={styles.detailValue}>
                {moment(ITEM.tanggal_daftar).format('DD MMMM YYYY')}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Nama Petugas</Text>
              <Text style={styles.detailValue}>{ITEM.nama_petugas}</Text>
            </View>
          </View>

          {/* KTP Section */}
          <View style={styles.ktpSection}>
            <Text style={styles.sectionTitle}>Foto KTP</Text>
            <FastImage
              source={{uri: webURL + ITEM.foto_ktp}}
              style={styles.ktpImage}
            />
          </View>
        </View>

        {/* Accordion Section */}
        <Text style={styles.title}>Data Keuangan Anggota</Text>

        {/* Tabungan Accordion */}
        <View style={styles.accordionItem}>
          <TouchableOpacity
            style={[
              styles.header,
              activeTab === 'tabungan' && styles.headerActive,
            ]}
            onPress={() => toggleTab('tabungan')}>
            <Text
              style={[
                styles.headerText,
                activeTab === 'tabungan' && styles.headerTextActive,
              ]}>
              📊 Tabungan ({data.tabungan.length})
            </Text>
            <Text
              style={[
                styles.chevron,
                activeTab === 'tabungan' && styles.chevronActive,
              ]}>
              {activeTab === 'tabungan' ? '▼' : '▶'}
            </Text>
          </TouchableOpacity>
          {activeTab === 'tabungan' && renderTabunganContent()}
        </View>

        {/* Simpanan Accordion */}
        <View style={styles.accordionItem}>
          <TouchableOpacity
            style={[
              styles.header,
              activeTab === 'simpanan' && styles.headerActive,
            ]}
            onPress={() => toggleTab('simpanan')}>
            <Text
              style={[
                styles.headerText,
                activeTab === 'simpanan' && styles.headerTextActive,
              ]}>
              💰 Simpanan ({data.simpanan.length})
            </Text>
            <Text
              style={[
                styles.chevron,
                activeTab === 'simpanan' && styles.chevronActive,
              ]}>
              {activeTab === 'simpanan' ? '▼' : '▶'}
            </Text>
          </TouchableOpacity>
          {activeTab === 'simpanan' && renderSimpananContent()}
        </View>

        {/* Pinjaman Accordion */}
        <View style={styles.accordionItem}>
          <TouchableOpacity
            style={[
              styles.header,
              activeTab === 'pinjaman' && styles.headerActive,
            ]}
            onPress={() => toggleTab('pinjaman')}>
            <Text
              style={[
                styles.headerText,
                activeTab === 'pinjaman' && styles.headerTextActive,
              ]}>
              🏦 Pinjaman ({data.pinjaman.length})
            </Text>
            <Text
              style={[
                styles.chevron,
                activeTab === 'pinjaman' && styles.chevronActive,
              ]}>
              {activeTab === 'pinjaman' ? '▼' : '▶'}
            </Text>
          </TouchableOpacity>
          {activeTab === 'pinjaman' && renderPinjamanContent()}
        </View>
      </ScrollView>
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
    fontFamily: fonts.primary[600],
    color: colors.black,
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
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
