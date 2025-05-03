import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from 'axios';

interface Blog {
    authorName: string,
    content: string,
    title: string,
    id: string,
    published: string,
    authorId: string
}

export const useBlog = ({id}: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setBlog(response.data);
                setLoading(false);
            })
    }, [])
    
    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setBlogs(response.data);
                setLoading(false);
            })
    }, [])
    
    return {
        loading,
        blogs
    }
}