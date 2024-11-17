import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              YourName
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              关于我
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900">
              博客
            </Link>
            <Link href="/projects" className="text-gray-600 hover:text-gray-900">
              项目
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              联系
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <span className="sr-only">打开菜单</span>
              {/* 汉堡菜单图标 */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/about" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
              关于我
            </Link>
            <Link href="/blog" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
              博客
            </Link>
            <Link href="/projects" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
              项目
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
              联系
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 