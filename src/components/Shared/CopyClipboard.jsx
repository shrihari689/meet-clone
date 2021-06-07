import { useEffect, useState } from "react";

const CopyClipboard = ({ text, className, displayText, position = "-top-8" }) => {

    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        let timeoutId;
        if (isCopied) {
            timeoutId = setTimeout(() => {
                setIsCopied(false);
            }, 2000)
        }
        return () => {
            clearTimeout(timeoutId)
        }
    }, [isCopied]);

    const copyText = (_) => {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setIsCopied(true);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }

    return (
        <div className="flex items-center relative select-none">
            {isCopied && (
                <div className={`absolute ${position} left-0 bg-indigo-600 px-3 py-1 text-xs rounded-md text-gray-300`}>
                    Copied!
                </div>
            )}
            <span
                className={className}
                onClick={copyText}>
                {displayText}
            </span >
        </div>
    );
}

export default CopyClipboard;