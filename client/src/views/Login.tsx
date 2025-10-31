import { useAuth } from "../contexts"
import { ChangeEvent, FC, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

const Login: FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await login(formData)
      navigate("/")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed")
    }
  }

  return (
    <div className='login-container'>
      <div className='container-fluid h-100'>
        <div className='row h-100'>
          <div className='col-12 d-flex align-items-center justify-content-center login-form-section'>
            <div className='login-form-container'>
              <div className='login-header text-center mb-4'>
                <div className='login-icon'>
                  <i className='fas fa-user-shield'></i>
                </div>
                <h2 className='login-title'>Connexion</h2>
                <p className='login-subtitle'>
                  Accédez à votre espace de gestion
                </p>
              </div>

              {error && (
                <div
                  className='alert alert-danger d-flex align-items-center'
                  role='alert'>
                  <i className='fas fa-exclamation-triangle me-2'></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className='login-form'>
                <div className='form-group mb-3'>
                  <label htmlFor='email' className='form-label'>
                    <i className='fas fa-envelope me-2'></i>
                    Email
                  </label>
                  <input
                    type='email'
                    className='form-control form-control-custom'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='votre@email.com'
                    required
                  />
                </div>

                <div className='form-group mb-4'>
                  <label htmlFor='password' className='form-label'>
                    <i className='fas fa-lock me-2'></i>
                    Mot de passe
                  </label>
                  <input
                    type='password'
                    className='form-control form-control-custom'
                    id='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='••••••••'
                    required
                  />
                </div>

                <button
                  type='submit'
                  className='btn btn-primary-custom w-100 mb-3'
                  disabled={loading}>
                  {loading ? (
                    <>
                      <span
                        className='spinner-border spinner-border-sm me-2'
                        role='status'></span>
                      Connexion...
                    </>
                  ) : (
                    <>
                      <i className='fas fa-sign-in-alt me-2'></i>
                      Se connecter
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
