import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { auth, googleProvider } from '../firebaseConfig'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default function Login() {
  const navigate = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  console.log('email: ', email, 'password: ', password)

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget

    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const isEmailOrPasswordWrong = () => {
    if (!email || !password) {
      window.alert('Email or password cannot be empty!')
      setEmail('')
      setPassword('')
      return true
    }
    return false
  }

  return (
    <ContainerWrapper>
      <Brand>
        <Title> waist </Title>
        <SubTitle>adding measurements daily</SubTitle>
      </Brand>

      <LoginContainer>
        <CardContainer>
          <CardTitle>SIGN IN</CardTitle>
          <CardBody>
            <Form style={{ width: '100%' }}>
              <Input
                type="text"
                placeholder="email"
                name="email"
                value={email}
                onChange={(event) => onChangeHandler(event)}
              />
              <Input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={(event) => onChangeHandler(event)}
              />
              <LoginButton
                block
                variant="light"
                onClick={async () => {
                  if (isEmailOrPasswordWrong()) return
                  await auth.signInWithEmailAndPassword(email, password)
                  localStorage.setItem('user', auth.currentUser.uid)
                  navigate.push('/dashboard')
                }}
              >
                Login
              </LoginButton>
              <LoginButton
                block
                variant="light"
                onClick={async () => {
                  await auth.signInWithPopup(googleProvider)
                  localStorage.setItem('user', auth.currentUser.uid)
                  navigate.push('/dashboard')
                }}
              >
                Log In with Google
              </LoginButton>
              <Text>Not a member?</Text>
              <SingUpLink
                variant="link"
                onClick={async () => {
                  await auth.createUserWithEmailAndPassword(email, password)
                  localStorage.setItem('user', auth.currentUser.uid)
                  navigate.push('/dashboard')
                }}
              >
                Sign up
              </SingUpLink>
            </Form>
          </CardBody>
        </CardContainer>
      </LoginContainer>
    </ContainerWrapper>
  )
}

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin: 0px 50px 0px 100px;
`

const ContainerWrapper = styled(Container)`
  display: flex;
  justify-content: center;
  height: 100vh;
`

const Title = styled.div`
  font-size: 8em;
  font-weight: bold;
  font-family: 'Questrial', sans-serif;
  color: #f3591e;
`
const SubTitle = styled.div`
  font-size: 1.8em;
  color: #65656b;
`

const CardContainer = styled(Card)`
  width: 450px;
  padding: 40px;
  border-radius: 25px;
`

const LoginButton = styled(Button)`
  border-color: #f3591e;
  background-color: #f3591e;
  color: #fff;
  -webkit-box-shadow: 0 10px 6px -6px #777;
  -moz-box-shadow: 0 10px 6px -6px #777;
  box-shadow: 0 5px 20px -6px #777;
`
const Brand = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 100px 100px 0px;
`
const CardTitle = styled(Card.Title)`
  font-size: 30px;
  margin-bottom: 30px;
`
const CardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SingUpLink = styled.div`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`

const Input = styled(Form.Control)`
  margin: 1em 0 1em 0;
`

const Text = styled.div`
  margin-top: 2em;
`
