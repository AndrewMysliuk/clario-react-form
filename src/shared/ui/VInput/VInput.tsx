import { FC, useState } from "react"
import "./VInput.scss"
import { EyeClosedIcon, EyeOpenIcon } from "@/shared/components"

interface VInputProps {
  value: string | number
  setValue: (value: string) => void
  type?: string
  isSuccess?: boolean
  isError?: boolean
  isPassword?: boolean
  placeholder?: string
}

const VInput: FC<VInputProps> = ({ value, setValue, type = "text", placeholder, isSuccess, isError, isPassword }) => {
  const [showPassword, setShowPassword] = useState(false)
  const inputType = type === "password" && showPassword ? "text" : type
  const iconColor = isError ? "error" : isSuccess ? "success" : "default"

  return (
    <div className={`v-input ${isSuccess ? "--state-success" : ""} ${isError ? "--state-error" : ""}`}>
      <input
        className="v-input__field"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        type={inputType}
        placeholder={placeholder}
      />

      {isPassword && (
        <div className="v-input__password-icon" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOpenIcon color={iconColor} /> : <EyeClosedIcon color={iconColor} />}
        </div>
      )}
    </div>
  )
}

export default VInput
