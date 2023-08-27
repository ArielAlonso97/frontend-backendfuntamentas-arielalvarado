"use client";
import 'bootstrap/dist/css/bootstrap.css';


import Image from 'next/image'
import styles from './page.module.css'
import CatalogoLibros from '../pages/CatalogoLibros'

export default function Home() {
  return (
    <main >
      <CatalogoLibros></CatalogoLibros>
    </main>
  )
}
