import Polera from "./assets/polera2.png";
import img from "./assets/img-ejemplo.jpeg";
import { Link } from "react-router-dom";

function Catalogo() {
	return (
		<div className="absolute top-20">
			<section className="flex justify-center w-screen h-[35rem] items-center">
				<div className="flex flex-col w-full h-full m-8">
					<div className="w-full h-full flex relative ">
						<img src={img} alt="" className="w-full object-cover rounded-xl" />
						<div className="absolute flex flex-col text-center bottom-0 right-0 justify-center opacity-80 backdrop-blur-2xl h-40 w-auto ">
							<h2 className="drop-shadow-aq text-white text-4xl font-bold m-2">
								Nuestra Coleccion
							</h2>
							<span className="drop-shadow-aq text-white font-medium text-3xl m-2 ">
								Poleras/Polerones
							</span>
						</div>
					</div>
				</div>
			</section>
			<section className="m-4 grid grid-cols-2 justify-items-center relative">
				<div
					id="Product"
					className="flex my-4 mx-12 w-[32rem] pr-[30px] pl-[20px] py-[30px] bg-white rounded-3xl items-center"
				>
					<Link to="/" className="">
						<img
							src={Polera}
							alt=""
							className="object-cover box-content min-w-[12rem] max-w-[12rem] min-h-[13rem] max-h-[13rem] ml-[-60px] mr-[30px] rounded-3xl shadow-xl"
						/>
					</Link>
					<div className="flex flex-col justify-around h-60">
						<Link to="/" className="text-black text-xl font-bold ">
							<h3>Polera Negra</h3>
						</Link>
						<p className="text-black font-normal text-sm">
							Velit minim laborum amet laborum labore ex voluptate adipisicing.
						</p>
						<span className="text-black text-xl font-bold before:content-['$']">
							20.000
						</span>
						<div className="flex">
							<button className="ease-in-out duration-100 m-2 p-2 border-2 border-black text-white bg-black font-bold cursor-pointer hover:bg-mainColor hover:border-mainColor active:scale-90">
								Comprar
							</button>
							<button className="ease-in-out duration-100  m-2 p-3 border-2 border-mainColor text-white bg-mainColor font-bold cursor-pointer hover:bg-black hover:border-black active:scale-90">
								Agregar al Carrito
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Catalogo;
