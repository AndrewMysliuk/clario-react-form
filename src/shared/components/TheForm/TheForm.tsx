import { FC } from "react"
import "./TheForm.scss"

interface FormProps {
  header?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const TheForm: FC<FormProps> = ({ header, content, footer, onSubmit }) => {
  return (
    <form className="the-form" onSubmit={onSubmit}>
      <div className="the-form__bg"></div>

      {header && <header className="the-form__header">{header}</header>}

      {content && <main className="the-form__content">{content}</main>}

      {footer && <footer className="the-form__footer">{footer}</footer>}
    </form>
  )
}

export default TheForm
