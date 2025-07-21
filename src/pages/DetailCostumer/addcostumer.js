import { ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyCalendar, MyHeader, MyImageUpload, MyInput } from '../../components'

export default function TambahCostumer({navigation}) {
    const [kirim, setKirim] = useState({
        email:"",
        nama:"",
        nik:"",
        no_tlp:"",
        photo_nasabah:"",
        photo_ktp:"",
        alamat:"",
        tanggal_daftar:"",
    })
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white,
    }}>
    <MyHeader title="Tambah Kostumer"/>
    <ScrollView>
        <View style={{
            padding:20,

        }}>

        <MyInput label="Email Petugas" placeholder="Masukan Email Petugas..."/>
        <MyInput label="Nama Nasabah" placeholder="Masukan Nama Nasabah..."/>
        <MyInput label="NIK KTP" placeholder="Masukan NIK KTP..."/>
        <MyInput label="Nomor Telepon" placeholder="Masukan Nomor Telepon..."/>
        <MyImageUpload label="Photo Nasabah"/>
        <MyImageUpload label="Photo KTP"/>
        <MyInput label="Alamat" placeholder="Masukan Alamat Lengkap..."/>
        <MyCalendar label="Tanggal Mulai Terdaftar"/>
        
   
            <TouchableNativeFeedback>
                <View style={{
                    padding:10,
                    backgroundColor:colors.primary,
                    borderRadius:10,
                    alignItems:'center', 
                    marginTop:10
                }}>
                        <Text style={{
                            fontFamily:fonts.primary[600],
                            textAlign:'center',
                            color:colors.white
                        }}>Simpan</Text>
                </View>
            </TouchableNativeFeedback>
    
        </View>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})