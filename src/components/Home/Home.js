import React from "react";
import { NavLink } from "react-router-dom";
import Main from "../Main/Main";

const Home = (props) => {

	return (
		<Main>
			<div className="container content white">
				<h2 className="center red-text">Mission</h2>
				<p className="center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id illo non sapiente iusto est quam deserunt atque. Expedita, corrupti accusantium id illum neque, dicta voluptatem quibusdam, exercitationem nesciunt non iste!</p>

				<h2 className="center red-text">Vission</h2>
				<p className="center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, nesciunt cumque ut beatae dignissimos odit fugit exercitationem porro quos qui, corporis vel asperiores temporibus animi nam neque. Voluptate, aut assumenda.</p>

				<h2 className="center red-text">Core Values</h2>
				<p className="center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum nemo assumenda quidem adipisci sapiente atque ipsa dicta odit quasi? Harum natus soluta dolores quae aliquid dicta optio nostrum, nulla quia?</p>

				<div>
					<div className="row">
						
						<div className="col s6 m6">
							<h3 className="header">We Do Nails</h3>
							<div className="card small horizontal">
							<div className="card-image">
								<img src="/img/nail.jpg" />
							</div>
							<div className="card-stacked">
								<div className="card-content">
								<p>We are experts when it comes to nails. Come and see it for yourself</p>
								</div>
								<div className="card-action">
								<NavLink to="/nails" >Go To Nail Styles</NavLink>
								</div>
							</div>
							</div>
						</div>

						<div className="col s6 m6">
							<h3 className="header">We Do Hair-Styles</h3>
							<div className="card small horizontal">
							<div className="card-image">
								<img src="/img/hair-style.jpg" />
							</div>
							<div className="card-stacked">
								<div className="card-content">
								<p>We are experts when it comes to nails. Come and see it for yourself</p>
								</div>
								<div className="card-action">
								<NavLink to="/hairStyles" >Go To Hair Styles</NavLink>
								</div>
							</div>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</Main>
	);
};

export default Home;