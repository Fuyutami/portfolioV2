import React, { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import emailjs from "@emailjs/browser"

import { blinkEnter1, blinkExit } from "../other/animations"
import Theme from "../other/Theme"

import {
  TextName,
  TextHi,
  TextMail,
  TextMessage,
  TextSend,
  Thankyou,
} from "../other/Vectors"

const Container = styled.div`
  padding: 2rem;
  position: absolute;
  z-index: -100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: ${({ state }) => {
      switch (state) {
        case "entering":
          return
        case "entered":
          return blinkEnter1
        case "exiting":
          return blinkExit
        case "exited":
          return
      }
    }}
    0.3s step-end forwards;
  ${({ state }) => {
    switch (state) {
      case "entering":
        return
      case "entered":
        return "animation-delay: .5s"
      case "exiting":
        return
      case "exited":
        return
    }
  }};
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 60%;
  max-width: 500px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const TextWrapper = styled.div`
  margin-bottom: 3rem;
`
const Text = styled(TextHi)`
  max-width: 300px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  & > path {
    fill: ${Theme.text};
  }
`
const FieldS = styled.div`
  position: relative;
  width: 100%;
  height: 33px;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
`
const InputS = styled.input`
  border: 1px solid;
  border-color: ${(props) =>
    !props.showError ? Theme.text : !props.isValid ? Theme.error : Theme.text};
  border-radius: 5px;
  position: relative;
  padding: 1.2rem 1rem;
  width: 100%;
  height: 100%;
  color: ${Theme.text};
  box-shadow: 0 0 0px 1000px ${Theme.background} inset;
  -webkit-text-fill-color: ${Theme.text};
  font-family: "Courier New", Courier, monospace;

  &:focus {
    outline: none;
  }
  &:active {
  }
`

const FieldL = styled.div`
  position: relative;
  width: 100%;
  height: 130px;
  margin-top: 0.5rem;
  margin-bottom: 4rem;
`
const InputMsg = styled.textarea`
  border: 1px solid;
  border-color: ${(props) =>
    !props.showError ? Theme.text : !props.isValid ? Theme.error : Theme.text};
  border-radius: 5px;
  background-color: transparent;
  padding: 1.2rem 1rem;
  position: relative;
  width: 100%;
  height: 100%;
  color: ${Theme.text};
  resize: none;
  font-family: "Courier New", Courier, monospace;

  &:focus {
    outline: none;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
    border-radius: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${Theme.inactiveSkill};
    border-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${Theme.text2};
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${Theme.text};
  }
`
const Btn = styled.button`
  display: flex;
  background-color: ${(props) =>
    props.inactive ? Theme.inactiveSkill : Theme.text};
  border: none;
  border-radius: 10px;
  align-self: flex-start;
  padding: 1rem 4rem;
  cursor: pointer;
`

const Contact = (props) => {
  const form = React.createRef()
  const navigate = useNavigate()
  const [state, setState] = useState({
    user_name: "",
    user_email: "",
    message: "",
    nameValid: false,
    emailValid: false,
    messageValid: false,
    formValid: false,
    submitted: false,
    showErrors: false,
  })

  useEffect(() => {
    validate()
  }, [state.user_name, state.user_email, state.message])

  useEffect(() => {
    if (state.submitted === false) return
    const timer = setTimeout(() => {
      navigate("/")
    }, 2000)
    return () => clearTimeout(timer)
  }, [state.submitted])

  const handleUserInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const nameIsValid = state.user_name != ""
    const emailIsValid = /\S+@\S+\.\S+/.test(state.user_email.toLowerCase())
    const messageIsValid = state.message != ""
    const formIsValid = nameIsValid && emailIsValid && messageIsValid

    setState((prev) => ({
      ...prev,
      nameValid: nameIsValid,
      emailValid: emailIsValid,
      messageValid: messageIsValid,
      formValid: formIsValid,
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    console.log(process.env.EMAILJS_SERVICE_ID)
    emailjs
      .sendForm(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.EMAILJS_KEY,
        }
      )
      .then(
        () => {
          console.log("SUCCESS!")
        },
        (error) => {
          console.log("FAILED...", error.text)
        }
      )

    if (!state.formValid) {
      setState((prev) => ({
        ...prev,
        showErrors: true,
      }))
    } else {
      setState((prev) => ({
        ...prev,
        submitted: true,
      }))
    }
  }

  return (
    <>
      <Container state={props.state}>
        <Wrapper>
          {!state.submitted ? (
            <Form ref={form}>
              <TextWrapper>
                <Text fill={Theme.text} />
              </TextWrapper>
              <label htmlFor="name">
                <TextName width="40" height="8" fill={Theme.text} />
              </label>
              <FieldS>
                <InputS
                  showError={state.showErrors}
                  isValid={state.nameValid}
                  type="text"
                  name="user_name"
                  value={state.name}
                  onChange={(e) => {
                    handleUserInput(e)
                  }}
                />
              </FieldS>
              <label htmlFor="email">
                <TextMail
                  width="43"
                  height="8"
                  fill={Theme.text}
                  value={state.email}
                />
              </label>
              <FieldS>
                <InputS
                  showError={state.showErrors}
                  isValid={state.emailValid}
                  type="email"
                  name="user_email"
                  onChange={(e) => {
                    handleUserInput(e)
                  }}
                />
              </FieldS>
              <label htmlFor="message">
                <TextMessage
                  width="64"
                  height="8"
                  fill={Theme.text}
                  value={state.message}
                />
              </label>
              <FieldL>
                <InputMsg
                  showError={state.showErrors}
                  isValid={state.messageValid}
                  name="message"
                  onChange={(e) => {
                    handleUserInput(e)
                  }}
                />
              </FieldL>
              <Btn
                type="submit"
                inactive={!state.formValid}
                onClick={(e) => {
                  submitHandler(e)
                }}
              >
                <TextSend width="64" height="15" fill={Theme.background} />
              </Btn>
            </Form>
          ) : (
            <Thankyou fill={Theme.text} />
          )}
        </Wrapper>
      </Container>
    </>
  )
}

export default Contact
