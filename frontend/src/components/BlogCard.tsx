interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
    
}: BlogCardProps) => {
    return <div className="grid grid-cols-2" >
        
        <div>
            <div>{title} </div>
            <div>{content} </div>
            <div className="flex" > 
                <img className="w-xs"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnufQE-UlmhNRbUnvIwZZ00UO-o8G_BmH9C5OQ4cdfJ_apAGeYygChHfc&s" />
                <div>
                    <div>{authorName} </div>
                    <div>{publishedDate} </div>
                </div>
            </div>
        </div>
        <div>
            <img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*RfRjKGVdiXNCs08mees21g.jpeg" />
        </div>
    </div>
}