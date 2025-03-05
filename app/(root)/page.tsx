import Card from "@/components/shared/Card";
import Image from "next/image";
import Link from "next/link";


export default function page() {
  return (
    
    <section className="flex flex-col lg:flex-row w-full mt-28 overflow-hidden">
      <div className="flex flex-col items-center w-full sm:max-w-2xl sm:mx-8">
        <div className="w-full px-4 bg-primary rounded max-w-[400px] sm:max-w-2xl mx-auto">
          <h1 className="py-10 text-xl">AI Bicara, Kamu Mendengar</h1>
        </div>
        <div className="flex justify-center gap-4 sm:gap-5 sm:justify-normal flex-wrap pt-10 min-h-screen ">
          <Card image="/horizontal.jpg" title="" name="" profile="" />
          <Card image="/horizontal.jpg" title="" name="" profile="" />
          <Card image="/horizontal.jpg" title="" name="" profile="" />
          <Card image="/horizontal.jpg" title="" name="" profile="" />
          <Card image="/vertical.jpg" title="" name="" profile="" />
          <Card image="/vertical.jpg" title="" name="" profile="" />
          <Card image="/vertical.jpg" title="" name="" profile="" />
        </div>
      </div>
      <div className="lg:fixed lg:right-0 lg:bottom-0 lg:top-10 lg:min-h-screen lg:w-[350px] lg:bg-neutral-900 px-4 py-8">
      {/* <div className="px-4 py-8 sm:min-h-screen sm:w-[350px] sm:bg-neutral-900 rounded mr-5"> */}
        <h1 className="mb-4">Trending</h1>
        <Link href="">
          <Image src="/horizontal.jpg" width={200} height={200} alt="trending" className="w-full rounded"/>
          <h3 className="line-clamp-2 pt-4 text-sm font-bold ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus libero, atque suscipit quo error ullam consequatur magni totam excepturi impedit.</h3>
        </Link>

        <Link href="" className="flex items-center mt-8 gap-3">
          <Image src="/horizontal.jpg" width={200} height={200} alt="trending" className="w-12 h-12 rounded"/>
          <h3 className="line-clamp-2 text-sm font-bold ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus libero, atque suscipit quo error ullam consequatur magni totam excepturi impedit.</h3>

        </Link>
      
      </div>
    </section>
  )
}
