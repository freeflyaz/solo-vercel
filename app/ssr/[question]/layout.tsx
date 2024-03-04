import Navbar from '../../components/NavBar'
// import Footer from './footer'
 
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      
      <main>{children}</main>
      
      {/* <Footer /> */}
    </>
  )
}