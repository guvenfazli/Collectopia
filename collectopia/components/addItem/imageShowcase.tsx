import { useState } from "react";
import Image from "next/image";


export default function ImageShowcase({ imageShowcase }) {

  const [imageNavigator, setImageNavigator] = useState<number>(0)

  console.log(imageShowcase[0])
  return (
    <div>
      <div className="flex items-center justify-center overflow-hidden relative h-96 border border-black">
        {!imageShowcase ? <p>You did not choose any image yet!</p> : imageShowcase.map((img) =>
          <Image
            key={img}
            width={0} height={0}
            alt="uploadedImage"
            style={{ height: '100%', width: '100%', translate: `${imageNavigator * -100}%`, zIndex: 0 }}
            src={img}>
          </Image>
        )}
      </div>
      <button onClick={() => setImageNavigator(prev => prev -= 1)} className="z-50 text-3xl text-white">Prev</button>
      <button onClick={() => setImageNavigator(prev => prev += 1)} className="z-50 text-white">Next</button>
    </div>
  )
}