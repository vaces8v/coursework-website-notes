export default async function Notes({params}: {
    params: Promise<{ id: string }>
}) {
    const slug = (await params).id
    return (
        <>
            <h1 className="text-white text-5xl mt-[20px]">
                Ваша тема: {slug}
            </h1>
        </>
    )
}