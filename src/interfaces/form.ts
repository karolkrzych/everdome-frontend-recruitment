export interface IFormInput {
	name: string;
	country: string;
	duration: number;
	password?: string;
}

export interface Country {
	value: string;
	div: string;
}

export interface IFormRequest { 
	data: IFormInput;
	isPublic: boolean;
}