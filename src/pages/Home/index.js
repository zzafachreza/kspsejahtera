import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, TouchableNativeFeedback} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fonts} from '../../utils';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Image } from 'react-native';

const {width} = Dimensions.get('window');

export default function Home({navigation}) {
  const [user] = useState({});
 const [member] = useState({})

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
            <Text style={styles.greetingText}>{user.nama_lengkap || 'User'}</Text>
          </View>
          <FastImage
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Product Cards */}
        <View style={styles.productsContainer}>
         
      


        <View style={{
          padding:10,
    
          marginTop:20,
          flexDirection:"column"
          ,justifyContent:'space-between',
          alignItems:'center',
          
        }}>

            <View style={{
            padding:10,
            backgroundColor:colors.primary,
            width:'100%',
            borderRadius:10,
            marginBottom:10
          }}>

         <View style={{
          flexDirection:'row',
          justifyContent:"space-around",
          alignItems:'center'
         }}>
 <View>
            <Image style={{
              width:70,
              height:70,
            }} source={require("../../assets/members_icon.png")}/>
          </View>


            <View>
              <Text style={{
                fontFamily:fonts.primary[600],
                color:colors.white,
                fontSize:18,
                textAlign:'center'
              }}>Jumlah Member</Text>
               <Text style={{
                fontFamily:fonts.primary[600],
                color:colors.white,
                fontSize:20,
                textAlign:"center"
              }}>400</Text>
            </View>
         </View>
          </View>


          <View style={{
            flexDirection:'row',
            justifyContent:"space-around",
            alignItems:'center',
            backgroundColor:colors.primary,
            padding:10,
            borderRadius:10,
            width:'100%',
            marginBottom:10
          }}>
            <View>
              <Image style={{
                width:70,
                height:70,
              }} source={require("../../assets/bill.png")}/>
            </View>

            <View>
              <Text style={{
                fontFamily:fonts.primary[600],
                color:colors.white,
                fontSize:18,
                
              }}>Total Tagihan</Text>

                 <Text style={{
                fontFamily:fonts.primary[600],
                color:colors.white,
                fontSize:20,
                
              }}>Rp25.000.000</Text>
            </View>
          </View>



   <View style={{
            flexDirection:'row',
            justifyContent:"space-around",
            alignItems:'center',
            backgroundColor:colors.primary,
            padding:10,
            borderRadius:10,
            width:'100%',
            marginBottom:10,
          }}>
            <View>
              <Image style={{
                width:70,
                height:70,
              }} source={require("../../assets/payment.png")}/>
            </View>

            <View>
              <Text style={{
                fontFamily:fonts.primary[600],
                color:colors.white,
                fontSize:18,
                
              }}>Pembayaran</Text>

                 <Text style={{
                fontFamily:fonts.primary[600],
                color:colors.white,
                fontSize:20,
                textAlign:'center'
                
              }}>Rp1.805.000</Text>
            </View>
          </View>

              
              <TouchableNativeFeedback onPress={() => navigation.navigate("DetailCostumer")}>
                  <View style={{
            flexDirection:'row',
            justifyContent:"space-around",
            alignItems:'center',
            backgroundColor:colors.primary,
            padding:10,
            borderRadius:10,
            width:'100%',
            marginBottom:10,
          }}>
            <View>
              <Image style={{
                width:70,
                height:70,
              }} source={require("../../assets/costumer.png")}/>
            </View>

            <View>
              <Text style={{
                fontFamily:fonts.primary[600],
                color:colors.white,
                fontSize:18,
                
              }}>Detail Costumer</Text>

            
            </View>            
          </View>
              </TouchableNativeFeedback>
        


        </View>

        </View>
      </ScrollView>
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
    top: 10
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
    padding:10
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
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