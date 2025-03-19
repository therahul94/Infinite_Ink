import axios from "axios";
import { useEffect, useState } from "react";

export interface BlogInterface {
    id: string;
    author: {
        name: string;
    },
    title: string;
    content: string
}

export function useBlogs() {
    const [loading, setLoading] = useState<boolean>(true);
    const [blogs, setBlogs] = useState<BlogInterface[]>([]);
    useEffect(() => {
        async function getBlogs() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setBlogs(response.data.blogs);
                setLoading(false);
            } catch (error) {
                setLoading(true);
                console.log(error);
                return;
            }
        }
        getBlogs();
    }, [])
    return {
        loading,
        blogs
    }
}

export function useBlog({ id }: { id: string }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [blogDetails, setBlogDetails] = useState<BlogInterface>({
        id: "",
        author: {
            name: "string"
        },
        title: "",
        content: ""
    });
    useEffect(() => {
        async function getSpecificBlog() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setBlogDetails(response.data.blog);
                setLoading(false);
            } catch (error) {
                console.log(error);
                return;
            }
        }
        getSpecificBlog();
    }, [id]);
    return {
        loading,
        blogDetails
    }
}

