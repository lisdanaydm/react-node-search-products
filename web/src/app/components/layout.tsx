import React from 'react';
import Navbar from './navbar'

export default function Layout({children,}: { children: React.ReactNode }) {
    return (
        <>
            <Navbar/>
            <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 py-6 relative">
                <div className="z-10 w-full max-w-5xl  font-mono text-sm  ">
                    {children}
                </div>
            </main>
        </>
    )
}
