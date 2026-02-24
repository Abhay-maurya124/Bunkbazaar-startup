import React from 'react';
import { Flame, MessageCircle, Clock, Search, ArrowRight, Star } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "10 Bunk Bed Hacks to Maximize Your Dorm Space",
      excerpt: "Living in a 10x10 room? Here's how to turn your bunk into a high-tech command center without losing your deposit.",
      author: "Rahul S.",
      tag: "Dorm Life",
      likes: 124,
      readTime: "3 min",
      image: "https://images.unsplash.com/photo-1555854816-809d28f00044?w=800&q=80"
    },
    {
      id: 2,
      title: "The Ultimate Guide to Hostel Cooking (No Stove Needed)",
      excerpt: "From electric kettle noodles to iron-pressed sandwiches, we rank the best midnight snacks.",
      author: "Priya K.",
      tag: "Foodies",
      likes: 89,
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80"
    },
    {
      id: 3,
      title: "Second-hand vs. New: What to Buy for Semester 1",
      excerpt: "Save your pocket money. We break down which gear is worth the splurge and what you should buy used on Bunk Bazaar.",
      author: "Admin",
      tag: "Money Tips",
      likes: 245,
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1523240715630-9918c138199b?w=800&q=80"
    }
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans text-slate-900 overflow-hidden">
      <header className="bg-yellow-400 py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 hidden sm:block">
          <Flame size={200} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <span className="bg-black text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider">
            Bunk Bazaar Blog
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mt-4 mb-6 italic uppercase leading-tight">
            Campus <br /> Survival Guide
          </h1>
          <div className="max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search for hacks, recipes, or gear reviews..."
              className="w-full pl-12 pr-4 sm:pr-6 py-3 sm:py-4 rounded-2xl border-none shadow-xl focus:ring-4 focus:ring-black outline-none text-sm sm:text-lg"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-20 pb-16 sm:pb-20">
        <div className="flex gap-3 sm:gap-4 mb-8 sm:mb-12 overflow-x-auto pb-2">
          {['All Posts', 'Hostel Hacks', 'Buying Guides', 'Student Stories', 'Events'].map((cat) => (
            <button
              key={cat}
              className="whitespace-nowrap bg-white border-2 border-black px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              {cat}
            </button>
          ))}
        </div>

        <section className="bg-white border-4 border-black rounded-3xl sm:rounded-[2rem] p-2 mb-12 sm:mb-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row">
          <img
            src={posts[0].image}
            alt="Featured"
            className="w-full md:w-1/2 h-64 sm:h-80 object-cover rounded-2xl"
          />
          <div className="p-4 sm:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-red-500 text-white p-1 rounded">
                <Flame size={14} />
              </span>
              <span className="font-bold text-red-500 uppercase text-xs sm:text-sm tracking-widest">
                Trending Now
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black mb-4 leading-tight">
              {posts[0].title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-lg mb-6">
              {posts[0].excerpt}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-200 rounded-full border-2 border-black flex items-center justify-center font-bold text-sm sm:text-base">
                  R
                </div>
                <span className="font-bold text-sm sm:text-base">
                  {posts[0].author}
                </span>
              </div>
              <button className="flex items-center gap-2 font-black text-sm sm:text-lg group">
                Read More
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
          {posts.slice(1).map((post) => (
            <article
              key={post.id}
              className="bg-white border-4 border-black rounded-3xl sm:rounded-[2rem] overflow-hidden hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="relative h-52 sm:h-64">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover border-b-4 border-black"
                />
                <span className="absolute top-3 left-3 bg-yellow-400 border-2 border-black px-3 py-1 font-black text-[10px] sm:text-xs uppercase tracking-tighter">
                  {post.tag}
                </span>
              </div>
              <div className="p-4 sm:p-8">
                <h3 className="text-lg sm:text-2xl font-black mb-4 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between text-slate-500 font-bold text-xs sm:text-sm">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="flex items-center gap-1 text-pink-600">
                      <Star size={14} fill="currentColor" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {post.readTime}
                    </span>
                  </div>
                  <MessageCircle size={18} className="hover:text-black cursor-pointer" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <section className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-4xl font-black mb-4">
          Don't Miss a Single Drop!
        </h2>
        <p className="text-slate-400 mb-6 sm:mb-8 text-sm sm:text-lg">
          Weekly hostel hacks, bazaar deals, and campus news.
        </p>
        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-2">
          <input
            type="email"
            placeholder="Your college email"
            className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-black font-bold outline-none text-sm sm:text-base"
          />
          <button className="bg-yellow-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-black hover:bg-yellow-300 transition-colors text-sm sm:text-base">
            JOIN
          </button>
        </div>
      </section>
    </div>
  );
};

export default Blog;