import * as dotenv from 'dotenv';
dotenv.config();
import React, { useState } from 'react';
import styles from '../styles/LoginScreen.style';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { TextInput, Text, View } from 'react-native';
import { RootStackScreenProps } from '../types';
import Joi from 'joi'

const API_URL = process.env.URL || 'http://127.0.0.1:8000'

const LoginScreen = ({ navigation }: RootStackScreenProps<'Login'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')

  const schema = Joi.object({
    emailCliente: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    senhaCliente: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
  })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const packets = {
      emailCliente: email,
      senhaCliente: password 
    }

    if (schema.validate(packets)) {
      await axios({
        method: 'post',
        url: `${API_URL}/api/loginCliente`,
        headers: {
          'Accept':   'application/json',
          'Content-Type':   'application/json'
        },
        data: JSON.stringify({
          emailCliente: email,
          senhaCliente: password
        })
      })
        .then(
          response => console.log('Response: ' + JSON.stringify(response.data))
        )
        .catch(error => console.log("ERROR:: " + JSON.stringify(error.response.data)))
    } else {
      setMessage('Preencha todos os campos corretamente')
    }
  }
  
  return (
    <View style={styles.container}>
      <Form onSubmit={handleSubmit}>
      <Form.Label style={{
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#963333',
      }}>Login</Form.Label>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <br></br>
            <TextInput style={ styles.formInput } onChangeText={ (text: any) => setEmail(text) } placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <br></br>
            <TextInput style={ styles.formInput } secureTextEntry={true} onChangeText={ (text: any) => setPassword(text) } placeholder="Password" />
          </Form.Group>
          <Button variant="outline-danger" type="submit">
            Entrar
          </Button>

          <View style={{ marginVertical: '5%' }}>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Text style={{
              color: '#000000'
          }} onPress={() => navigation.navigate('Register')}>
              Não possui uma conta? <Text style={{color: '#963333'}}>Cadastre-se</Text>
              </Text>
          </Form.Group>
          </View>

        </Form>
    </View>
  );
}

export default LoginScreen


