
import MobileNav from "@/components/shared/MobileNav";
import Search from "@/components/shared/Search";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { getToken } from "@/constans/getToken";
import { getUserByRole } from "@/lib/actions/user.action";


export default async function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const tokenData = await getToken()
    
    const user = await getUserByRole(tokenData?.id)
    const role = user?.role.name 
    
    
    
  return (
    <main className="relative">
      <div className="flex relative">
        <div className='hidden lg:block relative '>
          <Sidebar token={tokenData} role={role}/>
        </div>
        <section className='flex min-h-screen max-md:pb-14 flex-col relative z-500 w-full'>
          <div className="flex w-full justify-between items-center gap-3 px-8 py-6">
            <Search />
            {/* <div >
            </div> */}

            <div className="flex items-center gap-3 relative">
              <div className="md:hidden">
                <MobileNav token={tokenData} />
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
