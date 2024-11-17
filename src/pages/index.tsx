import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            你好，我是 <span className="text-yellow-300">Your Name</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            开发工程师 & 技术博主
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-2xl">
            专注于构建优秀的用户体验和高性能的应用程序
          </p>
          <div className="space-x-4">
            <Link 
              href="/projects"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              查看项目
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors"
            >
              联系我
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">快速访问</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Latest Blog Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">最新博客</h3>
              <p className="text-gray-600 mb-4">查看我最新发布的技术文章和心得分享</p>
              <Link href="/blog" className="text-purple-600 hover:text-purple-700">
                阅读更多 →
              </Link>
            </div>

            {/* Featured Project Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">精选项目</h3>
              <p className="text-gray-600 mb-4">浏览我的代表作品和技术解决方案</p>
              <Link href="/projects" className="text-purple-600 hover:text-purple-700">
                查看项目 →
              </Link>
            </div>

            {/* About Me Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">关于我</h3>
              <p className="text-gray-600 mb-4">了解我的技术栈、经历和个人兴趣</p>
              <Link href="/about" className="text-purple-600 hover:text-purple-700">
                了解更多 →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 