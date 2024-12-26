
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
        <div className='hidden lg:block fixed left-0 bottom-0 min-h-screen'>
          <Sidebar token={tokenData} role={roleName} type='second'/>
        </div>
        <section className='flex min-h-screen max-md:pb-14 flex-col relative z-500 w-full sm:ml-[250px]'>
          <div className="flex w-full justify-between items-center gap-3 px-8 py-6">
            <Search />
            <div className="flex items-center gap-3 relative">
              <div className="md:hidden">
                <MobileNav token={tokenData} role={roleName} type="second"/>
              </div>
              <Topbar />
            </div>
          </div>

          {children}
         
        </section>
      </div>
    </main>
   
  )
}
