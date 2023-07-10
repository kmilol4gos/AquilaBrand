import Webpay from "./assets/webpay.svg";
import Aquila from "./assets/Aguila_Sola.png";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="bottom-0 right-0 h-60 bg-black w-screen relative inline-block">
			<section className="mx-40 display-flex h-full items-stretch text-white">
				<div className=" mx-auto my-auto flex flex-col justify-center items-center">
					<div id="metodopago" className="flex flex-col justify-center items-center">
						<h3 className="text-sm font-normal my-4">Compra segura con</h3>
						<img src={Webpay} alt="Logo de WebPay" className="relative w-[140%]"/>
					</div>
					<div id="info" className="flex flex-col justify-center items-center absolute bottom-0 mb-auto space-y-3">
						<img src={Aquila} alt="Logo Empresa" className="relative w-[25%]" />
						<div className="flex flex-col justify-center items-center">
						<p className="text-sm">© AquilaBrand 2023. Todos los derechos reservados</p>
						<p className="text-sm">Sitio seguro con criptografia (SSL)</p>
						</div>
					</div>
					
				</div>
				
			</section>
		</footer>
	);
}

export default Footer;
