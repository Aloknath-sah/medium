import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading) {
        return <div>
            loading....
        </div>
    }
    console.log("blogs", blogs)
    return <div>
        <AppBar/>
        {
            blogs.map((blog) => <BlogCard authorName="david" title={blog?.title} content={blog?.content} publishedDate={blog?.published} />)
        }
        
    </div>
}