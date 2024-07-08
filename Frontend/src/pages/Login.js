import React, { useState } from 'react';
import styled from 'styled-components';
import { useLogin } from '../Hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <PageContainer>
      <LoginFormStyled onSubmit={handleSubmit}>
        <h3>Log In</h3>
        {error && <p className='error'>{error}</p>}
        <div className="input-control">
          <label>Email address:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email Address"
          />
        </div>
        <div className="input-control">
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>
        <div className="submit-btn">
          <ButtonStyled disabled={isLoading}>Log in</ButtonStyled>
        </div>
      </LoginFormStyled>
    </PageContainer>
  );
};

const PageContainer = styled.div`
flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width:100%;
  background: linear-gradient(to right, #e0eafc, #cfdef3); 
`;

const LoginFormStyled = styled.form`
  display: flex;
  // flex:1;
  // justify-content:center;
  // align-items:center;
  flex-direction: column;
  gap: 1.5rem;
  padding: 3rem 2rem ;
  // height: 60vh;
  width:60vh;
  background: rgba(252, 246, 249, 0.78);
  // background: linear-gradient(to right, #e0eafc, #cfdef3); 
  border: 3px solid #ffffff;
  border-radius: 32px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

  h3 {
    color: rgba(34, 34, 96, 0.9);
    text-align: center;
  }

  .input-control {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      color: rgba(34, 34, 96, 0.6);
    }

    input {
      font-family: inherit;
      font-size: inherit;
      outline: none;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      border: 2px solid #fff;
      background: transparent;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      color: rgba(34, 34, 96, 0.9);

      &::placeholder {
        color: rgba(34, 34, 96, 0.4);
      }
    }
  }

  .submit-btn {
    display: flex;
    justify-content: center;

    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

      &:hover {
        background: var(--color-green) !important;
      }
    }
  }

  .error {
    color: red;
    background: #fdd;
    padding: 0.5rem;
    border-radius: 5px;
    text-align: center;
  }
`;
const ButtonStyled = styled.button`
// flex:1;
    background: var(--color-accent);
    padding: .8rem 1.6rem;
    border-radius: 30px;
    color: #fff;
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .2s ease-in-out;
`;
export default Login;
