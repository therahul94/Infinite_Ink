import axios from "axios";
import Appbar from "../Components/Appbar"
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { alertFn, iconsEnum } from "../Alerts";
import { BlogTypes } from "@sunglah_npm/medium-blog";
import { useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";

const Publish = () => {
    const navigate = useNavigate();
    const [postBlogState, setpostBlogState] = useState<BlogTypes>({
        title: "",
        content: "",
        published: true
    })
    const [loading, setLoading] = useState<boolean>(false);
    async function postBlog(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`,
                postBlogState
                , {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    },
                });
                setLoading(false);
                alertFn({ title: "Blog published successfully ", text: "", icon: iconsEnum.success, footer: "" });
                navigate(`/blog/${response.data.id}`)
                return;
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            alertFn({ title: "Something went wrong!", text: "Blog is not published, Please try later! Server busy!", icon: iconsEnum.error, footer: "" });
            return;
        }
    }

    function handlechangeTitle(e: ChangeEvent<HTMLInputElement>) {
        setpostBlogState(curr => ({ ...curr, title: e.target.value }));
    }
    if(loading) {
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>
    }

    return (
        <div className="flex flex-col h-screen">
            <Appbar publishpage={true} />
            <div className="flex justify-center overflow-hidden ">
                <div className="max-w-2xl min-w-xs md:min-w-xl p-2">
                    <div className="mb-5">
                        <input type="text" onChange={handlechangeTitle} className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl font-extrabold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" required />
                    </div>
                    <div >
                        <label className="block mb-2 text-sm font-medium text-gray-900">Body</label>
                        <EditorPage setpostBlogState={setpostBlogState} />
                    </div>
                    <div className="mt-3 flex justify-end">
                        <button type="button" onClick={postBlog} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Publish</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function EditorPage({ setpostBlogState }: { setpostBlogState: Dispatch<SetStateAction<{ title: string; content: string; published: boolean; }>> }) {
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];



    const wrapperRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.innerHTML = "";
            const editor = document.createElement("div");
            wrapperRef.current.appendChild(editor);

            quillRef.current = new Quill(editor, {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow'
            });
            quillRef.current.on('text-change', () => {
                const html = quillRef.current?.root.innerHTML || "";
                setpostBlogState(curr => ({ ...curr, content: html }));
            });
        }

        return () => {
            if (quillRef.current) {
                quillRef.current = null;
            }
            if (wrapperRef.current) {
                wrapperRef.current.innerHTML = "";
            }
        };
    }, []);
    return (
        <div className="editor" ref={wrapperRef}></div>
    )
}



export default Publish
