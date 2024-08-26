import { useEffect, useState } from "react"
// import { useActions } from "@/shared/hooks"
import { TheForm } from "@/shared/components"
import { VButton, VInput } from "@/shared/ui"
import { ValidationRuleType } from "@/shared/types"
import { EMAIL_REGEXP, PASSWORD_REGEXP } from "@/shared/utils/validation"

const LoginWidget = () => {
  // const { setUserLogin } = useActions()
  const [formState, setFormState] = useState<ValidationRuleType>({
    email: {
      regexp: EMAIL_REGEXP,
      min_length: 1,
      max_length: 50,
      value: "",
      is_failed: false,
      is_valid: false,
    },

    password: {
      regexp: PASSWORD_REGEXP,
      min_length: 8,
      max_length: 64,
      value: "",
      is_failed: false,
      is_valid: false,
    },
  })
  const [isValidLength, setIsValidLength] = useState<boolean>(false)
  const [hasLowerAndUpperLetters, setHasLowerAndUpperLetters] = useState<boolean>(false)
  const [hasOneDigit, setHasOneDigit] = useState<boolean>(false)

  const validateForm = (formState: ValidationRuleType) => {
    const updatedState = { ...formState }
    let isFormValid = true

    Object.keys(formState).forEach((key) => {
      const field = formState[key]
      const isValid = field.regexp.test(field.value) && field.value.length >= field.min_length && field.value.length <= field.max_length

      updatedState[key].is_valid = isValid
      updatedState[key].is_failed = !isValid

      if (!isValid) isFormValid = false
    })

    return { updatedState, isFormValid }
  }

  const validationHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { updatedState, isFormValid } = validateForm(formState)

    setFormState(updatedState)

    if (isFormValid) {
      // setUserLogin(true)
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        is_failed: false,
        is_valid: false,
      },
    }))
  }

  useEffect(() => {
    const password = formState.password.value

    setIsValidLength(password.length >= 8)
    setHasLowerAndUpperLetters(/[a-z]/.test(password) && /[A-Z]/.test(password))
    setHasOneDigit(/\d/.test(password))
  }, [formState.password.value])

  return (
    <div className="login">
      <TheForm
        onSubmit={validationHandler}
        header={<h1 className="login__title">Sign Up</h1>}
        content={
          <>
            <div className="login__row">
              <VInput
                value={formState.email.value}
                setValue={(value) => handleInputChange("email", value)}
                isError={formState.email.is_failed}
                isSuccess={formState.email.is_valid}
                placeholder="Enter your email"
              />
            </div>

            <div className="login__row">
              <VInput
                value={formState.password.value}
                setValue={(value) => handleInputChange("password", value)}
                isError={formState.password.is_failed}
                isSuccess={formState.password.is_valid}
                placeholder="Enter your password"
                type="password"
                isPassword
              />
            </div>

            <div className="login__row">
              <p
                className="login__rule"
                style={{
                  color: formState.password.is_valid || isValidLength ? "#27b274" : formState.password.is_failed ? "#ff8080" : "#151D51",
                }}
              >
                8 characters or more (no spaces)
              </p>
              <p
                className="login__rule"
                style={{
                  color:
                    formState.password.is_valid || hasLowerAndUpperLetters
                      ? "#27b274"
                      : formState.password.is_failed
                      ? "#ff8080"
                      : "#151D51",
                }}
              >
                Uppercase and lowercase letters
              </p>
              <p
                className="login__rule"
                style={{
                  color: formState.password.is_valid || hasOneDigit ? "#27b274" : formState.password.is_failed ? "#ff8080" : "#151D51",
                }}
              >
                At least one digit
              </p>
            </div>
          </>
        }
        footer={<VButton title="Sign up" type="submit" />}
      />
    </div>
  )
}

export default LoginWidget
