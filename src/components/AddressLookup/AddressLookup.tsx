import React, { useEffect, useState } from "react";
import { AppProps, User } from "../../common/types";
import { alphabetizeByName, formatName } from "../../utils/helpers";
import {
	Autocomplete,
	Box,
	CircularProgress,
	Stack,
	TextField
} from "@mui/material";

const AddressLookup: React.FC<AppProps> = ({ message = 'Address Lookup:' }) => {
	const [value, setValue] = useState<User | null>(null);
	const [userData, setUserData] = useState<User[] | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
   
	useEffect(() => {
		const fetchUserData = async () => {
			// get the data from the api
			const userData = await fetch('https://jsonplaceholder.typicode.com/users');
			// convert the data to json
			const json = await userData.json();
			// reduce the objects keys to only what is needed and format 'name'
			const reducedUserInfo: User[] = json.map((user: User) => {
				const { 
					address,
					id,
					name
				} = user;

				return ({
					address,
					id,
					name: formatName(name),
				});
			});
			// alphabetize the users
			const sortedUsers = alphabetizeByName(reducedUserInfo);
			// set state with the result
			setUserData(sortedUsers);
		}
		
		// Catch and log errors
		fetchUserData().catch(console.error);;
	}, [setUserData]);

	/**
	 * @name renderAddress
	 * @description Renders selected User's name and address in specific format.
	 * @returns {React.Component} A React component.
	 */
	const renderAddress = () => (
		<Stack className="AddressLookup__result" textAlign={'left'} spacing={1} sx={{ fontWeight: 'normal', width: 300 }}>
			<Box component="span" fontWeight='fontWeightBold'>
				<p style={{margin: 0}}>{value?.name}: </p>
			</Box>
			
			<p>{value?.address?.street}</p>
			<p>{value?.address?.suite}</p>
			<p><span>{value?.address?.city}</span>, <span>{value?.address?.zipcode}</span></p>
		</Stack>
	);
	
	return (
		<Stack
			className='AddressLookup'
			textAlign={'left'}
			spacing={2}
			sx={{pt: 10, width: 320, margin: '0 auto', fontWeight: 'bold' }}
		>
			{!userData?.length && <div><CircularProgress color="inherit" size={20} /></div>}
			{userData?.length && (
				<>
					<h1>{message}</h1>

					<Autocomplete
						value={value}
						onChange={(event: React.SyntheticEvent, newValue: User | null) => {
							// console.log('Changing :: ', newValue);
							setValue(newValue);
						}}
						inputValue={inputValue}
						onInputChange={(event: React.SyntheticEvent, newInputValue: string) => {
							// console.log('Input Changing :: ', newInputValue);
							setInputValue(newInputValue);
						}}
						options={userData ?? []}
						getOptionLabel={(option: User) => option.name}
						sx={{ pt: 2, width: 300 }}
						renderInput={(params) => {
							// console.log('params :: ', params);
							return (
								<Box sx={{pb: 2}}>
									<TextField {...params} label="Name" />
								</Box>
								
							)
						}}
					/>

					{value && renderAddress()}
				</>
			)}
		</Stack>
	)};

export default AddressLookup;