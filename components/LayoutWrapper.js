import Nav from "./Nav"

const LayoutWrapper = ({ children }) => {
    <>
    <div className="flex h-screen flex-col justify-between">
        <header className="flex justify-between text-black bg-slate-400">
            <div>EN / PT</div>
            <div>Catarina Osorio de Castro</div>
        </header>
        <main className="mx-4 md:mx-8 md:mt-10 xxl:mx-20">
            {children}
        </main>
    </div>
    </>
}

export default LayoutWrapper
