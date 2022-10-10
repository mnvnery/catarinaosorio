import Head from 'next/head'
import Image from 'next/image'
import { request } from '../lib/datocms'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { PROJECTS_QUERY, IMAGES_QUERY } from '../lib/queries'
import FsLightbox from 'fslightbox-react'; 


export async function getStaticProps() {
  const img = await request({
    query: IMAGES_QUERY,
  })

  const project = await request({
      query: PROJECTS_QUERY,
  })

  return {
    props: {
      img: img.homePage, 
      projects: project.allProjects,
      books: project.allLivros,
    },
  }
}

function size(size) {
  if (size === 'small') {
      return 'h-[30vh] w-[35vw] md:w-[20vw] md:h-[20vw] md:m-20'
  }
  if (size === 'medium') {
      return 'h-[42vh] w-[40vw] md:w-[30vw] md:h-[30vw] md:m-10'
  }
  if (size === 'large') {
      return 'w-[48vw] h-[60vh] md:w-[42vw] md:h-[42vw]'
  }
}

function align(align) {
  if (align === 'top') {
      return 'self-start mt-[16vh]'
  }
  if (align === 'middle') {
      return 'self-center mt-[16vh]'
  }
  if (align === 'bottom') {
      return 'self-end'
  }
}




export default function Home({img, projects, books }) {
  const [randomArray, setRandomArray] = useState([]);
  useEffect(() => {
      const randomizeArray = img.imagens.sort(() => 0.5 - Math.random());
      setRandomArray(randomizeArray.slice(0, 2));
  }, []);

  const [lightboxController, setLightboxController] = useState({ 
    toggler: false, 
    slide: 1 
    }); 
    
    function openLightboxOnSlide(number) { 
        setLightboxController({ 
            toggler: !lightboxController.toggler, 
            slide: number 
        }); 
    }         

  const allImages = img.imagens.map((img) => img.imagem.url)
  return (
    <>
    <Header projects={projects} books={books} />
    <div className='flex justify-between fixed md:pt-4 top-0 left-0 w-full h-[80vh] md:h-screen'>
      {randomArray.map((item, i) => (
        <div key={i} className={`relative ${size(item.tamanho)} ${align(item.alinhamento)}`}>
          <Image src={item.imagem.url} layout='fill' objectFit='cover' onClick={() => openLightboxOnSlide(i + 1)}/>
        </div>
      ))}
    </div>
    <FsLightbox 
        toggler={lightboxController.toggler} 
        sources={allImages} 
        slide={lightboxController.slide} 
        svg={{
          slideButtons: {
            previous: {
                width: '30px', 
                height: '30px',
                viewBox: '0 0 14.91 27.74',
                d: 'M13.33,27.74L.2,14.61c-.26-.26-.26-.68,0-.94L13.86,0c.91,.92,1,.82,.84,.98L1.56,14.18l12.74,12.64'
            },
            next: {
                width: '30px', 
                height: '30px',
                viewBox: '0 0 14.91 27.74',
                d: 'M1.44,0L14.57,13.13c.26,.26,.26,.68,0,.94L.9,27.74c-.91-.92-1-.82-.84-.98L13.21,13.56,.47,.93'
            }
          } 
        }}
    /> 
    </>
  )
}
