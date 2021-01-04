import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Vibration,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-community/voice';

import Tts from 'react-native-tts';

type Props = {};
type State = {
  recognized: string,
  pitch: string,
  error: string,
  end: string,
  started: string,
  results: string[],
  partialResults: string[],
};

class MainScreen extends Component<Props, State> {
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: ['  음성 인식 내역이 없습니다. 음성 인식 시작을 누르고 주문하시고자 하는 가게명, 메뉴, 수량을 말씀해주세요.'],
    partialResults: [],
  };

  constructor(props: Props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;

    Tts.setDefaultLanguage('ko-KR');

    Tts.addEventListener('tts-start', (event) => console.log('start', event));
    Tts.addEventListener('tts-finish', (event) => console.log('finish', event));
    Tts.addEventListener('tts-cancel', (event) => console.log('cancel', event));
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    });
  };

  onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = (e: any) => {
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    Vibration.vibrate()
    Tts.speak("  주문하시고자 하는 가게명, 메뉴, 수량을 말씀해주세요.")
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });

    try {
      await Voice.start('ko-KR');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    Vibration.vibrate()
    Tts.speak("  ..음성인식이 종료되었습니다.")
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <Text style={styles.mainText}>안녕하세요.</Text>
          <Text style={styles.mainText}>도울이입니다.</Text>
        </View>
        <View style={styles.subcontainer}>
          {/*<Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
          <Text
            style={styles.stat}>{`Recognized: ${this.state.recognized}`}</Text>
          <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>
          <Text style={styles.stat}>{`End: ${this.state.end}`}</Text>*/}
          <TouchableOpacity 
          style={{alignSelf: 'center', marginTop: 90, marginBottom: 50,}}
          onPress={this._startRecognizing}>
            <Image
              style={{
                alignSelf: 'center',
                width: undefined,
                height: 120,
                aspectRatio: 1320 / 1973,
              }}
              source={require('../../assets/img/mic.png')}
            />
            <Text style={styles.detailText}>음성 인식 시작</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginBottom: 40}}>
            <TouchableOpacity
              style={{alignSelf: 'center', marginRight: 60}}
              onPress={
                this._stopRecognizing
              }>
              <Image
                style={{
                  width: undefined,
                  height: '30%',
                  aspectRatio: 980 / 980,
                  alignSelf: 'center',
                }}
                source={require('../../assets/img/stop.png')}
              />
              <Text style={styles.detailText}>음성 인식 종료</Text>
            </TouchableOpacity>
            {this.state.results.map((result, index) => {
              return (
                <TouchableOpacity
                  key={`result-${index}`}
                  onPress={ ()=> {
                    Tts.speak(result);
                  }}
                  style={{
                    marginLeft: 40,
                    alignSelf: 'center',
                  }}>
                  <Image
                    style={{
                      width: undefined,
                      height: '30%',
                      aspectRatio: 980 / 980,
                      alignSelf: 'center',
                    }}
                    source={require('../../assets/img/replay.png')}
                  />
                  <Text style={styles.detailText}>
                    음성 인식 결과 듣기
                    </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                flexDirection: 'row',
                marginLeft: 250,
              }}
              onPress={() => this.props.navigation.navigate('OrderCheck')}>
              <Image
                style={{
                  width: undefined,
                  height: '30%',
                  aspectRatio: 980 / 572,
                }}
                source={require('../../assets/img/next.png')}
              />
              <Text style={{marginLeft: 10, marginTop: 5, fontSize: 15}}>
                다음
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    backgroundColor: '#EDEAD9',
    height: '100%',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
  mainText: {
    alignSelf: 'center',
    fontSize: 20,
    letterSpacing: 3,
  },
  subcontainer: {
    marginTop: 50,
    alignSelf: 'center',
  },
  img: {
    width: 120,
    height: undefined,
    aspectRatio: 512 / 512,
    alignSelf: 'center',
  },
  detailText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 17,
  },
});

export default MainScreen;
