import React from 'react';
import { 
  KeyboardAvoidingView,
  Text, 
  TextInput, 
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';
import { handleLogin, registerUser } from '../actions/auth';


class Auth extends React.Component {
  state = { email: '', password: '', passwordConfirmation: '' }

  handleSubmit = () => {
    const { dispatch, history, type } = this.props
    const { email, password, passwordConfirmation } = this.state
    if (type === "Register")
      dispatch(registerUser(email, password, passwordConfirmation, history))
    else
      dispatch(handleLogin(email, password, history))
    this.setState({ email: '', password: '', passwordConfirmation: '' })
  }

  canSubmit = () => {
    const { email, password, passwordConfirmation } = this.state
    let submit = false
    let error
    // if (this.state.email && this.state.password)
    if (email && password)
      submit = true
    if (this.props.type === "Register") {
      if (!passwordConfirmation) {
        submit = false
      } else if ((password && passwordConfirmation) && passwordConfirmation !== password) {
        error = "Password Must Match"
        submit = false
        if (!this.state.error)
          this.setState({ error })
      } else {
        if (this.state.error)
          this.setState({ error: '' })
        submit = true
      }
    }
    return submit
  }

  render() {
    const { email, password, passwordConfirmation, error } = this.state
    const { type } = this.props
    const disabled = !this.canSubmit()
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        { error !== '' && <Text style={styles.error}>{error}</Text> }
        <Text style={styles.title}>{ type }</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          keyboardType="email-address"
          onChangeText={ (email) => this.setState({ email }) }
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          secureTextEntry={true}
          onChangeText={ (password) => this.setState({ password}) }
        />
        { type === "Register" &&
          <TextInput
            style={styles.input}
            placeholder="Password Confirmation"
            autoCapitalize="none"
            autoCorrect={false}
            value={passwordConfirmation}
            secureTextEntry={true}
            onChangeText={ (passwordConfirmation) => this.setState({ passwordConfirmation}) }
          />
        }
          <TouchableOpacity
            onPress={ disabled ? f => f : this.handleSubmit }
          >
            <Text style={styles.button}>{ type }</Text>
          </TouchableOpacity>
          <Link to={ type === "Register" ? "/login" : "/register" }>
            <Text style={styles.link}>
              { type === "Register" ? "Login" : "Register"}
            </Text>
          </Link>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: { color: 'red' },
    title: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    marginBottom: 10,
    backgroundColor: 'white',
    width: 300,
    fontSize: 20,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 40,
    fontSize: 20,
    lineHeight: 30,
    width: 300,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  },
  link: {
    color: 'lightblue',
    fontSize: 20,
  },
})

export default connect()(Auth);