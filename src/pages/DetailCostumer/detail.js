import { View, Text, Animated,  Easing, StyleSheet, TouchableNativeFeedback, Image} from 'react-native'
import React, { useRef, useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader } from '../../components'
import { ScrollView } from 'react-native'


export default function CekDetailCostumer({navigation, route}) {
      const { customer } = route.params;
  
       const [menuVisible, setMenuVisible] = useState(false);
      const animation = useRef(new Animated.Value(0)).current;

      
      const toggleMenu = () => {
        const toValue = menuVisible ? 0 : 1;
        
        Animated.spring(animation, {
          toValue,
          friction: 5,
          useNativeDriver: true,
        }).start();
        
        setMenuVisible(!menuVisible);
      };
    
      const pinStyle = {
        transform: [
          { scale: animation },
          {
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -80]
            })
          }
        ]
      };
    
      const option1Style = {
        transform: [
          { scale: animation },
          {
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -70]
            })
          }
        ]
      };
    
      const option2Style = {
        transform: [
          { scale: animation },
          {
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -130]
            })
          }
        ]
      };
    
      const rotation = {
        transform: [
          {
            rotate: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '45deg']
            })
          }
        ]
      };
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>
     <MyHeader title={customer.namaNasabah}/>

     <ScrollView>
        <View style={{
            padding:10,

        }}>

         <View style={styles.container}>
          <View style={styles.profileSection}>
            <Image 
              source={{ uri: customer.photoNasabah }} 
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{customer.namaNasabah}</Text>
              <Text style={styles.phone}>{customer.noTelepon}</Text>
            </View>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Informasi Pribadi</Text>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>NIK KTP</Text>
              <Text style={styles.detailValue}>{customer.nikKtp}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Alamat</Text>
              <Text style={styles.detailValue}>{customer.alamat}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Tanggal Terdaftar</Text>
              <Text style={styles.detailValue}>{customer.tanggalMulai}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Email Petugas</Text>
              <Text style={styles.detailValue}>{customer.emailPetugas}</Text>
            </View>
          </View>

          <View style={styles.ktpSection}>
            <Text style={styles.sectionTitle}>Foto KTP</Text>
            <Image 
              source={customer.photoKtp ? { uri: customer.photoKtp } : require('../../assets/noimg.png')} 
              style={styles.ktpImage}
            />
          </View>
        </View>
            
        </View>
     </ScrollView>
{/* Floating Action Button with Menu */}
     <View style={styles.fabContainer}>
        {/* Option 2 */}
        {menuVisible && (
          <Animated.View style={[styles.optionButton, option2Style]}>
            <TouchableNativeFeedback onPress={() => {
              toggleMenu();
              navigation.navigate("SomeScreen2");
            }}>
              <View style={[styles.menuButton, {backgroundColor: colors.primary}]}>
                <Image 
                  style={styles.menuIcon} 
                  source={require("../../assets/loan.png")} 
                />
                <Text style={styles.menuText}>Tambah Pinjaman</Text>
              </View>
            </TouchableNativeFeedback>
          </Animated.View>
        )}

        {/* Option 1 */}
        {menuVisible && (
          <Animated.View style={[styles.optionButton, option1Style]}>
            <TouchableNativeFeedback onPress={() => {
              toggleMenu();
              navigation.navigate("TambahKeuangan");
            }}>
              <View style={[styles.menuButton, {backgroundColor: colors.primary}]}>
                <Image 
                  style={styles.menuIcon} 
                  source={require("../../assets/finance.png")} 
                />
                <Text style={styles.menuText}>Tambah Keuangan</Text>
              </View>
            </TouchableNativeFeedback>
          </Animated.View>
        )}

        

        {/* Main Button */}
        <TouchableNativeFeedback onPress={toggleMenu}>
          <Animated.View style={[styles.mainButton, rotation]}>
            <Image 
              style={styles.mainButtonIcon} 
              source={require("../../assets/menu.png")} 
            />
          </Animated.View>
        </TouchableNativeFeedback>
     </View>

    </View>
  )
}


const styles = StyleSheet.create({
 
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

   container: {
    padding: 20,
  },
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
  
});