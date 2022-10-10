import React, { useState } from 'react'
import styles from '../styles/Contact.module.css'

const Contact = () => {
  const [urname, seturname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [desc, setdesc] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { urname, email, phone, desc };
    // console.log(data);

    fetch('http://localhost:3000/api/postcontact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    }).then(response => response.text())
      .then(data => {
        console.log('Success:', data);
        alert("Thanks for contacting us");
        setphone('')
        seturname('')
        setdesc('')
        setemail('')
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleChange = (e) => {
    if (e.target.name == 'urname') {
      seturname(e.target.value)
    }
    if (e.target.name == 'email') {
      setemail(e.target.value)
    }
    if (e.target.name == 'phone') {
      setphone(e.target.value)
    }
    if (e.target.name == 'desc') {
      setdesc(e.target.value)
    }
  }

  return (
    <div className={styles.container} >
      <h1 className={styles.h1}>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="urname" className={styles.formlabel}>Enter Your Name: </label>
          <input className={styles.input} type="text" value={urname} onChange={handleChange}  id="urname" name="urname" aria-describedby="nameHelp" />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.formlabel}>Email address: </label>
          <input className={styles.input} type="email" value={email} onChange={handleChange}  id="email" name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className={styles.formtext}>We will never share your email with anyone else.</div>
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.formlabel}>Mobile Number: </label>
          <input className={styles.input} type="phone" value={phone} onChange={handleChange}  id="phone" name="phone" required />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="desc" className={styles.formlabel}>Write Your Concern</label>
          <textarea className={styles.input} value={desc} onChange={handleChange} id="desc" name="desc" />
        </div>
        <button type="submit" className={styles.btn} >Submit</button>
      </form>
    </div >
  )
}

export default Contact