import 'quill/dist/quill.snow.css';
import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';

function Editor({ onChange }){
	const { quill, quillRef } = useQuill();

	useEffect(() => {
		if(quill){
			quill.on('text-change', (delta, oldDelta, source) => {
				onChange(quill.root.innerHTML);
			})
		}
	}, [quill])

	return (
		<div className="editor" ref={quillRef}></div>
	)
}

export default Editor;