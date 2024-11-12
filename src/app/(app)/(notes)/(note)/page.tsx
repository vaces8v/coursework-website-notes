import {NoteCard} from "@/components/shared/NoteCard/NoteCard";

export default function Home() {
    return (
        <>
            {new Array(20).fill(0).map((_, i) => (
                <div key={i}>
                    <NoteCard id={i} />
                </div>
            ))}
        </>
    );
}
