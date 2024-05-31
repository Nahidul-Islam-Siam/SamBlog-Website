
import Lottie from "react-lottie";
import ani from '../assets/Animation - 1715785398466.json'
const NotFound = () => {

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: ani,
		rendererSettings: {
		  preserveAspectRatio: "xMidYMid slice"
		}
	  };
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
	  <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      />
</section>
  );
}

export default NotFound;
