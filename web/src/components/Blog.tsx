
import { Link } from 'react-router-dom';

// ... (diğer importlar)

// ... (bileşen kodu)

              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">{post.date || new Date().toLocaleDateString()}</span>
                <Link to={`/post/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
                  Devamını Oku →
                </Link>
              </div>

export default Blog;
