import { request } from "../lib/datocms"
import Image from "next/image"
import { PROJECTS_QUERY, TEXTOS_QUERY } from '../lib/queries'
import Header from "../components/Header"
import { useState, useEffect } from "react"


export async function getStaticProps() {
const textos = await request({
    query: TEXTOS_QUERY,
})

const project = await request({
    query: PROJECTS_QUERY,
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
    function getTexts() {
        return textos
    }

    function filterTexts(textTitle) {
        let filteredText = getTexts().filter((text) => text.titulo === textTitle)
        return filteredText
    }

    const [filteredTexts, setFilteredTexts] = useState(null)
    const [selectedTitle, setSelectedTitle] = useState()

    useEffect(() => {
        setFilteredTexts(null)
    }, [])

    function handleTag(e) {
        let textTitle = e.target.value
        if (textTitle !== '') {
            setFilteredTexts(filterTexts(textTitle))
            setSelectedTitle(textTitle)
        } else {
            setFilteredTexts(null)
            setSelectedTitle('')
        }
    }
    
    return (
        <>
        <Header projects={projects} books={books}/>
        <div className="text-center mt-24">
            <div className="font-decay mb-4">Textos</div>
            {textos.map((t, i) => (
                <div key={i} className={`hover:underline leading-5`}>
                    <button value={t.titulo} onClick={handleTag} className={`${selectedTitle === t.titulo ? 'underline' : '' }`}>{t.titulo}</button>
                </div>
            ))}
            {filteredTexts &&
            filteredTexts
            .slice(0)
            .map((t, i) => (
                <div key={i}>
                    <div className="mt-20 font-bold text-lg mb-12">{t.titulo}</div>
                    <div className="max-w-lg mx-auto text-left mb-14">
                    <div dangerouslySetInnerHTML={{__html: t.texto}} className='paragraph text-sm'/>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}