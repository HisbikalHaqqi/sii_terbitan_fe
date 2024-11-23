'use server'

import  EncryptData  from '@/helpers/EncryptData'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libs/auth'
import { cookies } from 'next/headers'
import { signOut } from 'next-auth/react'

const NetworkHelper = async (req) => {
  try {
    const { url, requestBody } = await req.json();
    const encryptData          =  EncryptData(requestBody)
   

    const session               = await getServerSession(authOptions)
    const token                 = session.user?.accessToken

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ data: encryptData }),
      cache: 'no-store'
    }
  
    const res           = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`, requestOptions)
    const dataResponse  = await res.json()

    const getResponse   = JSON.parse(JSON.stringify(dataResponse))
    const resCode       = getResponse.data.responseCode   
    console.log(dataResponse)

    if ([200, 201].includes(resCode)) {
      return Response.json({ data: getResponse.data.data ,status: 200 })
    } else if (resCode == 400) {
      return Response.json({ message: 'Request Failed' }, { status: 400 })
    } else if (resCode == 401) {
      const allCookies = cookies().getAll()
      allCookies.forEach(cookie => {
        cookies().set(cookie.name, '', { maxAge: 0, path: '/' })
      })
      await signOut({ redirect: '/session-expired' })
      return Response.json({ message: 'UnAuthorized' }, { status: 401 })
    } else {
      return Response.json({ message: getResponse.data.message })
    }
  } catch (error) {
    return Response.json({ message: error})
  }
}

export default NetworkHelper
