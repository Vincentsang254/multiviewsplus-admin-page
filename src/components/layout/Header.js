/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { FaBars, FaUser } from "react-icons/fa";
import { logoutUser } from "../../features/slice/authSlice";

const Navbar = () => {
	const dispatch = useDispatch();
	const { id, userType, phoneNumber, email, name } = useSelector(
		(state) => state.auth
	);
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);
	const [userDropdownOpen, setUserDropdownOpen] = useState(false);

	const handleLogout = () => {
		dispatch(logoutUser(null));
		toast.warning("Logout success!", { position: "top-center" });
		navigate("/login");
	};

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
		// Close user dropdown when opening menu dropdown
		setUserDropdownOpen(false);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	const toggleUserDropdown = () => {
		setUserDropdownOpen(!userDropdownOpen);
		// Close menu dropdown when opening user dropdown
		setMenuOpen(false);
	};

	const closeUserDropdown = () => {
		setUserDropdownOpen(false);
	};

	return (
		<div className='w-full border-b-2 border-gray-600'>
			<nav className='bg-gray-800 p-4'>
				<div className='container mx-auto flex justify-between items-center'>
					<div className='text-white text-2xl font-bold'>
						<Link to='/' onClick={closeMenu}>
							Monsters
						</Link>
					</div>
					<div className='flex items-center gap-4'>
						{/* Conditional rendering for icons and buttons */}
						{id ? (
							<>
								<div className='hidden md:flex items-center gap-4'>
									<Link
										to='/'
										className={`${
											window.location.pathname === "/"
												? "text-blue-400"
												: "text-white"
										} hover:text-blue-400`}
										onClick={closeMenu}
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
										onClick={closeMenu}
									>
										jackpots
									</Link>
									<Link
										to='/vip'
										className={`${
											window.location.pathname === "/vip"
												? "text-blue-400"
												: "text-white"
										} hover:text-blue-400`}
										onClick={closeMenu}
									>
										Vip tips
									</Link>

									<Link
										to='/contact'
										className={`${
											window.location.pathname === "/contact"
												? "text-blue-400"
												: "text-white"
										} hover:text-blue-400`}
										onClick={closeMenu}
									>
										Contact
									</Link>
									<div className='relative'>
										<button
											className='text-white hover:text-blue-400 focus:outline-none'
											onClick={toggleUserDropdown}
										>
											<FaUser className='w-6 h-6' /> {/* User icon */}
										</button>
										{userDropdownOpen && (
											<div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10'>
												<div className='px-4 py-2'>
													<span className='block font-bold'>{phoneNumber}</span>
													<span className='block truncate text-md font-bold'>
														{email}
													</span>
													<span className='block truncate text-md font-bold'>
														{name}
													</span>
													{userType === "admin" && (
														<span className='block font-bold'>
															You are an Admin
														</span>
													)}
												</div>
												{userType === "admin" && (
													<Link
														to='/admin'
														className='block px-4 py-2 hover:bg-gray-200'
														onClick={closeUserDropdown}
													>
														Admin
													</Link>
												)}
												<Link
													to='/profile'
													className='block px-4 py-2 hover:bg-gray-200'
													onClick={closeUserDropdown}
												>
													Profile
												</Link>
												<div className='border-t my-2'></div>
												<button
													className='block w-full text-left px-4 py-2 hover:bg-gray-200'
													onClick={handleLogout}
												>
													Sign out
												</button>
											</div>
										)}
									</div>
								</div>
								<div className='md:hidden flex items-center gap-4'>
									<button
										className='text-white hover:text-blue-400 focus:outline-none'
										onClick={toggleMenu}
									>
										<FaBars className='w-6 h-6' /> {/* Bars icon */}
									</button>
									<div className='relative'>
										<button
											className='text-white hover:text-blue-400 focus:outline-none'
											onClick={toggleUserDropdown}
										>
											<FaUser className='w-6 h-6' /> {/* User icon */}
										</button>
										{userDropdownOpen && (
											<div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10'>
												<div className='px-4 py-2'>
													<span className='block font-bold'>{phoneNumber}</span>
													<span className='block truncate text-md font-bold'>
														{email}
													</span>
													<span className='block truncate text-md font-bold'>
														{name}
													</span>
													{userType === "admin" && (
														<span className='block font-bold'>
															You are an Admin
														</span>
													)}
												</div>
												{userType === "admin" && (
													<Link
														to='/admin'
														className='block px-4 py-2 hover:bg-gray-200'
														onClick={closeUserDropdown}
													>
														Admin
													</Link>
												)}
												<Link
													to='/profile'
													className='block px-4 py-2 hover:bg-gray-200'
													onClick={closeUserDropdown}
												>
													Profile
												</Link>
												<div className='border-t my-2'></div>
												<button
													className='block w-full text-left px-4 py-2 hover:bg-gray-200'
													onClick={handleLogout}
												>
													Sign out
												</button>
											</div>
										)}
									</div>
								</div>
							</>
						) : (
							// User not authenticated
							<div className='hidden md:flex gap-4'>
								<Link to='/signup' className='text-white hover:text-blue-400'>
									Sign Up
								</Link>
								<Link to='/login' className='text-white hover:text-blue-400'>
									Sign In
								</Link>
							</div>
						)}
						{/* Conditional rendering for menu dropdown on mobile */}
						{menuOpen && (
							<div className='absolute top-16 right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10'>
								<div className='px-4 py-2'>
									<Link
										to='/'
										className='block px-4 py-2 hover:bg-gray-200'
										onClick={() => {
											closeUserDropdown();
											closeMenu();
										}}
									>
										Home
									</Link>

									<Link
										to='/jackpots'
										className='block px-4 py-2 hover:bg-gray-200'
										onClick={() => {
											closeUserDropdown();
											closeMenu();
										}}
									>
										jackpots
									</Link>
									<Link
										to='/vip'
										className='block px-4 py-2 hover:bg-gray-200'
										onClick={() => {
											closeUserDropdown();
											closeMenu();
										}}
									>
										Vip tips
									</Link>

									<Link
										to='/contact'
										className='block px-4 py-2 hover:bg-gray-200'
										onClick={() => {
											closeUserDropdown();
											closeMenu();
										}}
									>
										Contact
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;

