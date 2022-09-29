import Head from 'next/head'
import Image from 'next/image'
import { request } from '../lib/datocms'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { PROJECTS_QUERY, IMAGES_QUERY } from '../lib/queries'


export async function getStaticProps() {
  const img = await request({
    query: IMAGES_QUERY,
  })

  const project = await request({
      query: PROJECTS_QUERY,
  })

  return {
    props: {
      img, 
      projects: project.allProjects,
    },
  }
}

function size(size) {
  if (size === 'small') {
      return 'w-[20vw] h-[20vw] m-20'
  }
  if (size === 'medium') {
      return 'w-[30vw] h-[30vw] m-10'
  }
  if (size === 'large') {
      return 'w-[42vw] h-[42vw]'
  }
}

function align(align) {
  if (align === 'top') {
      return 'self-start mt-[16vh]'
  }
  if (align === 'middle') {
      return 'self-center'
  }
  if (align === 'bottom') {
      return 'self-end'
  }
}




export default function Home({img, projects}) {
  const [randomArray, setRandomArray] = useState([]);
  useEffect(() => {
      const randomizeArray = img.allImages.sort(() => 0.5 - Math.random());
      setRandomArray(randomizeArray.slice(0, 2));
  }, []);
  return (
    <>
    <Header projects={projects}/>
    <div className='flex justify-between fixed top-0 left-0 w-full h-screen'>
      {randomArray.map((item, id) => (
        <div key={id} className={`relative ${size(item.tamanho)} ${align(item.alinhamento)}`}>
          <Image src={item.imagem.url} layout='fill' objectFit='cover'/>
        </div>
      ))}
    </div>
    </>
  )
}
