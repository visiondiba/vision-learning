'use client'

import { loginAction } from '@/lib/actions'
import React, {useState, useEffect } from 'react' 
import { useResettableActionState } from 'use-resettable-action-state';
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from 'next/image'
import { AlertCircleIcon, LoaderCircle, LockKeyhole } from "lucide-react"
import bgPic from '../../../public/assets/bg-login.jpg'

export default function LoginPage() {

    const [state, formAction, isPending, reset] = useResettableActionState(loginAction, null)
    const [caps, setCaps] = useState(false);

    useEffect(() => {
    const syncCapsLock = (e: MouseEvent | KeyboardEvent ) => {
        const isOn = e.getModifierState("CapsLock");
        setCaps(!!isOn);
    };

    window.addEventListener("pointermove", syncCapsLock);
    window.addEventListener("keydown", syncCapsLock);
    window.addEventListener("keyup", syncCapsLock);

    return () => {
        window.removeEventListener("pointermove", syncCapsLock);
        window.removeEventListener("keydown", syncCapsLock);
        window.removeEventListener("keyup", syncCapsLock);
    };
}, []);

useEffect(() => {
    if (state?.error) {
        const timer = setTimeout(() => {
            reset(); 
        }, 4000); 

        return () => clearTimeout(timer);
    }
}, [state, reset]);

    return (
        <>
        <div className='flex flex-col lg:flex-row min-h-screen my-auto overflow-hidden'>
            <div className='relative hidden lg:flex flex-col lg:w-1/2 p-12 justify-between overflow-hidden'>
                <Image
                src={bgPic}
                alt="Background"
                placeholder="blur"
                quality={100}
                fill
                priority
                className="object-cover -z-10"
            />
                <h1 className='text-7xl font-sans font-black tracking-tight text-background text-balance z-10'>
                    Learning System
                </h1>
                
                <div className='z-10 mt-auto'>
                    <p className='font-sans text-xs uppercase font-black text-muted text-left'>
                        Copyright © 2026 Darussalam Computer Center. All Rights Reserved.
                    </p>
                </div>
            </div>

            <div className='flex flex-col w-full bg-background items-center justify-center p-6 md:p-8 overflow-hidden'>
                <div className='w-full max-w-xl space-y-8'>
                    <div className='flex flex-col text-center space-y-2 items-center justify-center'>
                        <LockKeyhole className='size-16 pb-5'/>
                        <h1 className='text-3xl md:text-4xl font-sans font-bold'>
                            Welcome back! Ready to dive in?
                        </h1>
                        <h2 className='text-md font-mono tracking-tighter text-muted-foreground'>
                            Sign in to pick up where you left off.
                        </h2>
                    </div>
                    <div className="absolute -right-5 -bottom-5 text-[7rem] uppercase tracking-tighter font-black italic opacity-5 select-none pointer-events-none">v1.00 - </div>
                     
                    <form action={formAction} className='space-y-6 font-sans tracking-tighter'>
                        {state && state?.error && (
                            <div className='flex flex-col items-center'>
                            <Alert className="max-w-md bg-amber-950">
                                <AlertCircleIcon />
                                <AlertTitle className='font-sans uppercase tracking-widest font-bold font-xl'>Oops! Something&apos;s not matching up.</AlertTitle>
                                <AlertDescription className='font-sans  tracking-wider font-medium font-xl'>
                                    We couldn&apos;t find a match for that username and password combination. Mind giving it another shot? (Don&apos;t forget to check your Caps Lock!)
                                </AlertDescription>
                            </Alert>
                            </div>
                            
                        )}
                            <Field>
                                <FieldLabel htmlFor='identifier' className="text-[13px] font-bold uppercase tracking-widest opacity-60">Reg. No. or Username</FieldLabel>
                                <Input 
                                    id="identifier" 
                                    name="identifier"
                                    type='text' 
                                    placeholder='1.42.82834' 
                                    required
                                    className="h-10 text-lg md:text-xl px-4 border-2 focus:ring-2" // h-14 agar tidak kekecilan di HP
                                    disabled={isPending}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor='password' title='password' className="text-[13px] font-bold uppercase tracking-widest opacity-60">Password</FieldLabel>
                                <Input 
                                    id="password"
                                    name="password" 
                                    type='password'
                                    placeholder='Password' 
                                    required
                                    className="h-10 text-lg md:text-xl px-4 border-2 focus:ring-2" // h-14 agar tidak kekecilan di HP
                                    disabled={isPending}
                                />
                                {caps && (
                                <FieldDescription className="text-destructive font-bold animate-pulse">
                                    Caps lock is on!
                                </FieldDescription>
                            )}
                            </Field>
                            
                            <Button 
                                type='submit'
                                className="h-14 text-lg font-semibold md:text-xl px-4 border-2 focus:ring-2 w-full"
                                disabled={isPending}
                                size='lg'
                                >
                                {isPending ? (
                                    <>
                                <LoaderCircle className='animate-spin mr-2'/> Please, wait.
                                </> ) 
                                : "Sign in"}
                            </Button>
                    </form>
                </div>
            </div>
        </div>  
    </>)
}