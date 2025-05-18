import Header from "@/component/Header";
import Carousel from "@/component/home/Carousel";
import {
  faCalculator,
  faCertificate,
  faIdBadge,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Home() {
  const slides = [
    "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3510/hand-apple-iphone-smartphone.jpg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1432673/pexels-photo-1432673.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/8622911/pexels-photo-8622911.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <div className="container">
        <Header />
        <Carousel slides={slides} />
        <div className="flex mt-10 items-center bg-[#F9F7F7] rounded-2xl">
          <div className="w-1/4 flex items-center justify-center gap-5 text-xl py-5 border-r border-gray-400">
            <FontAwesomeIcon
              icon={faCertificate}
              className="w-5 h-5 p-2 rounded-full hover:bg-gray-200"
            />
            <h2>Official guarantee</h2>
          </div>
          <div className="w-1/4 flex items-center justify-center gap-5 text-xl py-5 border-r border-gray-400">
            <FontAwesomeIcon
              icon={faTruckFast}
              className="w-5 h-5 p-2 rounded-full hover:bg-gray-200"
            />
            <h2>Fast Delivery</h2>
          </div>
          <div className="w-1/4 flex items-center justify-center gap-5 text-xl py-5 border-r border-gray-400">
            <FontAwesomeIcon
              icon={faCalculator}
              className="w-5 h-5 p-2 rounded-full hover:bg-gray-200"
            />
            <h2>Advantageous credit</h2>
          </div>
          <div className="w-1/4 flex items-center justify-center gap-5 text-xl py-5">
            <FontAwesomeIcon
              icon={faIdBadge}
              className="w-5 h-5 p-2 rounded-full hover:bg-gray-200"
            />
            <h2>Certified products</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
