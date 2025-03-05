
import MobileNav from "@/components/shared/MobileNav";
import Search from "@/components/shared/Search";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { getToken } from "@/constans/getToken";
import { JwtPayload } from "jsonwebtoken";


export type barProps = {
  role: string
  token: object | string
  type: 'first' | 'second'
}


export default async function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    
    const tokenData = await getToken()

    const roleName = tokenData?.role

  return (
    <main className="">
      <div className="flex">
        <div className='hidden md:block fixed left-0 bottom-0 min-h-screen z-[9999]'>
          <Sidebar token={tokenData} role={roleName} type='second'/>
        </div>
        <section className='flex min-h-screen max-md:pb-14 flex-col relative w-full sm:ml-[190px] '>
          <div className="relative ">
            <div className="flex w-full gap-3 px-8 sm:-mx-52 items-center justify-between py-6 fixed top-0 md:left-40 left-0 z-50 bg-neutral-950 sm:ml-8">
              <Search />
              <div className="flex items-center gap-3 fixed top-0 right-2 translate-y-7">
                <div className="md:hidden ">
                  <MobileNav token={tokenData} role={roleName} type="second"/>
                </div>
                <Topbar />
              </div>
            </div>
          </div>

          {children}
         
        </section>
      </div>
    </main>
   
  )
}
