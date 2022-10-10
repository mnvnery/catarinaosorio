import Nav from "./Nav"
import Link from "next/link"

const Header = ({projects, books}) => {
    return (
        <>
        <div className="h-20 md:h-20"></div>
        <div className="fixed top-0 w-[95%] flex justify-between m-5 md:mx-10 md:my-5 z-10">
            <div className="font-decay text-xs 2xl:text-sm 3xl:text-base mt-1.5"><span className="hover:underline">EN</span> / <span className="hover:underline">PT</span></div>
            <Link href='/'><a className="z-30 font font-grottaMedium text-lg md:text-xl md:z-0 2xl:text-2xl 3xl:text-3xl">Catarina Osório de Castro</a></Link>
            <Nav projects={projects} books={books} />
        </div>
        </>
    )
}

export default Header