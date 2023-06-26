import { Link } from "react-router-dom";
import IconDelete from "./assets/Delete.svg";
import ImgProduct from "./assets/img-ejemplo.jpeg";

const ProductCart = () => {
	return (
		<div className="my-2 flex flex-col justify-center bg-mainColor">
			<div className="flex w-[90%] items-stretch pt-4 pb-6" id="card-product">
				<div className="w-[30%] flex justify-center items-center mx-2">
					<Link to="/product/idproducto">
						<img
							src={ImgProduct}
							alt=""
							className="w-full object-cover border-none"
						/>
					</Link>
				</div>
				<div className="flex justify-center flex-grow items-stretch ml-2">
					<div className="w-full h-full flex flex-col justify-around text-white items-start">
						<Link to="/" className="font-bold text-xl no-underline">
							Jeans Hombre
						</Link>
						<div className="pb-7 flex gap-3">
							<span className="font-light text-xs">Talla: 45</span>
							<span className="font-light text-xs">Color: Negro</span>
						</div>
						<div>
							<span className="font-normal text-xl before:content-['$']">
								20.000
							</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-center">
					<button>
						<img src={IconDelete} alt="" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCart;
