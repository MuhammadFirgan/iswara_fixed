import LoginForm from "@/components/shared/LoginForm";
import Image from "next/image";

export default function login() {
  return (
    <section className="relative h-screen w-full">
        <div className="absolute top-0 left-0 size-full blur-[5px] -z-10">
            <Image src="/classroom.jpg" width={1000} height={1000} alt="background" className="size-full brightness-50" />
        </div>
        <div className="z-20 flex justify-center items-center h-screen">
          <LoginForm />
        </div>
      
    </section>
  )
}
