import { useState } from "react";
import Image from "next/image";


export default function ImageShowcase({ imageShowcase }) {

  const [imageNavigator, setImageNavigator] = useState<number>(0)
  console.log(imageShowcase)
  console.log(imageNavigator)
  return (
    <div>
      <div className="flex w-full items-center mb-4 overflow-hidden relative h-96 border border-black">
        {!imageShowcase ? <p>You did not choose any image yet!</p> : imageShowcase.map((img) =>
          <div key={img} style={{ translate: `${imageNavigator * -100}%` }} className="flex w-full h-full overflow-hidden flex-shrink-0 duration-700">
            <Image
              width={0} height={0}
              alt="uploadedImage"
              style={{ height: '100%', width: '100%', zIndex: 0, transitionDuration: "700ms" }}
              src={img}>
            </Image>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between items-center">
        <button onClick={() => setImageNavigator(prev => prev -= 1)} /* disabled={imageNavigator === 0} */ className="bg-gradient-to-r rounded-full px-2 py-0 from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-red-500 hover:shadow-lg focus:ring-orange-600">P</button>
        <button onClick={() => setImageNavigator(prev => prev += 1)} className="bg-gradient-to-r rounded-full px-2 py-0 from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-red-500 hover:shadow-lg focus:ring-orange-600">N</button>
      </div>

    </div>
  )
}