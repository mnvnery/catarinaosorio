import { request } from "../lib/datocms"
import Image from "next/image"
import { PROJECTS_QUERY, TEXTOS_QUERY } from '../lib/queries'
import Header from "../components/Header"
import { useState, useEffect } from "react"
import { useRouter } from 'next/router';
import Link from 'next/link'


export async function getStaticProps({locale}) {
    const formattedLocale = locale;

    const textos = await request({
        query: `{
            allTexts(locale: ${formattedLocale}) {
                texto
                titulo
                slug
            }
        }`
    })

    const project = await request({
        query: `{
            allProjects(locale: ${formattedLocale}) {
                slug
                titulo
                lista
            }
            allLivros(locale: ${formattedLocale}) {
                slug
                titulo
            }
        }`
})


return {
    props: {
        textos: textos.allTexts,
        projects: project.allProjects,
        books: project.allLivros,
    },
}
}

export default function Textos({textos, projects, books}) {
    const { locale, locales, asPath } = useRouter().locale;

    
    return (
        <>
        <Header projects={projects} books={books}/>
        <div className="text-center mt-24 2xl:mt-36">
            <div className="font-decay mb-4 2xl:text-xl 3xl:text-2xl">{locale === 'pt' ? 'Textos' : 'Texts'}</div>
            {textos.map((t, i) => (
                <div key={i} className={`leading-5 2xl:text-lg 3xl:text-xl`}>
                    <Link href={`/textos/${t.slug}`} className="hover:underline">{t.titulo}</Link>
                </div>
            ))}
            
            {textos.map((t, i) => (
                <div key={i}>
                    <div className="mt-20 font-bold text-lg mb-12 2xl:text-xl 2xl:mt-28 3xl:text-2xl">{t.titulo}</div>
                    <div className="max-w-xs md:max-w-lg mx-auto text-left mb-14 3xl:max-w-xl">
                        <div dangerouslySetInnerHTML={{__html: t.texto}} className='paragraph text-sm 2xl:text-base 3xl:text-xl'/>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}