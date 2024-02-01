import { User } from "../common/types";

export const formatName = (inputName: string): string => {
	// Regular expression to match name components
	const nameRegex = /^(Mr\.|Mrs\.|Ms\.|Dr\.)?\s*([A-Za-z]+)\s*([A-Za-z]+)\s*(Jr\.|Sr\.|I|II|III|IV|V|VI)?$/;

	// Execute the regex on the input string
	const matches = inputName.match(nameRegex);

	// Check if the regex matched and extract components
	if (matches) {
		const title: string = matches[1] || ''; // Mr., Mrs., Ms., Dr.
		const firstName: string = matches[2];    // First name
		const lastName: string = matches[3];     // Last name
		const suffix: string = matches[4] || ''; // Jr., Sr., I, II, III, IV, V, VI

		// Format the name
		const guardedLast = suffix ? `${lastName} ${suffix}` : lastName;
		const guardedFirst = title ? `${firstName} (${title})` : firstName;
		const formattedName = `${guardedLast}, ${guardedFirst}`;

		return formattedName;
	} else {
		// Return an error message if the input doesn't match the expected format
		return "Invalid name format";
	}
}

// type Address = {
//   street: string;
//   suite: string;
//   city: string;
//   zipcode: string;
//   geo: {
//     lat: string;
//     lng: string;
//   };
// };

// type User = {
//   id: number;
//   name: string;
//   address: Address;
// };

export function alphabetizeByName(users: User[]): User[] {
  return users.slice().sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}