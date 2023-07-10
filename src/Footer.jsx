import Webpay from "./assets/webpay.svg";
import Aquila from "./assets/Aguila-blanca.png";

function Footer() {
	return (
		<footer className="bottom-0 right-0 h-full md:h-60 bg-black w-screen relative inline-block">
			<section className="md:mx-40 h-full text-white py-4">
				<div className=" flex flex-col md:flex-row justify-around h-full w-full">
					<div
						id="metodopago"
						className="flex flex-col justify-center items-center"
					>
						<h3 className="text-xl font-normal my-4">Compra segura con</h3>
						<div>
							<img src={Webpay} alt="Logo de WebPay" className="w-full" />
						</div>
					</div>
					<div
						id="info"
						className="flex flex-col items-center justify-center gap-5"
					>
						<div className="md:w-56 w-48">
							<img src={Aquila} alt="Logo Empresa" className="w-full h-full" />
						</div>
						<div className="flex flex-col justify-center items-center">
							<p className="text-sm">
								© AquilaBrand 2023. Todos los derechos reservados
							</p>
							<p className="text-sm">Sitio seguro con criptografia (SSL)</p>
						</div>
					</div>
				</div>
			</section>
		</footer>
	);
}

export default Footer;
