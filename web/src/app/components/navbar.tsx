'use client';
import { Disclosure} from '@headlessui/react'
export default function Navbar() {
    return (
        <Disclosure as="nav" className="bg-white border-b border-gray-200">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Example</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    )
}
