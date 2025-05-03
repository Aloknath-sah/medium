interface BlogDetailsProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

export const BlogDetails = ({
    authorName,
    title,
    content,
    publishedDate
    
}: BlogDetailsProps) => {
    return <div className="grid grid-cols-2" >
        
        <div>
            <div>{title} </div>
            <div>{content} </div>
            
        </div>
        <div className="flex" > 
            <img className="w-xs"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnufQE-UlmhNRbUnvIwZZ00UO-o8G_BmH9C5OQ4cdfJ_apAGeYygChHfc&s" />
            <div>
                <div>{authorName} </div>
                <div>{publishedDate} </div>
            </div>
        </div>
    </div>
}