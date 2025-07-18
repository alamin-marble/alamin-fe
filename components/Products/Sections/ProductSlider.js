import ImageGallery from "react-image-gallery";
import { useState, useEffect } from "react";
import axios from "axios";
import Fancybox from "@/components/Others/Fancybox";
export default function ProductSlider(props) {
  const colorIDprop = props.colorID;
  const [galleryImage, setgalleryImage] = useState([]);

  useEffect(() => {
    axios
      .post(`${process.env.SERVER_LINK}/api/products/filter`, {
        limit: 10,
        offset: 0,
        product_id: props.ColorProductId,
      })

      .then((res) => {
        let intialData = [];
        res.data.data.map((resData) => {
          return resData.colors
            .filter((res) => res.colorID === parseInt(colorIDprop))
            .map((colorsData) => {
              return colorsData.imageID.map((imageIdData) => {
                return intialData.push({
                  original: imageIdData.image.url,
                  thumbnail: imageIdData.image.url,
                  originalAlt: imageIdData.image.alt,
                  thumbnailAlt: imageIdData.image.alt,
                });
              });
            });
        });

        setgalleryImage(intialData);

        setTimeout(() => {
          var images = document.getElementsByClassName("image-gallery-image");

          for (var i = 0; i < images.length; i++) {
            var image = images[i];
            image.setAttribute("data-fancybox", "ProductsMostSale");
            image.setAttribute("href", image.getAttribute("src"));
          }
        }, 1500);
      })
      .catch((err) => console.error(err));
  }, [props.ColorProductId, colorIDprop]);

  return (
    <div>
      <Fancybox>
        <ImageGallery
          items={galleryImage}
          showPlayButton={false}
          showFullscreenButton={false}
          showBullets={false}
          showNav={false}
          isRTL={true}
          autoPlay
        />
      </Fancybox>
    </div>
  );
}
