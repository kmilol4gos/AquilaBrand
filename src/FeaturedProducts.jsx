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
			className="h-full w-32 rounded-t-lg object-cover md:w-48 md:rounded-none md:rounded-l-lg"
		/>
	);
}

export default function FeaturedProducts() {
	const URL = "http://localhost:3000/featured";

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

	const URLIMG = "http://localhost:3000/images";

	const Imagenes = async () => {
		const response = await fetch(URLIMG, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				featured: 1,
			},
		});
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
			className="flex rounded-lg bg-white md:flex-row w-full"
		>
			<ProductImage image={images} PRODUCT_ID={product.PRODUCT_ID} />

			<div className="flex flex-col justify-evenly p-6 w-full">
				<Link to={"/product/" + product.PRODUCT_ID}>
					<h1 className="mb-2 text-lg font-bold text-black uppercase">
						{product.PRODUCT_NAME}
					</h1>
				</Link>
				<p className="mb-4 text-base text-black">
					{product.PRODUCT_DESCRIPTION}
				</p>
				<Link
					to={"/product/" + product.PRODUCT_ID}
					className="flex justify-center bg-black text-white rounded-lg p-1"
				>
					Ir a comprar
				</Link>
			</div>
		</div>
	));
}
