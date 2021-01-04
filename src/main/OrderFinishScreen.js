import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
  } from 'react-native';
  
export default class OrderCheckScreen extends Component {
    render(){
      return(
          <View style={styles.container}>
              <View style={{marginTop: 300}}>
                <Text style={styles.finishText}>주문이 완료되었습니다. </Text>
                <Text style={styles.finishText}>해당 주문은 가게로 전송됩니다.</Text>
              </View>
              <View>
                  <TouchableOpacity
                  style={{marginTop: 30, alignSelf:'center', backgroundColor: '#91888C', borderRadius:12,}}
                  onPress={()=>{
                      this.props.navigation.navigate("Main")
                  }}>
                      <Text style={{fontSize: 17, color:'white', margin: 10,}}>메인 홈으로 가기</Text>
                  </TouchableOpacity>
              </View>
          </View>
      )
    }
}
const styles = StyleSheet.create({
    container: {
      //flexDirection: 'column',
      //alignSelf: 'center',
      backgroundColor: '#EDEAD9',
      height: '100%'
    },
    finishText: {
        alignSelf: 'center',
        fontSize: 20,
        marginBottom: 15,
    }
  })