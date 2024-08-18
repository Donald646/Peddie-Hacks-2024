import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { Button } from './ui/button';


export default async function PublicNavbar() {
    const supabase = createClient()
    const { data: { user }, error:userError } = await supabase.auth.getUser()
  return (
    <div className='flex justify-between items-center w-full sticky top-0 backdrop-blur-md p-2 md:px-[2vw] z-50'>
      <div className='hidden md:flex flex-row gap-2 items-center'>
WanderWise
      </div>
     

      <div className='flex items-center gap-2'>
        {user ? (
          <div>
            <Link href="/travel">
              <Button className="" variant={"default"}>Travel</Button>
            </Link>
            <Link href="https://fca087e1-0837-451c-b560-0b930245bb5a-00-1lvtw5rggj0pm.spock.replit.dev/">
              <Button className="" variant={"default"}>Map</Button>
            </Link>
          </div>
        ) : (
          <>
            <Link href="/login" className='hidden md:block'>
              <Button variant={"outline"}>Login</Button>
            </Link>
            <Link href="/signup">
              <Button className=''>Sign Up</Button>
            </Link>
          </>
        )}    
      </div>
    </div>
  );
}