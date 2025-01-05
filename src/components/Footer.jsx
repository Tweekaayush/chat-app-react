import React, { useEffect, useState } from 'react'

const Footer = () => {

    const [year, setYear] = useState('')

    useEffect(()=>{
        setYear(new Date().getUTCFullYear())
    }, [])

  return (
      <footer>
        Copyright &copy;
        {year}
        <a href="https://aayushdobriyal.vercel.app">
            Aayush Dobriyal  
        </a>
        .
    </footer>
  )
}

export default Footer