/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/slice/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
	const { id } = useSelector((state) => state.auth);
	const [menuOpen, setMenuOpen] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const dispatch = useDispatch();

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		toast.warning("Log out success", {
			position: "top-center",
		});
		setMenuOpen(false);
	};

	useEffect(() => {
		let lastScrollTop = 0;
		const handleScroll = () => {
			const currentScrollTop =
				window.pageYOffset || document.documentElement.scrollTop;
			if (currentScrollTop > lastScrollTop) {
				// Scrolling down
				setIsHidden(true);
			} else {
				// Scrolling up
				setIsHidden(false);
			}
			lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className='w-full border-b-2 border-gray-600'>
			<nav
				className={`bg-gray-800 p-4 sticky-navbar ${
					isHidden ? "navbar-hidden" : ""
				}`}
			>
				<div className='container mx-auto flex justify-between items-center'>
					<div className='text-white text-2xl font-bold'>
						<Link to='/' onClick={() => setMenuOpen(false)}>
							<img
								src='/images/sangtosha.png'
								alt='Monsters Logo'
								className='h-10 w-10 rounded-full'
							/>
						</Link>
					</div>
					<div className='flex items-center gap-4'>
						{id ? (
							<>
								<div className='md:hidden flex items-center gap-4'>
									<button
										className='text-white hover:text-blue-400 focus:outline-none'
										onClick={toggleMenu}
									>
										<FaBars className='w-6 h-6' /> {/* Bars icon */}
									</button>
								</div>
								<div className='hidden md:flex items-center gap-4'>
									<Link
										to='/'
										className={`${
											window.location.pathname === "/"
												? "text-blue-400"
												: "text-white"
										} hover:text-blue-400`}
										onClick={() => setMenuOpen(false)}
									>
										Home
									</Link>
									<Link
										to='/jackpots'
										className={`${
											window.location.pathname === "/jackpots"
												? "text-blue-400"
												: "text-white"
										} hover:text-blue-400`}
										onClick={() => setMenuOpen(false)}
									>
										Jackpots
									</Link>
									<Link
										to='/vip'
										className={`${
											window.location.pathname === "/vip"
												? "text-blue-400"
												: "text-white"
										} hover:text-blue-400`}
										onClick={() => setMenuOpen(false)}
									>
										Vip Tips
									</Link>
									<Link
										to='/previous'
										className={`${
											window.location.pathname === "/previous"
												? "text-blue-400"
												: "text-white"
										} hover:text-blue-400`}
										onClick={() => setMenuOpen(false)}
									>
										Previous Winnings
									</Link>
									<Link
										to='/bet-of-the-day'
										className={`${
											window.location.pathname === "/bet-of-the-day"
												? "text-blue-400"
												: "text-white"
										} hover:text-blue-400`}
										onClick={() => setMenuOpen(false)}
									>
										Bet Of The Day
									</Link>
									<Link
										to='/contact'
										className={`${
											window.location.pathname === "/contact"
												? "text-blue-400"
												: "text-white"
										} hover:text-blue-400`}
										onClick={() => setMenuOpen(false)}
									>
										Contact
									</Link>
									<Link
										to='/profile'
										className={`${
											window.location.pathname === "/profile"
												? "text-blue-400"
												: "text-white"
										} hover:text-blue-400`}
										onClick={() => setMenuOpen(false)}
									>
										Profile
									</Link>
									<button
										onClick={handleLogout}
										className='text-white hover:text-blue-400 focus:outline-none'
									>
										Logout
									</button>
								</div>
							</>
						) : (
							<div className='flex items-center gap-4'>
								<div className='md:hidden'>
									<button
										className='text-white hover:text-blue-400 focus:outline-none'
										onClick={toggleMenu}
									>
										<FaBars className='w-6 h-6' /> {/* Bars icon */}
									</button>
								</div>
								<div className='hidden md:flex gap-4'>
									<Link to='/signup' className='text-white hover:text-blue-400'>
										Sign Up
									</Link>
									<Link to='/login' className='text-white hover:text-blue-400'>
										Sign In
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
				{/* Mobile Menu */}
				{menuOpen && (
					<div className='fixed top-16 right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10'>
						<div className='px-4 py-2'>
							<Link
								to='/'
								className='block px-4 py-2 hover:bg-gray-200'
								onClick={() => setMenuOpen(false)}
							>
								Home
							</Link>
							{id && (
								<>
									<Link
										to='/jackpots'
										className='block px-4 py-2 hover:bg-gray-200'
										onClick={() => setMenuOpen(false)}
									>
										Jackpots
									</Link>
									<Link
										to='/vip'
										className='block px-4 py-2 hover:bg-gray-200'
										onClick={() => setMenuOpen(false)}
									>
										Vip Tips
									</Link>
									<Link
										to='/previous'
										className='block px-4 py-2 hover:bg-gray-200'
										onClick={() => setMenuOpen(false)}
									>
										Previous Winnings
									</Link>
									<Link
										to='/bet-of-the-day'
										className='block px-4 py-2 hover:bg-gray-200'
										onClick={() => setMenuOpen(false)}
									>
										Bet Of The Day
									</Link>
									<Link
										to='/contact'
										className='block px-4 py-2 hover:bg-gray-200'
										onClick={() => setMenuOpen(false)}
									>
										Contact
									</Link>
									<Link
										to='/profile'
										className='block px-4 py-2 hover:bg-gray-200'
										onClick={() => setMenuOpen(false)}
									>
										Profile
									</Link>
									<button
										onClick={handleLogout}
										className='block w-full text-left px-4 py-2 hover:bg-gray-200'
									>
										Logout
									</button>
								</>
							)}
							{!id && (
								<>
									<Link
										to='/signup'
										className='block px-4 py-2 hover:bg-gray-200'
										onClick={() => setMenuOpen(false)}
									>
										Sign Up
									</Link>
									<Link
										to='/login'
										className='block px-4 py-2 hover:bg-gray-200'
										onClick={() => setMenuOpen(false)}
									>
										Sign In
									</Link>
								</>
							)}
						</div>
					</div>
				)}
			</nav>
		</div>
	);
};

export default Navbar;
