import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  if (featured) {
    return (
      <Link href={`/post/${post.id}`} className="block group">
        <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-64 md:h-80">
            {post.thumbnail ? (
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className="inline-block px-3 py-1 bg-blue-600 text-sm rounded-full mb-3">
                {post.categoryName}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-200 line-clamp-2">{post.description}</p>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/post/${post.id}`} className="block group">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
        <div className="relative h-48">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600" />
          )}
        </div>
        <div className="p-5">
          <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded mb-3">
            {post.categoryName}
          </span>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.description}</p>
          <div className="flex items-center text-xs text-gray-500">
            <span>{post.date}</span>
            <span className="mx-2">·</span>
            <span>{post.readTime} 읽기</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
