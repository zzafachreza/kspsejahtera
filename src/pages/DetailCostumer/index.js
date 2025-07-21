import { View, Text, ScrollView, Image, StyleSheet, TouchableNativeFeedback, Animated, Easing } from 'react-native'
import React, { useRef, useState } from 'react'
import {Card } from 'react-native-elements'
import { MyHeader } from '../../components'
import { fonts, colors } from '../../utils';


export default function DetialCostumer({navigation}) {
  // Data dummy customer
  const dummyCustomers = [
    {
      id: 1,
      emailPetugas: 'fdh@gmail.com',
      namaNasabah: 'Budi Santoso',
      nikKtp: '1234567890123456',
      noTelepon: '081234567890',
      photoNasabah: 'https://randomuser.me/api/portraits/men/1.jpg',
      photoKtp: '',
      alamat: 'Jl. Merdeka No. 123, Jakarta Pusat',
      tanggalMulai: '15 Januari 2023'
    },
    {
      id: 2,
      emailPetugas: 'petugas2@example.com',
      namaNasabah: 'Ani Wijaya',
      nikKtp: '2345678901234567',
      noTelepon: '082345678901',
      photoNasabah: 'https://randomuser.me/api/portraits/women/2.jpg',
      photoKtp: '',
      alamat: 'Jl. Sudirman No. 45, Jakarta Selatan',
      tanggalMulai: '20 Februari 2023'
    },
    {
      id: 3,
      emailPetugas: 'staff3@bank.com',
      namaNasabah: 'Rudi Hermawan',
      nikKtp: '3456789012345678',
      noTelepon: '083456789012',
      photoNasabah: 'https://randomuser.me/api/portraits/men/3.jpg',
      photoKtp: '',
      alamat: 'Jl. Thamrin No. 78, Jakarta Pusat',
      tanggalMulai: '5 Maret 2023'
    },
    {
      id: 4,
      emailPetugas: 'cs4@bank.co.id',
      namaNasabah: 'Siti Rahayu',
      nikKtp: '4567890123456789',
      noTelepon: '084567890123',
      photoNasabah: 'https://randomuser.me/api/portraits/women/4.jpg',
      photoKtp: '',
      alamat: 'Jl. Gatot Subroto No. 12, Jakarta Selatan',
      tanggalMulai: '10 April 2023'
    },
    {
      id: 5,
      emailPetugas: 'admin5@gmail.com',
      namaNasabah: 'Joko Prasetyo',
      nikKtp: '5678901234567890',
      noTelepon: '085678901234',
      photoNasabah: 'https://randomuser.me/api/portraits/men/5.jpg',
      photoKtp: '',
      alamat: 'Jl. Hayam Wuruk No. 56, Jakarta Barat',
      tanggalMulai: '25 Mei 2023'
    }
  ];

   const handleCustomerPress = (customer) => {
    navigation.navigate('CekDetailCostumer', { customer });
  };

   
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>
     <MyHeader title="Detail Kostumer"/>

     <ScrollView>
        <View style={{
            padding:10,
        }}>
            {dummyCustomers.map((customer) => (
              <TouchableNativeFeedback 
                key={customer.id} 
                onPress={() => handleCustomerPress(customer)}
              >
                <View>
                  <Card containerStyle={styles.cardContainer}>
                    <Card.Title style={styles.cardTitle}>{customer.namaNasabah}</Card.Title>
                    <Card.Divider />
                    
                    <View style={styles.cardContent}>
                      <View style={styles.photoContainer}>
                        <Image 
                          source={{ uri: customer.photoNasabah }} 
                          style={styles.photoNasabah}
                        />
                        <Image 
                          source={customer.photoKtp ? { uri: customer.photoKtp } : require('../../assets/noimg.png')} 
                          style={styles.photoKtp}
                        />
                      </View>
                      
                      <View style={styles.detailContainer}>
                        <Text style={styles.detailText}><Text style={styles.label}>Email Petugas:</Text> {customer.emailPetugas}</Text>
                        <Text style={styles.detailText}><Text style={styles.label}>NIK KTP:</Text> {customer.nikKtp}</Text>
                        <Text style={styles.detailText}><Text style={styles.label}>No Telepon:</Text> {customer.noTelepon}</Text>
                        <Text style={styles.detailText}><Text style={styles.label}>Alamat:</Text> {customer.alamat}</Text>
                        <Text style={styles.detailText}><Text style={styles.label}>Terdaftar sejak:</Text> {customer.tanggalMulai}</Text>
                      </View>
                    </View>
                  </Card>
                </View>
              </TouchableNativeFeedback>
            ))}
        </View>
     </ScrollView>

     
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
   fontFamily:fonts.primary[600],
    textAlign: 'left'
  },
  cardContent: {
    flexDirection: 'row'
  },
  photoContainer: {
    marginRight: 15,
    alignItems: 'center'
  },
  photoNasabah: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  photoKtp: {
    width: 120,
    height: 80,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  detailContainer: {
    flex: 1
  },
  detailText: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20
  },
  label: {
  fontFamily:fonts.primary[600],
    color:colors.black
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
    shadowOffset: { width: 0, height: 2 },
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
    width:120

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