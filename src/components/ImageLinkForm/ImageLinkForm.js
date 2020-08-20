import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div>
			<p className='f3 black'> 
				{'This is the coolest face detection website, Give it a try!'}
			</p>
			<div className='center'>
				<div className='form pa2 br3 shadow-5'>
					<input onChange={onInputChange} className='f4 pa2 w-70' type='text' />
					<button onClick={onButtonSubmit} className='w-30 grow pointer f4 link ph3 pv2 dib bg-light-yellow'>Detect</button>
				</div>
			</div>
		</div>
	)

}

export default ImageLinkForm;