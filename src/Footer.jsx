import Webpay from "./assets/logo-webpay.png";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="bottom-0 right-0 h-60 bg-black w-screen relative inline-block">
			<section className="mx-40 h-full flex justify-between items-stretch text-white">
				<div className="flex flex-col w-52">
					<h3 className="text-2xl font-normal my-4">Informacion</h3>
					<ul className="flex flex-col">
						<li>
							<Link
								to="/Catalogo"
								className="font-normal text-lg py-2 hover:text-mainColor "
							>
								Eventos
							</Link>
						</li>
						<li>
							<Link
								to="/"
								className="font-normal text-lg py-2 hover:text-mainColor "
							>
								Quienes Somos
							</Link>
						</li>
						<li>
							<Link
								to="/"
								className="font-normal text-lg py-2 hover:text-mainColor "
							>
								Contacto
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col w-52">
					<img src={Webpay} alt="Logo de WebPay" />
				</div>
				<div className="flex flex-col w-52">
					<h3 className="text-2xl font-normal my-4">Redes Sociales</h3>
					<ul className="flex flex-col">
						<li>
							<Link
								to=""
								className="font-normal text-lg my-2 hover:text-mainColor"
							>
								{" "}
								Instagram
							</Link>
						</li>
						<li>
							<Link
								to=""
								className="font-normal text-lg my-2 hover:text-mainColor"
							>
								{" "}
								WhatsApp
							</Link>
						</li>
					</ul>
				</div>
			</section>
		</footer>
	);
}

export default Footer;
