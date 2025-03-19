import { Link } from 'react-router-dom'

interface AuthHeaderInterface {
    subheading: string;
    subHeadlink: string;
    subHead: string;
}
const AuthHeader = ({ subheading, subHeadlink, subHead }: AuthHeaderInterface) => {
    return (
        <div>
            <div className="text-center">
                <div className="font-extrabold text-3xl">
                    Infinite Ink
                </div>
                <div className="text-gray-600 text-sm">
                    <div>
                        {subheading} <Link to={subHeadlink} className="underline">{subHead}</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AuthHeader
