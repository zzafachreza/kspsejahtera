import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  Animated,
  Easing,
  Pressable,
  FlatList,
  Alert,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Card, Icon} from 'react-native-elements';
import {MyButton, MyHeader} from '../../components';
import {fonts, colors} from '../../utils';
import {apiURL, getData, MYAPP, webURL} from '../../utils/localStorage';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';

export default function DetialCostumer({navigation}) {
  // Data dummy customer
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [TMP, setTMP] = useState([]);
  const getTransaksi = () => {
    try {
      setLoading(true);
      getData('user').then(u => {
        setUser(u);
        axios
          .post(apiURL + 'anggota', {
            level: u.level,
            fid_petugas: u.level == 'Petugas' ? u.id_petugas : u.id_pengurus,
          })
          .then(res => {
            console.log(res.data);
            setData(res.data);
            setTMP(res.data);
          });
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getTransaksi();
    }
  }, [isFocused]);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const filterAnggota = (data, searchTerm) => {
    if (!searchTerm) return data;

    const filtered = data.filter(pelanggan => {
      const nama = pelanggan.nama_anggota.toLowerCase();
      const telepon = pelanggan.telepon_anggota;
      const search = searchTerm.toLowerCase();
      return nama.includes(search) || telepon.includes(search);
    });

    setData(filtered);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MyHeader title="Daftar Anggota" />

      <View
        style={{
          flex: 1,
          padding: 10,
        }}>
        <View>
          <TextInput
            onChangeText={x => {
              if (x.length == 0) {
                setData(TMP);
              } else {
                filterAnggota(data, x);
              }
            }}
            placeholder="Pencarian . . ."
            style={{
              paddingLeft: 10,
              fontFamily: fonts.secondary[600],
              backgroundColor: colors.primary + '21',
              borderRadius: 10,
              height: 40,
              marginBottom: 10,
            }}
          />
        </View>
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return (
              <TouchableNativeFeedback
                key={item.id_anggota}
                onPress={() => navigation.navigate('CekDetailCostumer', item)}>
                <View>
                  <Card containerStyle={styles.cardContainer}>
                    <Card.Title style={styles.cardTitle}>
                      {item.nama_anggota}
                    </Card.Title>
                    <Card.Divider />

                    <View style={styles.cardContent}>
                      <View style={styles.photoContainer}>
                        <FastImage
                          source={{uri: webURL + item.foto_anggota}}
                          style={styles.photoNasabah}
                        />
                        <FastImage
                          source={{
                            uri: webURL + item.foto_ktp,
                          }}
                          style={styles.photoKtp}
                        />
                      </View>

                      <View style={styles.detailContainer}>
                        <Text style={styles.detailText}>
                          <Text style={styles.label}>Nama Petugas:</Text>{' '}
                          {item.nama_petugas}
                        </Text>
                        <Text style={styles.detailText}>
                          <Text style={styles.label}>NIK KTP:</Text>{' '}
                          {item.nomor_ktp}
                        </Text>
                        <Text style={styles.detailText}>
                          <Text style={styles.label}>No Telepon:</Text>{' '}
                          {item.telepon_anggota}
                        </Text>
                        <Text style={styles.detailText}>
                          <Text style={styles.label}>Alamat:</Text>
                          {'\n'}
                          {item.alamat_anggota}
                        </Text>
                        <Text style={styles.detailText}>
                          <Text style={styles.label}>Terdaftar sejak:</Text>
                          {'\n'}
                          {moment(item.tanggal_daftar).format('DD MMMM YYYY')}
                        </Text>
                      </View>
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
                                link:
                                  webURL + 'anggota/edit2/' + item.id_anggota,
                                judul: 'Edit Anggota',
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
                              Alert.alert(
                                MYAPP,
                                'Apakah kamu akan hapus ini ?',
                                [
                                  {
                                    text: 'TIDAK',
                                  },
                                  {
                                    text: 'HAPUS',
                                    onPress: () => {
                                      console.log(item);
                                      axios
                                        .post(apiURL + 'delete', {
                                          modul: 'anggota',
                                          id: item.id_anggota,
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
                                ],
                              );
                            }}
                          />
                        </View>
                      </View>
                    )}
                  </Card>
                </View>
              </TouchableNativeFeedback>
            );
          }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 10,
        }}>
        <MyButton
          title="Tambah Anggota"
          onPress={() =>
            navigation.navigate('ShowWeb', {
              link:
                webURL +
                'anggota/add2/' +
                user.id_petugas +
                '?level=' +
                user.level,
              judul: 'Tambah Anggota',
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: 'left',
  },
  cardContent: {
    flexDirection: 'row',
  },
  photoContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  photoNasabah: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  photoKtp: {
    width: 120,
    height: 80,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detailContainer: {
    flex: 1,
  },
  detailText: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    fontFamily: fonts.primary[600],
    color: colors.black,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    alignItems: 'center',
  },
  mainButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  mainButtonIcon: {
    width: 30,
    height: 30,
  },
  optionButton: {
    position: 'absolute',
    right: 0,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 3,
    marginBottom: 10,
    width: 120,
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  menuText: {
    color: colors.white,
    fontFamily: fonts.primary[600],
    fontSize: 11,
  },
});
