import Footer from './Footer/Footer';
import Navbar from './NavBar/NavBar';

function DefaultLayout({ children }) {
	return (
		<div className="flex flex-col ">
			<Navbar />
			<div className="container my-12 mx-auto px-4 md:px-12">
				{children}
			</div>
			<div className="shadow mt-4">
				<Footer />
			</div>
		</div>
	);
}

export default DefaultLayout;
