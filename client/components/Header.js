/* Completed Header component */
import Link from "next/link";
import React, { useState } from 'react';

function Header() {
  return (
    <nav class="flex items-center justify-between flex-wrap bg-green-900 p-6">
    <div class="flex w-full block flex-grow lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
            <Link href="/index">
                <a class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                    Index
                </a>
            </Link>
            <Link href="/dashboard">
                <a class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                    Dashboard
                </a>
            </Link>
            <Link href="/index">
                <a class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                    Index
                </a>
            </Link>
        </div>
        <div>   
            <Link href="/index">
                <a class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-green-200 mt-4 lg:mt-0">
                    SIGN IN [CURRENTLY]
                </a>
            </Link>
        </div>
    </div>
    </nav>
  );
}

export default Header;