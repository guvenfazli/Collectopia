import Image from "next/image";

export default function ImageShowcase({ imageShowcase }) {




  return (
    <div className="flex w-full items-center justify-center relative h-96 border border-black">
      {!imageShowcase ? <p>You did not choose any image yet!</p> : <Image fill alt="uploadedImage" src={imageShowcase}></Image>}
    </div>
  )
}