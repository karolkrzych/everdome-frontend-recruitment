import { IFormRequest } from '@/interfaces/form';
import { createFormSchema } from '@/schemas/formSchema';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const { data, isPublic }: IFormRequest = await request.json();
	const schema = createFormSchema(isPublic);
	try {
		schema.parse(data);
		return NextResponse.json({ data }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 400 });
	}
}
