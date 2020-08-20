import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import faceai from './faceai.png';

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
				<div className="Tilt-inner pa3"> 
					<img alt='logo' src={faceai} width={100}/> 
				</div>
			</Tilt>
			<div className='Hover'>
				<h1 >Hover over Me</h1>
			</div>
		</div>
	)
}

export default Logo;