
export default function ErrorAlert(props) {
    const { message } = props;

    return (
        <>
            <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
                <p className="text-sm">{message}</p>
            </div>
        </>
    )
}
