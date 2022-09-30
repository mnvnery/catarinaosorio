import { useState } from 'react'
import Link from 'next/link'
import headerNavLinks from '../data/headerNavLinks'
import Image from 'next/image'
import siteMetadata from '../data/siteMetadata'


const Nav = ({projects, books}) => {
const [navShow, setNavShow] = useState(false)

const onToggleNav = () => {
setNavShow((status) => {
    if (status) {
    document.body.style.overflow = 'auto'
    } else {
    // Prevent scrolling
    document.body.style.overflow = 'hidden'
    }
    return !status
})
}

const [subNavShow, setSubNavShow] = useState(false)

const onToggleSubNav = () => {
setSubNavShow((status) => {
    if (status) {
    
    } else {

    }
    return !status
})
}

return (
<div>
    <button
    type="button"
    className="ml-1 mr-1 h-8 w-8 rounded py-1"
    aria-label="Toggle Menu"
    onClick={onToggleNav}
    >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="text-black
        "
    >
        <path
        fillRule="evenodd"
        d="M 0 5 a 0 1 0 0 1 0 -1 h 8 a 0 1 0 1 1 0 1 H 0 z M 0 10 a 0 1 0 0 1 0 -1 h 8 a 0 1 0 1 1 0 1 H 0 z z"
        clipRule="evenodd"
        />
    </svg>
    </button>
    <div
    className={`absolute top-0 right-2.5 z-20 min-w-60 pb-10 2xl:min-w-[24vw] transform bg-orange-50 border border-orange-200 fill-white text-black duration-300 ease-in-out ${
        navShow ? 'block' : 'hidden'
    }`}
    >
    <div className="mt-1 float-right">
        <button
        type="button"
        className="mr-2 h-4 w-4 rounded"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 25 25"
            overflow="visible"
            stroke="rgb(254 215 170)"
            strokeWidth="3"
        >
            <line x2="25" y2="25" />
            <line x1="25" y2="25" />
            </svg>
        </button>
    </div>
    <nav className="mt-12 flex flex-col justify-between text-center 2xl:text-lg">
        <div>
            {projects.map((project, i) => (
                <div key={i} className="px-5 2xl:px-20">
                <Link
                    href={`/projects/${project.slug}`}
                >
                    <a onClick={onToggleNav}
                    className="leading-3 text-black tracking-widest">{project.titulo}
                    </a>
                </Link>
                </div>
            ))}
        </div>
        <div className='mt-8'>
            <div><button onClick={onToggleSubNav} className="leading-3 text-black font-decay tracking-widest">Livros</button></div>
            <div className={`${subNavShow ? 'block' : 'hidden'} mb-5 mt-2`}>
                {books.map((book, i) => (
                    <div key={i} className="px-5">
                    <Link
                        href={`/books/${book.slug}`}
                    >
                        <a onClick={onToggleNav}
                        className="leading-3 text-black tracking-widest">{book.titulo}
                        </a>
                    </Link>
                    </div>
                ))}
            </div>
            <div><Link href='/expos'><a onClick={onToggleNav} className="leading-3 text-black font-decay tracking-widest">Exposições</a></Link></div>
            <div><Link href='/textos'><a onClick={onToggleNav} className="leading-3 text-black font-decay tracking-widest">Textos</a></Link></div>
        </div>
        <div className='mt-3'>
            <div><Link href='/contacts'><a onClick={onToggleNav} className='leading-3 font-decay tracking-widest'>Bio</a></Link></div>
            <div><Link href='/contacts'><a onClick={onToggleNav} className='leading-3 font-decay tracking-widest'>Contactos</a></Link></div>
        </div>
    </nav>
    </div>
</div>
)
}

export default Nav
