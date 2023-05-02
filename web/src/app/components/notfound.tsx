type Props = {
    text: string
};

export default function Notfound({text}: Props) {
    return <div
        className="mt-2 w-full min-h-[250px] flex flex-col justify-center items-center bg-gray-200">
        <div className="@apply w-[52px] h-[52px] bg-[url(/images/rocket.svg)];">
            <svg fill="#ea5a59" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet"
                 xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                <g id="SVGRepo_iconCarrier">
                    <title>Not Found</title>
                    <path d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z"
                          className="clr-i-outline clr-i-outline-path-1"/>
                    <circle cx="25.16" cy="14.28" r="1.8" className="clr-i-outline clr-i-outline-path-2"/>
                    <circle cx="11.41" cy="14.28" r="1.8" className="clr-i-outline clr-i-outline-path-3"/>
                    <path
                        d="M18.16,20a9,9,0,0,0-7.33,3.78,1,1,0,1,0,1.63,1.16,7,7,0,0,1,11.31-.13,1,1,0,0,0,1.6-1.2A9,9,0,0,0,18.16,20Z"
                        className="clr-i-outline clr-i-outline-path-4"/>
                    <rect x="0" y="0" width="36" height="36" fillOpacity="0"/>
                </g>
                share
            </svg>
        </div>
        <h2 className='text-[#525f7f] text-xl font-normal text-center mx-6 my-2.5'>{text}</h2>
    </div>
}
