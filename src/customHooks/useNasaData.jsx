import { useEffect, useState } from "react";
import { getImagesApiUrl } from "../api/apiConfig";

const useNasaData = (date) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);

    useEffect(() => {

        const cachedImages = localStorage.getItem(`nasa_images_${date}`);

        if (cachedImages) {
            setImages(JSON.parse(cachedImages));
            setLoading(false);
            setError("");
            return;
        }

        fetch(getImagesApiUrl(date))
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                setLoading(false);
                localStorage.setItem(`nasa_images_${date}`, JSON.stringify(data));
                setImages(data);
                setError("");
            })
            .catch(error => {
                setLoading(false);
                setError('There was a problem with the fetch operation.');
                console.error('There was a problem with the fetch operation:', error);
            });

    }, [date]);

    return { loading, error, images, date };
};

export default useNasaData;