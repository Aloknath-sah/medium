import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blog = () => {
    const {loading, blog} = useBlogs();

    if(loading) {
        return <div>
            loading....
        </div>
    }
    console.log("blogs", blog)
    return <div>
        <AppBar/>
        {
            blog.map((item) => <BlogCard authorName="david" title={item?.title} content={item?.content} publishedDate={item?.published} />)
        }
        
    </div>
}