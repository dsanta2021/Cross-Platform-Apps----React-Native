import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [ansValue, setAnsValue] = useState('');

  const handlePress = (value) => {
    if (value === 'DEL') {
      setInput((prev) => {
        if (prev.endsWith('ANS')) {
          return prev.slice(0, -3);
        }
        return prev.slice(0, -1);
      });
      setJustEvaluated(false);
      return;
    }

    if (justEvaluated) {
      if (/[0-9.]/.test(value) || value === '(' || value === 'ANS') {
        setInput(value);
        setResult('');
      } else {
        setInput(result + value);
        setResult('');
      }
      setJustEvaluated(false);
      return;
    }

    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
    setJustEvaluated(false);
  };

  const handleEqual = () => {
    try {
      const safeAns = ansValue && ansValue !== 'Error' ? ansValue : '0';
      const expression = input.replace(/ANS/g, `(${safeAns})`);
      const evalResult = eval(expression);
      setResult(evalResult.toString());
      setAnsValue(evalResult.toString());
      setJustEvaluated(true);
    } catch (error) {
      setResult('Error');
      setJustEvaluated(false);
    }
  };

  const renderButton = (label, onPress) => {
    let buttonStyle = styles.button;
    let textStyle = styles.buttonText;

    if (label === 'DEL' || label === 'AC') {
      buttonStyle = [styles.button, styles.buttonRed];
      textStyle = [styles.buttonText, styles.smallText];
    } else if (['+', '-', '*', '/'].includes(label)) {
      buttonStyle = [styles.button, styles.buttonOrange];
    } else if (label === 'ANS') {
      textStyle = [styles.buttonText, styles.smallText];
    } else if (label === '=') {
      buttonStyle = [styles.button, styles.buttonBlue];
    }

    return (
      <TouchableOpacity key={label} style={buttonStyle} onPress={() => onPress(label)}>
        <Text style={textStyle}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.display}>
        {justEvaluated ? (
          <>
            <Text style={styles.inputText}>{result}</Text>
            <Text style={styles.resultText}>{input}</Text>
          </>
        ) : (
          <>
            <Text style={styles.inputText}>{input}</Text>
            <Text style={styles.resultText}>{result}</Text>
          </>
        )}
      </View>

      <View style={styles.row}>
        {['7', '8', '9', 'DEL', 'AC'].map((item) =>
          renderButton(item, item === 'AC' ? handleClear : handlePress)
        )}
      </View>
      <View style={styles.row}>
        {['4', '5', '6', '*', '/'].map((item) => renderButton(item, handlePress))}
      </View>
      <View style={styles.row}>
        {['1', '2', '3', '+', '-'].map((item) => renderButton(item, handlePress))}
      </View>
      <View style={styles.row}>
        {['0', '.', 'ANS', '(', ')'].map((item) => renderButton(item, handlePress))}
      </View>
      <View style={styles.row}>
        {renderButton('=', handleEqual)}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    justifyContent: 'flex-end',
    padding: 20,
  },
  display: {
    marginBottom: 20,
  },
  inputText: {
    color: '#fff',
    fontSize: 36,
    textAlign: 'right',
  },
  resultText: {
    color: '#aaa',
    fontSize: 24,
    textAlign: 'right',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#333',
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  smallText: {
    fontSize: 18,
  },
  buttonBlue: {
    backgroundColor: '#204080',
  },
  buttonOrange: {
    backgroundColor: '#ffb300',
  },
  buttonRed: {
    backgroundColor: '#ff4444',
  },
});
