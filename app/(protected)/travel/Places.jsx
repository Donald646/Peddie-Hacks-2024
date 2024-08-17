import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/server';

export default async function Places() {
  const supabase = createClient()
  const {data, error} = await supabase.from("locations").select("*")
  if(error){
    console.log(error)
  }
  const { data: { user }, error:userError } = await supabase.auth.getUser()
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border-2 h-screen w-full p-10'>
      <p>Welcome Back, {user?.email}</p>
      {data.map((place) => (
        <Card key={place.id} className='flex flex-col h-full'>
          <CardHeader className='bg-gray-100 p-4'>
            <CardTitle className='text-xl font-bold text-gray-800'>{place.title}</CardTitle>
          </CardHeader>
          <CardContent className='p-4 flex-grow'>
            <CardDescription className='text-gray-600'>{place.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}