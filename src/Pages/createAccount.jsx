import React, { useState } from 'react'
import './createAccount.css'
import { useTranslation } from "react-i18next";
import "../i18n";
import { HiUserCircle } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import Favicon from '../assets/favicon.png';
import { auth } from '../firebase';
import { db } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";


function createAccount() {
   const { t, i18n } = useTranslation();

const changeLang = (lang) => {
  i18n.changeLanguage(lang);
  console.log("Dil değiştirildi:", lang);
};
const navigator = useNavigate();

  // State for form inputs and error
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [gender, setGender] = useState("");

const handleSignUp = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  if (password !== passwordAgain) {
    setError(t("Passwords do not match"));
    return;
  }
  if (!email || !password || !username || !gender) {
    setError(t("Please fill all fields"));
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      gender,
      createdAt: new Date()
    });
    setSuccess(t("Account created successfully!"));
    setTimeout(() => navigator('/login'), 1500);
  } catch (err) {
    setError(t("Failed to create account: ") + err.message);
  }
}


  return (
    <div className='page'>
        <div className='header'> 
            <div className='info'>
                 <img style={{width:'450px',height:'450px',display:'inline-block',marginLeft:'4%',marginBottom:'-80px'}} src={Favicon} alt="resim bulunamadı" />

                <p className='descriptionHeader'>{t("Discover Events, Connect with People!")}</p>
                <p className='description'>{t("Evently brings you together with events that match your interests. Meet new people and create unforgettable memories!")}</p>
                <p className='descriptionHeader'>{t("What Can You Do?")}</p>
                <ul>
                  <li><p className='descriptionP'>{t("Discover events near you")}</p></li>
                  <li><p className='descriptionP'>{t("Create and share your own events")}</p></li>
                  <li><p className='descriptionP'>{t("Join events with your friends")}</p></li>
                  <li><p className='descriptionP'>{t("Get recommendations based on your interests")}</p></li>
                </ul>

            </div>
            <div className='login'>
               <form onSubmit={handleSignUp}>
                <input className='createİnputOne' type="text" placeholder={t("Enter your username")}
                  value={username} onChange={e => setUsername(e.target.value)} />
                 <input className='createİnputTwo' type="email" placeholder={t("Enter your email")}
                  value={email} onChange={e => setEmail(e.target.value)} />
                <input className='createPassword' type="password" placeholder={t("Enter your password")}
                  value={password} onChange={e => setPassword(e.target.value)} />
                <input className='createPassword' type="password" placeholder={t("Enter your password (Again)")}
                  value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)} />

                <label className='labelRadio'><input type="radio" name='gender' value="male" checked={gender==="male"} onChange={e => setGender(e.target.value)} />{t("Male")}</label>
                 <label className='labelRadio' ><input type="radio" name='gender' value="female" checked={gender==="female"} onChange={e => setGender(e.target.value)} />{t("Female")}</label>
                 <label className='labelRadio'><input type="radio" name='gender' value="other" checked={gender==="other"} onChange={e => setGender(e.target.value)} />{t("Other")}</label>
                <button className='buttonSignUp' type='submit'>{t("Sign up")}</button>
                {error && <div style={{color: 'red', marginTop: '10px'}}>{error}</div>}
                {success && <div style={{color: 'green', marginTop: '10px'}}>{success}</div>}
               </form>
            </div>
        </div>
        
    </div>
  )
}

export default createAccount