import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fonts} from '../../utils';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {apiURL, getData} from '../../utils/localStorage';

const {width} = Dimensions.get('window');

export default function Home({navigation}) {
  const [user, setUser] = useState({});
  const [member] = useState({});
  const [dashboard, setDashboard] = useState({
    anggota: 0,
    tagihan: 0,
    pembayaran: 0,
    status: 'Aktif',
  });

  const isFocused = useIsFocused();

  const getTransaksi = () => {
    try {
      getData('user').then(u => {
        console.log(u);
        setUser(u);
        axios
          .post(apiURL + 'dashboard', {
            level: u.level,
            fid_petugas: u.level == 'Petugas' ? u.id_petugas : u.id_pengurus,
          })
          .then(res => {
            console.log(res.data);
            setDashboard(res.data);
          });
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    if (isFocused) {
      getTransaksi();
    }
  }, [isFocused]);
  const formatRupiah = amount => {
    return `Rp ${parseInt(amount).toLocaleString('id-ID')}`;
  };
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.headerGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Selamat datang,</Text>
            <Text style={styles.greetingText}>
              {user.nama_petugas || 'User'}
            </Text>
          </View>
          <FastImage
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

      {dashboard.status == 'Aktif' && (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          {/* Product Cards */}
          <View style={styles.productsContainer}>
            <View
              style={{
                padding: 10,

                marginTop: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: colors.primary,
                  width: '100%',
                  borderRadius: 10,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                      }}
                      source={require('../../assets/members_icon.png')}
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        fontFamily: fonts.primary[600],
                        color: colors.white,
                        fontSize: 18,
                        textAlign: 'center',
                      }}>
                      Jumlah Angota
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.primary[600],
                        color: colors.white,
                        fontSize: 20,
                        textAlign: 'center',
                      }}>
                      {dashboard.anggota}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  backgroundColor: colors.primary,
                  padding: 10,
                  borderRadius: 10,
                  width: '100%',
                  marginBottom: 10,
                }}>
                <View>
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                    }}
                    source={require('../../assets/bill.png')}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      fontFamily: fonts.primary[600],
                      color: colors.white,
                      fontSize: 18,
                    }}>
                    Total Tagihan
                  </Text>

                  <Text
                    style={{
                      fontFamily: fonts.primary[600],
                      color: colors.white,
                      fontSize: 20,
                    }}>
                    {formatRupiah(dashboard.tagihan)}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  backgroundColor: colors.primary,
                  padding: 10,
                  borderRadius: 10,
                  width: '100%',
                  marginBottom: 10,
                }}>
                <View>
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                    }}
                    source={require('../../assets/payment.png')}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      fontFamily: fonts.primary[600],
                      color: colors.white,
                      fontSize: 18,
                    }}>
                    Pembayaran
                  </Text>

                  <Text
                    style={{
                      fontFamily: fonts.primary[600],
                      color: colors.white,
                      fontSize: 20,
                      textAlign: 'center',
                    }}>
                    {formatRupiah(dashboard.pembayaran)}
                  </Text>
                </View>
              </View>

              <TouchableNativeFeedback
                onPress={() => navigation.navigate('DetailCostumer')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: colors.primary,
                    padding: 10,
                    borderRadius: 10,
                    width: '100%',
                    marginBottom: 10,
                  }}>
                  <View>
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                      }}
                      source={require('../../assets/costumer.png')}
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        fontFamily: fonts.primary[600],
                        color: colors.white,
                        fontSize: 18,
                      }}>
                      Daftar Anggota
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </ScrollView>
      )}

      {dashboard.status !== 'Aktif' && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            padding: 20,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[800],
              textAlign: 'center',
              fontSize: 30,
              lineHeight: 50,
            }}>
            Maaf Apliasi saat ini dalam kondisi{' '}
            <Text
              style={{
                backgroundColor: colors.danger,
                color: colors.white,
              }}>
              {' Tidak Aktif '}
            </Text>
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerGradient: {
    paddingBottom: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    top: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  greetingText: {
    fontFamily: fonts.secondary[600],
    fontSize: 20,
    color: 'white',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  productsContainer: {
    padding: 10,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  productInfo: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignSelf: 'stretch',
  },
  productName: {
    fontFamily: fonts.secondary[700],
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});
