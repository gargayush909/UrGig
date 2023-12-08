'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { cn } from '@/lib/utils';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { Input } from '../ui/input';
import { Label } from "@/components/ui/label"

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});
 
const SignIn = () => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  async function signIn(formData: {email: string, password: string}) {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      setErrorMsg(error.message);
      throw error;
    }
    router.refresh();
  }
  async function signUpGoogle() {
    await supabase.auth.signInWithOAuth({provider: "google", options: {redirectTo: `${location.origin}/auth/callback`}}).then(() => {router.refresh()}).catch((error) => {console.error(error); throw error;})
  }

  return (
    <div className='flex justify-center items-center flex-col min-w-screen lg:px-12 px-4 lg:py-24 py-12'>
      <div className="w-full lg:w-[400px] flex flex-col items-center justify-center shadow-2xl shadow-gray-100 p-12 rounded-[1em]">
        {/* <Button variant={"outline"} onClick={signUpGoogle} className='w-full flex flex-row gap-2 hover:bg-background '>
          <FcGoogle className="w-6 h-6"/>
          Sign in with Google
        </Button> */}
        <br/>
        {/* <h2 className="w-full text-center text-5xl">Sign Up</h2> */}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignInSchema}
          onSubmit={signIn}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="w-full flex flex-col gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Field
                  as={Input}
                  className={cn('input p-2 rounded-lg', errors.email && touched.email && 'bg-red-50')}
                  id="email"
                  name="email"
                  placeholder="hello@gmail.com"
                  type="email"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-600 text-xs w-full text-right">{errors.email}</div>
                ) : null}
              </div>
              <div>
                <Label htmlFor="email">Password</Label>
                <Field
                  as={Input}
                  className={cn('input p-2 rounded-lg mb-4', errors.password && touched.password && 'bg-red-50')}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-600 text-xs w-full text-right">{errors.password}</div>
                ) : null}
              </div>
              <Button variant={"secondary"} className="w-full" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        
        <Link href="/signup" className="link w-full text-center text-sm">
          <Button variant={"link"} className='p-0 text-foreground'>
            Do not have an account?
          </Button>
        </Link>
        {errorMsg && <div className="text-red-600 text-center">{errorMsg}</div>}
      </div>
    </div>
  );
};

export default SignIn;
