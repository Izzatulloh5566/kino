import ContentLoader from "react-content-loader"

const Skleton = () => {
    return (
        <ContentLoader
            speed={1}
            width={311}
            height={460}
            backgroundColor="gray"
            foregroundColor="#fff"
        >
            <rect x="0" rx="10" ry="10" width="311" height="460" />
        </ContentLoader>
    )
}

export default Skleton