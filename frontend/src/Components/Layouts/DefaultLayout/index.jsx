import Footer from './Footer/Footer';
import Navbar from './NavBar/NavBar';

function DefaultLayout({ children }) {
	return (
		<div className="flex flex-col ">
			<Navbar />
			<div className="container mx-auto flex justify-center items-center">
				{children}
			</div>
			<div className="shadow mt-4">
				<Footer />
			</div>
		</div>
	);
}

export default DefaultLayout;
