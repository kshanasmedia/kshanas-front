import Footer from "./Footer";
import Header from "./Header";

export default function Layout({children}){
    return(
        <>
        <Header/>
        <div className="body--container">
            <div className="body--core">
                {children}
            </div>
        </div>
        <Footer/>
        </>
    )
}