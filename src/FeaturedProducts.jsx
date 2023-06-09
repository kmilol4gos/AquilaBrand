import { useState, useEffect } from "react";
import PoleraNegra from "./assets/polera2.png";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

function ProductImage({ image, PRODUCT_ID }) {
	let ImagePrincipal;
	const filterImage = image.filter((item) => item.PRODUCT_ID === PRODUCT_ID);
	if (!filterImage[0]) {
		ImagePrincipal = { PoleraNegra };
	} else {
		ImagePrincipal = filterImage[0].IMAGE;
	}

	return (
		<img
			src={ImagePrincipal}
			alt=""
			className="h-full w-full rounded-t-lg object-cover md:w-48 md:rounded-none md:rounded-l-lg"
		/>
	);
}

export default function FeaturedProducts() {
	const URL = "https://server.aquilabrand.cl/featured";

	const [featured, setFeatured] = useState();

	const fetchApi = async () => {
		const response = await fetch(URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const responseJSON = await response.json();
		setFeatured(responseJSON);
	};

	const [images, setImages] = useState([]);

	const URLIMG = "https://server.aquilabrand.cl/images";

	const Imagenes = async () => {
		const response = await fetch(
			URLIMG + "?" + new URLSearchParams({ featured: "1" }),
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const responseJSON = await response.json();
		setImages(responseJSON);
	};

	useEffect(() => {
		fetchApi();
		Imagenes();
	}, []);

	if (!featured || !images[0])
		return (
			<div className="absolute flex justify-center w-screen h-screen">
				<TailSpin color="#e2fcef" height={80} width={80} />
			</div>
		);

	return featured.map((product, index) => (
		<div
			key={product.PRODUCT_ID}
			className="flex rounded-lg bg-white md:flex-row w-full h-56"
		>
			<div className="h-full w-48">
				<Link to={"/product/" + product.PRODUCT_ID}>
					<ProductImage image={images} PRODUCT_ID={product.PRODUCT_ID} />
				</Link>
			</div>
			<div className="flex flex-col justify-evenly p-6 w-full">
				<Link to={"/product/" + product.PRODUCT_ID}>
					<h1 className="mb-2 text-lg font-bold text-black uppercase">
						{product.PRODUCT_NAME}
					</h1>
				</Link>
				<p className=" text-sm text-black h-16 overflow-hidden md:overflow-y-auto">
					{product.PRODUCT_DESCRIPTION}
				</p>
				<Link
					to={"/product/" + product.PRODUCT_ID}
					className="flex mt-4 justify-center bg-black text-white rounded-lg py-1"
				>
					Comprar
				</Link>
			</div>
		</div>
	));
}
