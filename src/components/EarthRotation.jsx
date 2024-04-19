import { useEffect, useRef } from "react";
import { getImageUrl } from "../api/apiConfig";
import useNasaData from "../customHooks/useNasaData";

const EarthRotation = () => {

    const { loading, error, images, date } = useNasaData("2024-04-12");
    const imageRefs = useRef([]);

    useEffect(() => {
        if (images.length > 0) {
            const animateImages = () => {
                imageRefs.current.forEach((imgRef, index) => {
                    setTimeout(() => {
                        imgRef.classList.add("show");
                        setTimeout(() => {
                            imgRef.classList.remove("show");
                        }, 1000);
                    }, index * 1000);
                });
            };

            animateImages();

            const interval = setInterval(() => {
                animateImages();
            }, images.length * 1000);

            return () => clearInterval(interval);
        }
    }, [images, imageRefs]);

    return (
        <div className="Container">
            <img
                className="NASA-Logo"
                src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg"
                alt="NASA logo"
            />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                images.map((item, index) => (
                    <div
                        className="ImageContainer"
                        key={index}
                        ref={(element) => (imageRefs.current[index] = element)}
                    >
                        <img
                            className="Image"
                            src={getImageUrl(date, item.image)}
                            alt={item.caption}
                        />
                        <p>{item.caption} on {item.date}</p>
                    </div>
                ))
            )}
        </div>
    );

};

export default EarthRotation;