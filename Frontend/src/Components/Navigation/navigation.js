import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../Hooks/useAuthContext'
import { useLogout } from '../../Hooks/useLogout'

function Navigation({active, setActive}) {
    const {logout}=useLogout()
    const { user } = useAuthContext();
    const handleClick=()=>{
        logout()
    }
    return (
        <NavStyled>
            <div className="web-name">
                <Link to="/">
                    Wallet
                </Link>
            </div>
            <div className="user-con">
                <img src={avatar} alt="" />
                <div className="text">
                    <h2>{user ? user.username: <>User!!</>}</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav">
                {user ? <ButtonStyled onClick={handleClick}> 
                            {signout} Sign Out 
                        </ButtonStyled> :
                    ( 
                        <>
                            <Link to='/login'>
                                Login
                            </Link>
                            <Link to='/signup'>
                                Signup
                            </Link>
                        </>
                    )
                }
            </div>
        </NavStyled>
    )
}
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
    transition: all .1s ease-in-out;
    
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

      &:hover {
        background: #66b2ff !important;
      }

    
`;
const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .web-name {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px; /* Adjust height as needed */
    }
    .bottom-nav{
        display:flex;
        // flex-direction:column;
        justify-content: center;
        gap:20px;
    }
    .bottom-nav a{
        text-decoration:none;
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
        transition: all .1s ease-in-out;
        
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

        &:hover {
            background: #66b2ff !important;
        }
    }
    .web-name a{   
        font-size:3.2rem;
        text-align:center;
        background-image: linear-gradient(to left,blue, orange, green, violet);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .2s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .2s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
`;

export default Navigation