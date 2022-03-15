import React, { useState, Component} from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import {AuthContainer, useAuth} from '../helpers/Auth';

/**
 * @returns L'écran de connexion au ldap de Centrale Nantes
 */
export default function LoginScreen(props) {
  const auth = useAuth();

  return <LoginScreenClass {...props} auth={auth} />;
}

/**
 * Ecran de connexion au ldap de Centrale Nantes
 */
class LoginScreenClass extends Component {
  state = {
    user: "",
    userError: "",
    password: "",
    passwordError: "",
    buttonText: "S'authentifier",
    buttonEnabled: true,
  }

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      navigation: props.navigation,
    };
  }

  loginPressed(auth) {
    if(!this.state.buttonEnabled) {
      return;
    }
    //On réinisialise les erreurs et on indique que ça charge
    this.setState({
      ...this.state,
      userError: "",
      passwordError: "",
      buttonText: "Chargement",
      buttonEnabled: false,
    });

    const emailError = emailValidator(this.state.user); //TODO revoir ça
    const passwordError = passwordValidator(this.state.password); 
    //Si il y a des problèmes dans les champs d'entrée, on affiche les erreurs
    if (emailError || passwordError) {
      this.setState({
        ...this.state,
        userError: emailError,
        passwordError: passwordError,
        buttonText: "S'authentifier",
        buttonEnabled: true,
      });
      return;
    }
  
    //On se login sur le ldap
    auth.login(this.state.user, this.state.password).then(result => {
      //console.log("Got authentication result "+result);
  
      //Si result est vide, l'authentification a marché, sinon on affiche le message d'erreur
      this.setState({
          ...this.state,
          userError: result,
          passwordError: result ? " " : "",
          buttonText: "S'authentifier",
          buttonEnabled: !result,
        });
    });
  }

  render() {
    const buttonPressed = () => this.loginPressed(this.props.auth);
    return (
      <Background>
        <Logo />
        <Header>Entrez vos identifiants</Header>
        <TextInput
          label="Identifiant centrale"
          returnKeyType="next"
          value={this.state.user}
          onChangeText={(text) => 
            this.setState({
              ...this.state,
              user: text,
            })}
          error={!!this.state.userError}
          errorText={this.state.userError}
          autoCapitalize="none"
          autoCompleteType="username"
          textContentType="username"
          keyboardType="default"
        />
        <TextInput
          label="Mot de passe"
          returnKeyType="done"
          value={this.state.password}
          onChangeText={(text) => 
            this.setState({
              ...this.state,
              password: text,
            })}
          error={!!this.state.passwordError}
          errorText={this.state.passwordError}
          secureTextEntry
        />
        <Button mode="contained" onPress={buttonPressed} enabled={this.state.buttonEnabled}>
          {this.state.buttonText}
        </Button>
      </Background>
    )
  }
}
