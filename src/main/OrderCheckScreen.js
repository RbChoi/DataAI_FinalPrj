import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
  } from 'react-native';
import Tts from 'react-native-tts'
import { color } from 'react-native-reanimated';
export default class OrderCheckScreen extends Component {
    render(){
      return(
        <View style={styles.container}>
          <View style={styles.mainView}>
            <Text style={styles.mainText}>도울이</Text>
            <Text style={styles.mainText}>주문 확인 중</Text>
          </View>
          <View style={styles.orderView}>
            <View style={{alignSelf: 'center', marginTop: 40,}}>
              <Text style={{fontSize: 23, marginTop: 30, fontWeight: 'bold'}}>당신의 주문서</Text>
            </View>
            <View style={{alignSelf: 'flex-start', marginTop: 80, marginLeft: 40,}}>
              <View style={styles.detailView}>
                <Text style={styles.detailText}>가게명 </Text>
                <Text style={styles.subdetailText}>카페코지</Text>
              </View>
              <View style={styles.detailView}>
                <Text style={styles.detailText}>상품명 </Text>
                <Text style={styles.subdetailText}>코커스</Text>
              </View>
              <View style={styles.detailView}>
                <Text style={styles.detailText}>수량 </Text>
                <Text style={styles.subdetailText}>한 잔</Text>
              </View>
            </View>
            <Text style={styles.checkText}>주문하신 내용이 맞습니까?</Text>
            <View style={styles.buttonView}>
              <TouchableOpacity
              style={[styles.bnt, {marginRight: 25,}]}
              onPress = {() => {
                Tts.speak("주문이 완료되었습니다. 해당 주문은 가게로 전송됩니다.")
                this.props.navigation.navigate("OrderFinish")
                }}>
                <Text style={[styles.subdetailText, {color:'white', margin: 10,marginTop: 9,}]}>주문 완료</Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={styles.bnt}
              onPress = {() => {
                this.props.navigation.navigate("Main")
                }}>
                <Text style={[styles.subdetailText, {color:'white', margin: 10, marginTop: 9,}]}>다시 주문하기</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      );
  };
}
const styles = StyleSheet.create({
  container: {
    //flexDirection: 'column',
    //alignSelf: 'center',
    backgroundColor: '#EDEAD9',
  },
  mainView: {
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center'
  },
  orderView: {
    height: '90%',
    backgroundColor: 'white',
    marginRight: 10,
    marginLeft: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  buttonView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  detailView: {
    flexDirection: 'row', 
    marginBottom: 40,
  },
  detailText: {
    fontSize: 20, 
    fontWeight: 'bold', 
    marginRight: 50,
  },
  mainText: {
    alignSelf: 'center',
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  subdetailText: {
    marginTop: 5,
    fontSize: 17,
  },
  checkText: {
    fontSize: 23, 
    fontWeight: 'bold', 
    alignSelf:'center', 
    marginTop: 90, 
    marginBottom: 40,
  },
  bnt: {
    alignSelf:'center', 
    backgroundColor: '#91888C', 
    borderRadius:12,
  }
})
