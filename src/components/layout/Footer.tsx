import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 社交媒体链接 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              社交媒体
            </h3>
            <div className="mt-4 space-y-4">
              <a href="https://github.com/yourusername" className="text-gray-500 hover:text-gray-900">
                GitHub
              </a>
              <a href="https://linkedin.com/in/yourusername" className="text-gray-500 hover:text-gray-900">
                LinkedIn
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              快速链接
            </h3>
            <div className="mt-4 space-y-4">
              <Link href="/blog" className="text-gray-500 hover:text-gray-900">
                博客
              </Link>
              <Link href="/projects" className="text-gray-500 hover:text-gray-900">
                项目
              </Link>
            </div>
          </div>

          {/* 联系信息 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              联系方式
            </h3>
            <div className="mt-4 space-y-4">
              <p className="text-gray-500">
                邮箱：your.email@example.com
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 