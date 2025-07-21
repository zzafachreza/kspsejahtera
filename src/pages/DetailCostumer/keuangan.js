import { ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyCalendar, MyHeader, MyImageUpload, MyInput } from '../../components'

export default function TambahKeuangan({navigation}) {
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
    <MyHeader title="Tambah Keuangan"/>
    <ScrollView>
        <View style={{
            padding:20,

        }}>

        <MyInput label="Nmaa Petugas" placeholder="Masukan Nama Petugas..."/>
        <MyCalendar label="Tanggal Awal" placeholder="Masukan Tanggal Awal"/>
        <MyCalendar label="Tanggal Akhir" placeholder="Masukan Tanggal Akhir"/>
        
   
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